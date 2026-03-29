import '@servicenow/sdk/global';
import { BusinessRule } from '@servicenow/sdk/core';
import { onRecipientStatusUpdate, onNotificationScheduled, onNotificationExpired } from '../../server/workflowAutomation.js';

// Business rule to handle recipient status updates
export const recipient_status_update = BusinessRule({
  $id: Now.ID['recipient_status_update'],
  name: 'Recipient Status Update',
  table: 'x_snc_crisis_notif_notification_recipient',
  when: 'after',
  action: ['update'],
  condition: "current.delivery_status.changes()",
  script: onRecipientStatusUpdate,
  active: true,
  order: 100,
  description: 'Updates notification statistics when recipient status changes'
});

// Business rule to handle scheduled notifications
export const scheduled_notification_processor = BusinessRule({
  $id: Now.ID['scheduled_notification_processor'],
  name: 'Scheduled Notification Processor',
  table: 'x_snc_crisis_notif_crisis_notification',
  when: 'after',
  action: ['insert', 'update'],
  condition: "current.status='approved'^current.scheduled_send_time.changes()^current.scheduled_send_time<=gs.nowDateTime()",
  script: onNotificationScheduled,
  active: true,
  order: 300,
  description: 'Processes scheduled notifications when their send time arrives'
});

// Business rule to handle notification expiration
export const notification_expiration_check = BusinessRule({
  $id: Now.ID['notification_expiration_check'],
  name: 'Notification Expiration Check',
  table: 'x_snc_crisis_notif_crisis_notification',
  when: 'before',
  action: ['update'],
  condition: "current.expires_on.nil()=false^current.expires_on<=gs.nowDateTime()^current.status!='completed'^current.status!='cancelled'",
  script: onNotificationExpired,
  active: true,
  order: 50,
  description: 'Automatically expires notifications past their expiry time'
});

// Business rule to validate notification approval
export const notification_approval_validation = BusinessRule({
  $id: Now.ID['notification_approval_validation'],
  name: 'Notification Approval Validation',
  table: 'x_snc_crisis_notif_crisis_notification',
  when: 'before',
  action: ['update'],
  condition: "current.status='approved'^previous.status!='approved'",
  script: `
    // Ensure user has manager role to approve notifications
    if (!gs.hasRole('x_snc_crisis_notif.crisis_notification_manager') && !gs.hasRole('admin')) {
      gs.addErrorMessage('Only crisis notification managers can approve notifications');
      current.setAbortAction(true);
    }
    
    // Validate required fields for approval
    if (current.title.nil() || current.subject.nil() || current.message.nil()) {
      gs.addErrorMessage('Title, subject, and message are required for approval');
      current.setAbortAction(true);
    }
    
    // Check delivery channels
    if (current.send_to_teams != 'true' && current.send_to_email != 'true' && current.send_to_sms != 'true') {
      gs.addErrorMessage('At least one delivery channel must be selected');
      current.setAbortAction(true);
    }
    
    // Validate Teams configuration if Teams is selected
    if (current.send_to_teams == 'true' && current.teams_channel_id.nil()) {
      gs.addErrorMessage('Teams Channel ID is required when sending to Teams');
      current.setAbortAction(true);
    }
  `,
  active: true,
  order: 10,
  description: 'Validates notification data before approval'
});

// Business rule to prevent modification of sent notifications
export const sent_notification_protection = BusinessRule({
  $id: Now.ID['sent_notification_protection'],
  name: 'Sent Notification Protection',
  table: 'x_snc_crisis_notif_crisis_notification',
  when: 'before',
  action: ['update', 'delete'],
  condition: "previous.status='sent'^ORprevious.status='completed'",
  script: `
    if (!gs.hasRole('admin') && !gs.hasRole('x_snc_crisis_notif.crisis_notification_admin')) {
      gs.addErrorMessage('Sent or completed notifications cannot be modified');
      current.setAbortAction(true);
    }
  `,
  active: true,
  order: 5,
  description: 'Prevents modification of sent or completed notifications'
});

// Business rule to auto-set notification priority based on severity
export const notification_priority_setter = BusinessRule({
  $id: Now.ID['notification_priority_setter'],
  name: 'Notification Priority Setter',
  table: 'x_snc_crisis_notif_crisis_notification',
  when: 'before',
  action: ['insert', 'update'],
  condition: "current.severity.changes()",
  script: `
    // Set priority based on severity
    var priority;
    switch (current.severity.toString()) {
      case 'critical':
        priority = '1';
        break;
      case 'high':
        priority = '2';
        break;
      case 'medium':
        priority = '3';
        break;
      case 'low':
      default:
        priority = '4';
        break;
    }
    
    // Set the priority field if it exists
    if (current.isValidField('priority')) {
      current.setValue('priority', priority);
    }
  `,
  active: true,
  order: 20,
  description: 'Automatically sets notification priority based on severity'
});