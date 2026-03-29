import '@servicenow/sdk/global';
import { Acl } from '@servicenow/sdk/core';
import { crisis_notification_user, crisis_notification_creator, crisis_notification_manager, crisis_notification_admin } from '../roles/crisis-notification-roles.now.ts';

// Crisis Notification table ACLs
export const crisis_notification_read_acl = Acl({
  $id: Now.ID['crisis_notification_read_acl'],
  type: 'record',
  table: 'x_snc_crisis_notif_crisis_notification',
  operation: 'read',
  roles: [crisis_notification_user],
  active: true,
  adminOverrides: true,
  description: 'Allow users with crisis_notification_user role to read crisis notifications'
});

export const crisis_notification_create_acl = Acl({
  $id: Now.ID['crisis_notification_create_acl'],
  type: 'record',
  table: 'x_snc_crisis_notif_crisis_notification',
  operation: 'create',
  roles: [crisis_notification_creator],
  active: true,
  adminOverrides: true,
  description: 'Allow users with crisis_notification_creator role to create crisis notifications'
});

export const crisis_notification_write_acl = Acl({
  $id: Now.ID['crisis_notification_write_acl'],
  type: 'record',
  table: 'x_snc_crisis_notif_crisis_notification',
  operation: 'write',
  roles: [crisis_notification_creator],
  condition: 'current.status!=sent^current.status!=completed^current.sys_created_by=gs.getUserID()^ORgs.hasRole("x_snc_crisis_notif.crisis_notification_manager")',
  active: true,
  adminOverrides: true,
  description: 'Allow creators to edit their own notifications in draft/pending status, or managers to edit any'
});

export const crisis_notification_delete_acl = Acl({
  $id: Now.ID['crisis_notification_delete_acl'],
  type: 'record',
  table: 'x_snc_crisis_notif_crisis_notification',
  operation: 'delete',
  roles: [crisis_notification_manager],
  condition: 'current.status=draft^ORcurrent.status=cancelled',
  active: true,
  adminOverrides: true,
  description: 'Allow managers to delete notifications only in draft or cancelled status'
});

// Notification Recipients table ACLs
export const notification_recipient_read_acl = Acl({
  $id: Now.ID['notification_recipient_read_acl'],
  type: 'record',
  table: 'x_snc_crisis_notif_notification_recipient',
  operation: 'read',
  roles: [crisis_notification_user],
  active: true,
  adminOverrides: true,
  description: 'Allow users to read notification recipients'
});

export const notification_recipient_write_acl = Acl({
  $id: Now.ID['notification_recipient_write_acl'],
  type: 'record',
  table: 'x_snc_crisis_notif_notification_recipient',
  operation: 'write',
  roles: [crisis_notification_manager],
  active: true,
  adminOverrides: true,
  description: 'Allow managers to update recipient records'
});

// Notification Templates table ACLs
export const notification_template_read_acl = Acl({
  $id: Now.ID['notification_template_read_acl'],
  type: 'record',
  table: 'x_snc_crisis_notif_notification_template',
  operation: 'read',
  roles: [crisis_notification_creator],
  active: true,
  adminOverrides: true,
  description: 'Allow creators to read notification templates'
});

export const notification_template_write_acl = Acl({
  $id: Now.ID['notification_template_write_acl'],
  type: 'record',
  table: 'x_snc_crisis_notif_notification_template',
  operation: 'write',
  roles: [crisis_notification_admin],
  active: true,
  adminOverrides: true,
  description: 'Allow only admins to modify notification templates'
});

// Teams Config table ACLs
export const teams_config_read_acl = Acl({
  $id: Now.ID['teams_config_read_acl'],
  type: 'record',
  table: 'x_snc_crisis_notif_teams_config',
  operation: 'read',
  roles: [crisis_notification_admin],
  active: true,
  adminOverrides: true,
  description: 'Allow only admins to read Teams configurations'
});

export const teams_config_write_acl = Acl({
  $id: Now.ID['teams_config_write_acl'],
  type: 'record',
  table: 'x_snc_crisis_notif_teams_config',
  operation: 'write',
  roles: [crisis_notification_admin],
  active: true,
  adminOverrides: true,
  description: 'Allow only admins to modify Teams configurations'
});

// REST API ACLs
export const crisis_notification_api_acl = Acl({
  $id: Now.ID['crisis_notification_api_acl'],
  type: 'rest_endpoint',
  name: 'Crisis Notification API',
  operation: 'execute',
  roles: [crisis_notification_manager],
  active: true,
  adminOverrides: true,
  description: 'Allow managers to execute crisis notification API endpoints'
});

// UI Page ACLs
export const crisis_notification_ui_page_acl = Acl({
  $id: Now.ID['crisis_notification_ui_page_acl'],
  type: 'ui_page',
  name: 'x_snc_crisis_notif_management',
  operation: 'execute',
  roles: [crisis_notification_user],
  active: true,
  adminOverrides: true,
  description: 'Allow users to access the crisis notification management UI'
});

// Field-level ACLs for sensitive information
export const notification_approved_by_field_acl = Acl({
  $id: Now.ID['notification_approved_by_field_acl'],
  type: 'record',
  table: 'x_snc_crisis_notif_crisis_notification',
  field: 'approved_by',
  operation: 'write',
  roles: [crisis_notification_manager],
  active: true,
  adminOverrides: true,
  description: 'Only managers can set who approved a notification'
});

export const notification_delivery_stats_acl = Acl({
  $id: Now.ID['notification_delivery_stats_acl'],
  type: 'record',
  table: 'x_snc_crisis_notif_crisis_notification',
  field: 'delivery_success_count',
  operation: 'write',
  script: 'answer = false; // System controlled field',
  active: true,
  adminOverrides: true,
  description: 'Delivery statistics are system controlled'
});