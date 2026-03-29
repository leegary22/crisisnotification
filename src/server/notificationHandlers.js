import { gs, GlideRecord } from '@servicenow/glide';
import { NotificationDeliveryService, TeamsService } from './teamsService.js';

/**
 * Send notification handler
 */
export async function sendNotification(request, response) {
  try {
    const notificationId = request.pathParams.notification_id;
    
    if (!notificationId) {
      response.setStatus(400);
      response.setBody({
        success: false,
        error: 'Notification ID is required'
      });
      return;
    }

    // Validate notification exists and is approved
    const notificationGR = new GlideRecord('x_snc_crisis_notif_crisis_notification');
    if (!notificationGR.get(notificationId)) {
      response.setStatus(404);
      response.setBody({
        success: false,
        error: 'Notification not found'
      });
      return;
    }

    const status = notificationGR.getValue('status');
    if (status !== 'approved') {
      response.setStatus(400);
      response.setBody({
        success: false,
        error: `Notification must be approved before sending. Current status: ${status}`
      });
      return;
    }

    const deliveryService = new NotificationDeliveryService();
    const result = await deliveryService.sendNotification(notificationId);

    response.setStatus(200);
    response.setBody({
      success: true,
      message: 'Notification sent successfully',
      data: result
    });

  } catch (error) {
    gs.error('Error sending notification: ' + error.message);
    response.setStatus(500);
    response.setBody({
      success: false,
      error: 'Internal server error: ' + error.message
    });
  }
}

/**
 * Test Teams connection handler
 */
export async function testTeamsConnection(request, response) {
  try {
    const teamsService = new TeamsService();
    const result = await teamsService.testConnection();

    response.setStatus(result.success ? 200 : 400);
    response.setBody(result);

  } catch (error) {
    gs.error('Error testing Teams connection: ' + error.message);
    response.setStatus(500);
    response.setBody({
      success: false,
      error: 'Internal server error: ' + error.message
    });
  }
}

/**
 * Create notification recipients handler
 */
export function createNotificationRecipients(request, response) {
  try {
    const notificationId = request.pathParams.notification_id;
    
    if (!notificationId) {
      response.setStatus(400);
      response.setBody({
        success: false,
        error: 'Notification ID is required'
      });
      return;
    }

    const notificationGR = new GlideRecord('x_snc_crisis_notif_crisis_notification');
    if (!notificationGR.get(notificationId)) {
      response.setStatus(404);
      response.setBody({
        success: false,
        error: 'Notification not found'
      });
      return;
    }

    const targetAudience = notificationGR.getValue('target_audience');
    const sendToTeams = notificationGR.getValue('send_to_teams') === 'true';
    const sendToEmail = notificationGR.getValue('send_to_email') === 'true';
    const sendToSMS = notificationGR.getValue('send_to_sms') === 'true';

    // Clear existing recipients for this notification
    const existingGR = new GlideRecord('x_snc_crisis_notif_notification_recipient');
    existingGR.addQuery('crisis_notification', notificationId);
    existingGR.deleteMultiple();

    let recipientCount = 0;
    const userGR = new GlideRecord('sys_user');

    // Build user query based on target audience
    switch (targetAudience) {
      case 'all_users':
        userGR.addQuery('active', true);
        break;
      case 'employees_only':
        userGR.addQuery('active', true);
        userGR.addQuery('user_type', 'employee');
        break;
      case 'contractors_only':
        userGR.addQuery('active', true);
        userGR.addQuery('user_type', 'contractor');
        break;
      case 'specific_groups':
        // This would need additional logic to handle specific groups
        // For now, default to all users
        userGR.addQuery('active', true);
        break;
      case 'specific_users':
        // This would need additional logic to handle specific users
        // For now, default to all users
        userGR.addQuery('active', true);
        break;
      default:
        userGR.addQuery('active', true);
    }

    userGR.query();

    while (userGR.next()) {
      const userId = userGR.getUniqueValue();
      const email = userGR.getValue('email');
      const phone = userGR.getValue('phone');

      // Create recipient records for each delivery method
      if (sendToTeams) {
        createRecipient(notificationId, userId, email, phone, 'teams');
        recipientCount++;
      }
      
      if (sendToEmail && email) {
        createRecipient(notificationId, userId, email, phone, 'email');
        recipientCount++;
      }
      
      if (sendToSMS && phone) {
        createRecipient(notificationId, userId, email, phone, 'sms');
        recipientCount++;
      }
    }

    // Update recipient count on notification
    notificationGR.setValue('recipient_count', recipientCount);
    notificationGR.update();

    response.setStatus(200);
    response.setBody({
      success: true,
      message: `Created ${recipientCount} recipient records`,
      recipientCount: recipientCount
    });

  } catch (error) {
    gs.error('Error creating notification recipients: ' + error.message);
    response.setStatus(500);
    response.setBody({
      success: false,
      error: 'Internal server error: ' + error.message
    });
  }
}

/**
 * Helper function to create a recipient record
 */
function createRecipient(notificationId, userId, email, phone, deliveryMethod) {
  const recipientGR = new GlideRecord('x_snc_crisis_notif_notification_recipient');
  recipientGR.initialize();
  recipientGR.setValue('crisis_notification', notificationId);
  recipientGR.setValue('recipient_user', userId);
  recipientGR.setValue('recipient_email', email);
  recipientGR.setValue('recipient_phone', phone);
  recipientGR.setValue('delivery_method', deliveryMethod);
  recipientGR.setValue('delivery_status', 'pending');
  
  // For Teams delivery, we might need to get the Teams user ID
  if (deliveryMethod === 'teams') {
    // This would typically map to the user's UPN or Teams ID
    // For now, we'll use the email as a fallback
    recipientGR.setValue('teams_user_id', email);
  }
  
  recipientGR.insert();
}