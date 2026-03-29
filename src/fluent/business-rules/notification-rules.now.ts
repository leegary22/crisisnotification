import '@servicenow/sdk/global';
import { BusinessRule } from '@servicenow/sdk/core';
import { onNotificationStatusChange, onNotificationApproved } from '../../server/notificationBusinessLogic.js';

// Business rule to handle status changes on crisis notifications
export const crisis_notification_status_change = BusinessRule({
  $id: Now.ID['crisis_notification_status_change'],
  name: 'Crisis Notification Status Change',
  table: 'x_snc_crisis_notif_crisis_notification',
  when: 'after',
  action: ['update'],
  condition: "current.status.changes()",
  script: onNotificationStatusChange,
  active: true,
  order: 100,
  description: 'Handles logic when crisis notification status changes'
});

// Business rule to auto-create recipients when notification is approved
export const crisis_notification_approved = BusinessRule({
  $id: Now.ID['crisis_notification_approved'],
  name: 'Crisis Notification Approved',
  table: 'x_snc_crisis_notif_crisis_notification',
  when: 'after',
  action: ['update'],
  condition: "current.status == 'approved' && previous.status != 'approved'",
  script: onNotificationApproved,
  active: true,
  order: 200,
  description: 'Auto-creates recipients when notification is approved'
});

// Business rule to set created_by field on insert
export const crisis_notification_set_created_by = BusinessRule({
  $id: Now.ID['crisis_notification_set_created_by'],
  name: 'Set Created By',
  table: 'x_snc_crisis_notif_crisis_notification',
  when: 'before',
  action: ['insert'],
  script: `current.created_by = gs.getUserID();`,
  active: true,
  order: 50,
  description: 'Sets the created_by field to the current user'
});

// Business rule to set approved_by field when status changes to approved
export const crisis_notification_set_approved_by = BusinessRule({
  $id: Now.ID['crisis_notification_set_approved_by'],
  name: 'Set Approved By',
  table: 'x_snc_crisis_notif_crisis_notification',
  when: 'before',
  action: ['update'],
  condition: "current.status == 'approved' && previous.status != 'approved'",
  script: `current.approved_by = gs.getUserID();`,
  active: true,
  order: 60,
  description: 'Sets the approved_by field when notification is approved'
});