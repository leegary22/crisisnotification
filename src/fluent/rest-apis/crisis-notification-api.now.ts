import '@servicenow/sdk/global';
import { RestApi } from '@servicenow/sdk/core';
import { sendNotification, testTeamsConnection, createNotificationRecipients } from '../../server/notificationHandlers.js';

export const crisis_notification_api = RestApi({
  $id: Now.ID['crisis_notification_api'],
  name: 'Crisis Notification API',
  serviceId: 'crisis_notifications',
  shortDescription: 'API for managing crisis notifications and MS Teams integration',
  consumes: 'application/json',
  produces: 'application/json',
  routes: [
    {
      $id: Now.ID['send_notification_route'],
      name: 'Send Notification',
      path: '/send/{notification_id}',
      method: 'POST',
      script: sendNotification,
      shortDescription: 'Send a crisis notification to all recipients',
      version: 1
    },
    {
      $id: Now.ID['test_teams_route'],
      name: 'Test Teams Connection',
      path: '/test/teams',
      method: 'POST',
      script: testTeamsConnection,
      shortDescription: 'Test the MS Teams API connection',
      version: 1
    },
    {
      $id: Now.ID['create_recipients_route'],
      name: 'Create Recipients',
      path: '/recipients/{notification_id}',
      method: 'POST',
      script: createNotificationRecipients,
      shortDescription: 'Create recipient records for a notification based on target audience',
      version: 1
    }
  ],
  versions: [
    {
      $id: Now.ID['api_v1'],
      version: 1,
      isDefault: true,
      active: true
    }
  ]
});