import '@servicenow/sdk/global';
import { Table, StringColumn, BooleanColumn, DateTimeColumn } from '@servicenow/sdk/core';

export const x_snc_crisis_notif_teams_config = Table({
  name: 'x_snc_crisis_notif_teams_config',
  label: 'MS Teams Configuration',
  schema: {
    name: StringColumn({
      label: 'Configuration Name',
      mandatory: true,
      maxLength: 255,
    }),
    tenant_id: StringColumn({
      label: 'Tenant ID',
      mandatory: true,
      maxLength: 255,
    }),
    client_id: StringColumn({
      label: 'Client ID (Application ID)',
      mandatory: true,
      maxLength: 255,
    }),
    client_secret: StringColumn({
      label: 'Client Secret',
      mandatory: true,
      maxLength: 500,
    }),
    webhook_url: StringColumn({
      label: 'Webhook URL',
      mandatory: false,
      maxLength: 500,
    }),
    default_channel_id: StringColumn({
      label: 'Default Channel ID',
      mandatory: false,
      maxLength: 255,
    }),
    api_endpoint: StringColumn({
      label: 'API Endpoint',
      mandatory: true,
      default: 'https://graph.microsoft.com/v1.0',
      maxLength: 255,
    }),
    access_token: StringColumn({
      label: 'Access Token',
      mandatory: false,
      maxLength: 2000,
      read_only: true
    }),
    token_expires_at: DateTimeColumn({
      label: 'Token Expires At',
      mandatory: false,
      read_only: true
    }),
    active: BooleanColumn({
      label: 'Active',
      mandatory: true,
      default: true
    }),
    test_mode: BooleanColumn({
      label: 'Test Mode',
      mandatory: true,
      default: false
    })
  },
  display: 'name',
  actions: ['create', 'read', 'update', 'delete'],
  allow_web_service_access: true,
  accessible_from: 'package_private',
  extensible: true,
  audit: true
});