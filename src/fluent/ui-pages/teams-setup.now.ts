import '@servicenow/sdk/global';
import { UiPage } from '@servicenow/sdk/core';
import teamsSetupPage from '../../client/teams-setup.html';

export const teams_setup_page = UiPage({
  $id: Now.ID['teams_setup_page'],
  endpoint: 'x_snc_crisis_notif_teams_setup.do',
  html: teamsSetupPage,
  direct: true
});