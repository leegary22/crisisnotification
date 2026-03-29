import '@servicenow/sdk/global';
import { UiPage } from '@servicenow/sdk/core';
import notificationDashboard from '../../client/notification-dashboard.html';

export const notification_dashboard_page = UiPage({
  $id: Now.ID['notification_dashboard_page'],
  endpoint: 'x_snc_crisis_notif_dashboard.do',
  html: notificationDashboard,
  direct: true
});