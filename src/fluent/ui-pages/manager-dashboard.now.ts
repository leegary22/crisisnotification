import '@servicenow/sdk/global';
import { UiPage } from '@servicenow/sdk/core';
import managerDashboard from '../../client/manager-dashboard.html';

export const manager_dashboard_page = UiPage({
  $id: Now.ID['manager_dashboard_page'],
  endpoint: 'x_snc_crisis_notif_manager_dashboard.do',
  html: managerDashboard,
  direct: true
});