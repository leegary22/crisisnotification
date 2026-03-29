import '@servicenow/sdk/global';
import { UiPage } from '@servicenow/sdk/core';
import crisisManagementPage from '../../client/index.html';

export const crisis_notification_management_page = UiPage({
  $id: Now.ID['crisis_notification_management_page'],
  endpoint: 'x_snc_crisis_notif_management.do',
  html: crisisManagementPage,
  direct: true
});