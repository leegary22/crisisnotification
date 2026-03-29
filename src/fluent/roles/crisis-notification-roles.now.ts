import '@servicenow/sdk/global';
import { Role } from '@servicenow/sdk/core';

// Basic crisis notification user role
export const crisis_notification_user = Role({
  $id: Now.ID['crisis_notification_user'],
  name: 'x_snc_crisis_notif.crisis_notification_user',
  description: 'Allows users to view crisis notifications and their status',
  canDelegate: false,
  elevatedPrivilege: false,
  grantable: true
});

// Crisis notification creator role
export const crisis_notification_creator = Role({
  $id: Now.ID['crisis_notification_creator'],
  name: 'x_snc_crisis_notif.crisis_notification_creator',
  description: 'Allows users to create and edit crisis notifications',
  containsRoles: [crisis_notification_user],
  canDelegate: false,
  elevatedPrivilege: false,
  grantable: true
});

// Crisis notification manager role
export const crisis_notification_manager = Role({
  $id: Now.ID['crisis_notification_manager'],
  name: 'x_snc_crisis_notif.crisis_notification_manager',
  description: 'Allows users to approve and send crisis notifications',
  containsRoles: [crisis_notification_creator],
  canDelegate: false,
  elevatedPrivilege: false,
  grantable: true
});

// Crisis notification admin role
export const crisis_notification_admin = Role({
  $id: Now.ID['crisis_notification_admin'],
  name: 'x_snc_crisis_notif.crisis_notification_admin',
  description: 'Full access to crisis notification system including configuration and templates',
  containsRoles: [crisis_notification_manager],
  canDelegate: true,
  elevatedPrivilege: true,
  grantable: true,
  scopedAdmin: true
});