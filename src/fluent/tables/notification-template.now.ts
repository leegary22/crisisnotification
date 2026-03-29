import '@servicenow/sdk/global';
import { Table, StringColumn, ChoiceColumn, BooleanColumn } from '@servicenow/sdk/core';

export const x_snc_crisis_notif_notification_template = Table({
  name: 'x_snc_crisis_notif_notification_template',
  label: 'Notification Template',
  schema: {
    name: StringColumn({
      label: 'Template Name',
      mandatory: true,
      maxLength: 255,
    }),
    description: StringColumn({
      label: 'Description',
      mandatory: false,
      maxLength: 1000,
    }),
    template_type: ChoiceColumn({
      label: 'Template Type',
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
    title_template: StringColumn({
      label: 'Title Template',
      mandatory: true,
      maxLength: 500,
    }),
    subject_template: StringColumn({
      label: 'Subject Template',
      mandatory: true,
      maxLength: 500,
    }),
    message_template: StringColumn({
      label: 'Message Template',
      mandatory: true,
      maxLength: 4000,
    }),
    teams_card_template: StringColumn({
      label: 'MS Teams Card Template (JSON)',
      mandatory: false,
      maxLength: 8000,
    }),
    email_template: StringColumn({
      label: 'Email Template (HTML)',
      mandatory: false,
      maxLength: 8000,
    }),
    sms_template: StringColumn({
      label: 'SMS Template',
      mandatory: false,
      maxLength: 1000,
    }),
    default_severity: ChoiceColumn({
      label: 'Default Severity',
      mandatory: true,
      choices: {
        low: { label: 'Low', sequence: 0 },
        medium: { label: 'Medium', sequence: 1 },
        high: { label: 'High', sequence: 2 },
        critical: { label: 'Critical', sequence: 3 }
      },
      dropdown: 'dropdown_with_none'
    }),
    active: BooleanColumn({
      label: 'Active',
      mandatory: true,
      default: true
    }),
    requires_approval: BooleanColumn({
      label: 'Requires Approval',
      mandatory: true,
      default: false
    })
  },
  display: 'name',
  actions: ['create', 'read', 'update', 'delete'],
  allow_web_service_access: true,
  accessible_from: 'public',
  extensible: true,
  audit: true
});