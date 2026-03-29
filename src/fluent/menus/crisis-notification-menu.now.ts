import '@servicenow/sdk/global';
import { ApplicationMenu, Record } from '@servicenow/sdk/core';

export const crisis_notification_menu = ApplicationMenu({
  $id: Now.ID['crisis_notification_menu'],
  title: 'Crisis Notification',
  hint: 'Manage crisis notifications and emergency communications',
  roles: ['x_snc_crisis_notif.crisis_notification_user'],
  order: 100,
  active: true
});

// Dashboard UI Page for Managers
export const notification_dashboard_module = Record({
  $id: Now.ID['notification_dashboard_module'],
  table: 'sys_app_module',
  data: {
    title: 'Dashboard',
    application: crisis_notification_menu,
    link_type: 'DIRECT',
    query: 'x_snc_crisis_notif_dashboard.do',
    hint: 'View notification analytics and manage approvals',
    roles: ['x_snc_crisis_notif.crisis_notification_manager'],
    active: true,
    order: 50
  }
});

// Main Notification Management UI Page  
export const notification_management_module = Record({
  $id: Now.ID['notification_management_module'],
  table: 'sys_app_module',
  data: {
    title: 'Create & Manage',
    application: crisis_notification_menu,
    link_type: 'DIRECT',
    query: 'x_snc_crisis_notif_management.do',
    hint: 'Create, edit, and send crisis notifications',
    roles: ['x_snc_crisis_notif.crisis_notification_creator'],
    active: true,
    order: 100
  }
});

// Teams Setup Page
export const teams_setup_module = Record({
  $id: Now.ID['teams_setup_module'],
  table: 'sys_app_module',
  data: {
    title: 'Teams Setup',
    application: crisis_notification_menu,
    link_type: 'DIRECT',
    query: 'x_snc_crisis_notif_teams_setup.do',
    hint: 'Configure Microsoft Teams integration',
    roles: ['x_snc_crisis_notif.crisis_notification_admin'],
    active: true,
    order: 150
  }
});