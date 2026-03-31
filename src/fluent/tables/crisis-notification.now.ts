import '@servicenow/sdk/global';
import { Table, StringColumn, ChoiceColumn, DateTimeColumn, IntegerColumn, BooleanColumn, ReferenceColumn } from '@servicenow/sdk/core';

export const x_snc_crisis_notif_crisis_notification = Table({
  name: 'x_snc_crisis_notif_crisis_notification',
  label: 'Crisis Notification',
  schema: {
    title: StringColumn({
      label: 'Title',
      mandatory: true,
      maxLength: 255,
    }),
    subject: StringColumn({
      label: 'Subject',
      mandatory: true,
      maxLength: 500,
    }),
    message: StringColumn({
      label: 'Message',
      mandatory: true,
      maxLength: 4000,
    }),
    severity: ChoiceColumn({
      label: 'Severity',
      mandatory: true,
      choices: {
        low: { label: 'Low', sequence: 0 },
        medium: { label: 'Medium', sequence: 1 },
        high: { label: 'High', sequence: 2 },
        critical: { label: 'Critical', sequence: 3 }
      },
      dropdown: 'dropdown_with_none'
    }),
    status: ChoiceColumn({
      label: 'Status',
      mandatory: true,
      default: 'draft',
      choices: {
        draft: { label: 'Draft', sequence: 0 },
        pending: { label: 'Pending Approval', sequence: 1 },
        approved: { label: 'Approved', sequence: 2 },
        sent: { label: 'Sent', sequence: 3 },
        completed: { label: 'Completed', sequence: 4 },
        cancelled: { label: 'Cancelled', sequence: 5 }
      },
      dropdown: 'dropdown_with_none'
    }),
    notification_type: ChoiceColumn({
      label: 'Notification Type',
      mandatory: true,
      choices: {
        emergency: { label: 'Emergency Alert', sequence: 0 },
        maintenance: { label: 'Maintenance Notice', sequence: 1 },
        security: { label: 'Security Alert', sequence: 2 },
        weather: { label: 'Weather Alert', sequence: 3 },
        general: { label: 'General Announcement', sequence: 4 }
      },
      dropdown: 'dropdown_with_none'
    }),
    scheduled_send_time: DateTimeColumn({
      label: 'Scheduled Send Time',
      mandatory: false,
    }),
    actual_send_time: DateTimeColumn({
      label: 'Actual Send Time',
      mandatory: false,
      read_only: true
    }),
    expires_on: DateTimeColumn({
      label: 'Expires On',
      mandatory: false,
    }),
    target_audience: ChoiceColumn({
      label: 'Target Audience',
      mandatory: true,
      choices: {
        all_users: { label: 'All Users', sequence: 0 },
        employees_only: { label: 'Employees Only', sequence: 1 },
        contractors_only: { label: 'Contractors Only', sequence: 2 },
        specific_groups: { label: 'Specific Groups', sequence: 3 },
        specific_users: { label: 'Specific Users', sequence: 4 }
      },
      dropdown: 'dropdown_with_none'
    }),
    send_to_teams: BooleanColumn({
      label: 'Send to MS Teams',
      mandatory: true,
      default: true
    }),
    send_to_email: BooleanColumn({
      label: 'Send to Email',
      mandatory: true,
      default: false
    }),
    send_to_sms: BooleanColumn({
      label: 'Send to SMS',
      mandatory: true,
      default: false
    }),
    teams_channel_id: StringColumn({
      label: 'Teams Channel ID',
      mandatory: false,
      maxLength: 255,
    }),
    teams_message_id: StringColumn({
      label: 'Teams Message ID',
      mandatory: false,
      maxLength: 255,
      read_only: true
    }),
    recipient_count: IntegerColumn({
      label: 'Recipient Count',
      mandatory: false,
      read_only: true
    }),
    delivery_success_count: IntegerColumn({
      label: 'Successful Deliveries',
      mandatory: false,
      read_only: true
    }),
    delivery_failure_count: IntegerColumn({
      label: 'Failed Deliveries',
      mandatory: false,
      read_only: true
    }),
    created_by: ReferenceColumn({
      label: 'Created By',
      referenceTable: 'sys_user',
      read_only: true
    }),
    approved_by: ReferenceColumn({
      label: 'Approved By',
      referenceTable: 'sys_user',
      mandatory: false,
      read_only: true
    }),
    bcm_crisis_event: ReferenceColumn({
      label: 'BCM Crisis Event',
      referenceTable: 'sn_recovery_event',
      mandatory: false,
      display: true
    })
  },
  display: 'title',
  actions: ['create', 'read', 'update', 'delete'],
  allow_web_service_access: true,
  accessible_from: 'public',
  extensible: true,
  audit: true
});