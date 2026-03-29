import { gs, GlideRecord } from '@servicenow/glide';

/**
 * Handle notification status changes
 */
export function onNotificationStatusChange() {
  const newStatus = current.status.toString();
  const oldStatus = previous.status.toString();
  
  gs.info(`Crisis notification ${current.sys_id} status changed from ${oldStatus} to ${newStatus}`);

  // Log status change
  gs.eventQueue('x_snc_crisis_notif.notification.status.changed', current, newStatus, oldStatus);

  // Handle specific status transitions
  switch (newStatus) {
    case 'cancelled':
      handleNotificationCancelled();
      break;
    case 'completed':
      handleNotificationCompleted();
      break;
  }
}

/**
 * Handle when notification is approved
 */
export function onNotificationApproved() {
  gs.info(`Crisis notification ${current.sys_id} has been approved`);
  
  // Create recipients based on target audience
  createRecipientsForNotification(current.sys_id.toString());
  
  // If scheduled for immediate send, trigger sending
  const scheduledTime = current.scheduled_send_time.toString();
  if (!scheduledTime || new GlideDateTime(scheduledTime).before(new GlideDateTime())) {
    gs.eventQueue('x_snc_crisis_notif.notification.send', current);
  }
}

/**
 * Handle notification cancellation
 */
function handleNotificationCancelled() {
  // Update all pending recipients to cancelled
  const recipientGR = new GlideRecord('x_snc_crisis_notif_notification_recipient');
  recipientGR.addQuery('crisis_notification', current.sys_id);
  recipientGR.addQuery('delivery_status', 'pending');
  recipientGR.query();

  let cancelledCount = 0;
  while (recipientGR.next()) {
    recipientGR.setValue('delivery_status', 'cancelled');
    recipientGR.setValue('failure_reason', 'Notification cancelled by user');
    recipientGR.update();
    cancelledCount++;
  }

  gs.info(`Cancelled ${cancelledCount} pending deliveries for notification ${current.sys_id}`);
}

/**
 * Handle notification completion
 */
function handleNotificationCompleted() {
  // Calculate final delivery statistics
  const recipientGR = new GlideRecord('x_snc_crisis_notif_notification_recipient');
  recipientGR.addQuery('crisis_notification', current.sys_id);
  recipientGR.query();

  let totalRecipients = 0;
  let successCount = 0;
  let failureCount = 0;
  let acknowledgedCount = 0;

  while (recipientGR.next()) {
    totalRecipients++;
    const status = recipientGR.getValue('delivery_status');
    const acknowledged = recipientGR.getValue('acknowledged') === 'true';

    if (status === 'delivered' || status === 'read') {
      successCount++;
    } else if (status === 'failed' || status === 'bounced') {
      failureCount++;
    }

    if (acknowledged) {
      acknowledgedCount++;
    }
  }

  // Update notification with final stats
  const notificationGR = new GlideRecord('x_snc_crisis_notif_crisis_notification');
  if (notificationGR.get(current.sys_id)) {
    notificationGR.setValue('recipient_count', totalRecipients);
    notificationGR.setValue('delivery_success_count', successCount);
    notificationGR.setValue('delivery_failure_count', failureCount);
    notificationGR.update();
  }

  gs.info(`Notification ${current.sys_id} completed: ${successCount}/${totalRecipients} successful deliveries, ${acknowledgedCount} acknowledged`);
}

/**
 * Create recipients for a notification
 */
function createRecipientsForNotification(notificationId) {
  try {
    // Use REST API to create recipients
    const restMessage = new sn_ws.RESTMessage('Crisis Notification API', 'POST');
    const endpoint = `/api/x_snc_crisis_notif/crisis_notifications/recipients/${notificationId}`;
    restMessage.setEndpoint(`${gs.getProperty('glide.servlet.uri')}${endpoint}`);
    restMessage.setRequestHeader('Content-Type', 'application/json');
    restMessage.setRequestHeader('Accept', 'application/json');

    const response = restMessage.execute();
    const statusCode = response.getStatusCode();

    if (statusCode === 200) {
      const responseBody = JSON.parse(response.getBody());
      gs.info(`Successfully created ${responseBody.recipientCount} recipients for notification ${notificationId}`);
    } else {
      gs.error(`Failed to create recipients for notification ${notificationId}: HTTP ${statusCode}`);
    }
  } catch (error) {
    gs.error(`Error creating recipients for notification ${notificationId}: ${error.message}`);
  }
}