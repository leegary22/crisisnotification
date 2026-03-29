import '@servicenow/sdk/global';
import { ApplicationMenu } from '@servicenow/sdk/core';

export const crisis_notification_menu = ApplicationMenu({
  $id: Now.ID['crisis_notification_menu'],
  title: 'Crisis Notification',
  hint: 'Manage crisis notifications and emergency communications',
  roles: ['x_snc_crisis_notif.crisis_notification_user'],
  order: 100,
  active: true
});