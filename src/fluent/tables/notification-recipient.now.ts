import '@servicenow/sdk/global';
import { Table, StringColumn, ChoiceColumn, DateTimeColumn, ReferenceColumn, BooleanColumn } from '@servicenow/sdk/core';

export const x_snc_crisis_notif_notification_recipient = Table({
  name: 'x_snc_crisis_notif_notification_recipient',
  label: 'Notification Recipient',
  schema: {
    crisis_notification: ReferenceColumn({
      label: 'Crisis Notification',
      referenceTable: 'x_snc_crisis_notif_crisis_notification',
      mandatory: true
    }),
    recipient_user: ReferenceColumn({
      label: 'Recipient User',
      referenceTable: 'sys_user',
      mandatory: true
    }),
    recipient_email: StringColumn({
      label: 'Recipient Email',
      mandatory: false,
      maxLength: 255,
    }),
    recipient_phone: StringColumn({
      label: 'Recipient Phone',
      mandatory: false,
      maxLength: 50,
    }),
    delivery_method: ChoiceColumn({
      label: 'Delivery Method',
      mandatory: true,
      choices: {
        teams: { label: 'MS Teams', sequence: 0 },
        email: { label: 'Email', sequence: 1 },
        sms: { label: 'SMS', sequence: 2 },
        push: { label: 'Push Notification', sequence: 3 }
      },
      dropdown: 'dropdown_with_none'
    }),
    delivery_status: ChoiceColumn({
      label: 'Delivery Status',
      mandatory: true,
      default: 'pending',
      choices: {
        pending: { label: 'Pending', sequence: 0 },
        sent: { label: 'Sent', sequence: 1 },
        delivered: { label: 'Delivered', sequence: 2 },
        read: { label: 'Read', sequence: 3 },
        failed: { label: 'Failed', sequence: 4 },
        bounced: { label: 'Bounced', sequence: 5 }
      },
      dropdown: 'dropdown_with_none'
    }),
    sent_time: DateTimeColumn({
      label: 'Sent Time',
      mandatory: false,
      read_only: true
    }),
    delivered_time: DateTimeColumn({
      label: 'Delivered Time',
      mandatory: false,
      read_only: true
    }),
    read_time: DateTimeColumn({
      label: 'Read Time',
      mandatory: false,
      read_only: true
    }),
    failure_reason: StringColumn({
      label: 'Failure Reason',
      mandatory: false,
      maxLength: 1000,
      read_only: true
    }),
    teams_user_id: StringColumn({
      label: 'Teams User ID',
      mandatory: false,
      maxLength: 255,
    }),
    teams_conversation_id: StringColumn({
      label: 'Teams Conversation ID',
      mandatory: false,
      maxLength: 255,
      read_only: true
    }),
    retry_count: StringColumn({
      label: 'Retry Count',
      mandatory: false,
      default: '0',
      maxLength: 10
    }),
    acknowledged: BooleanColumn({
      label: 'Acknowledged',
      mandatory: true,
      default: false
    }),
    acknowledged_time: DateTimeColumn({
      label: 'Acknowledged Time',
      mandatory: false,
      read_only: true
    })
  },
  display: 'recipient_user',
  actions: ['create', 'read', 'update', 'delete'],
  allow_web_service_access: true,
  accessible_from: 'public',
  extensible: true,
  audit: true
});