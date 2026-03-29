import { gs, GlideRecord, GlideDateTime, GlideAggregate } from '@servicenow/glide';

/**
 * Handle recipient status updates and update parent notification statistics
 */
export function onRecipientStatusUpdate() {
  const notificationId = current.crisis_notification.toString();
  updateNotificationStats(notificationId);
  
  // If this is an acknowledgment, log it
  if (current.acknowledged.toString() === 'true' && previous.acknowledged.toString() !== 'true') {
    gs.info(`Crisis notification ${notificationId} acknowledged by ${current.recipient_user.getDisplayValue()}`);
    
    // Set acknowledged time
    current.setValue('acknowledged_time', new GlideDateTime());
  }
  
  // Check if notification should be marked as completed
  checkNotificationCompletion(notificationId);
}

/**
 * Handle scheduled notifications that are ready to be sent
 */
export function onNotificationScheduled() {
  const notificationId = current.sys_id.toString();
  
  gs.info(`Processing scheduled notification: ${notificationId}`);
  
  // Queue the notification for sending
  gs.eventQueue('x_snc_crisis_notif.notification.send', current);
  
  gs.info(`Scheduled notification ${notificationId} queued for sending`);
}

/**
 * Handle notification expiration
 */
export function onNotificationExpired() {
  gs.info(`Notification ${current.sys_id} has expired`);
  
  // Set status to completed if it was sent
  if (current.status.toString() === 'sent') {
    current.setValue('status', 'completed');
  } else if (['draft', 'pending', 'approved'].includes(current.status.toString())) {
    // Cancel if not yet sent
    current.setValue('status', 'cancelled');
  }
  
  // Log expiration
  gs.eventQueue('x_snc_crisis_notif.notification.expired', current);
}

/**
 * Update notification delivery statistics
 */
function updateNotificationStats(notificationId) {
  // Use GlideAggregate to calculate statistics efficiently
  const agg = new GlideAggregate('x_snc_crisis_notif_notification_recipient');
  agg.addQuery('crisis_notification', notificationId);
  agg.addAggregate('COUNT');
  agg.groupBy('delivery_status');
  agg.query();
  
  let totalRecipients = 0;
  let successCount = 0;
  let failureCount = 0;
  let deliveredCount = 0;
  let readCount = 0;
  
  while (agg.next()) {
    const status = agg.getValue('delivery_status');
    const count = parseInt(agg.getAggregate('COUNT'));
    
    totalRecipients += count;
    
    switch (status) {
      case 'delivered':
      case 'read':
        successCount += count;
        if (status === 'delivered') deliveredCount += count;
        if (status === 'read') readCount += count;
        break;
      case 'failed':
      case 'bounced':
        failureCount += count;
        break;
    }
  }
  
  // Update the notification record
  const notificationGR = new GlideRecord('x_snc_crisis_notif_crisis_notification');
  if (notificationGR.get(notificationId)) {
    notificationGR.setValue('recipient_count', totalRecipients);
    notificationGR.setValue('delivery_success_count', successCount);
    notificationGR.setValue('delivery_failure_count', failureCount);
    notificationGR.update();
    
    gs.info(`Updated stats for notification ${notificationId}: ${successCount}/${totalRecipients} successful`);
  }
}

/**
 * Check if notification should be marked as completed
 */
function checkNotificationCompletion(notificationId) {
  const notificationGR = new GlideRecord('x_snc_crisis_notif_crisis_notification');
  if (!notificationGR.get(notificationId)) {
    return;
  }
  
  // Only check sent notifications
  if (notificationGR.getValue('status') !== 'sent') {
    return;
  }
  
  // Count pending recipients
  const pendingGR = new GlideRecord('x_snc_crisis_notif_notification_recipient');
  pendingGR.addQuery('crisis_notification', notificationId);
  pendingGR.addQuery('delivery_status', 'pending');
  pendingGR.query();
  
  // If no pending recipients, mark as completed
  if (!pendingGR.hasNext()) {
    // Check if enough time has passed (e.g., 1 hour after send time)
    const sentTime = notificationGR.getValue('actual_send_time');
    if (sentTime) {
      const sentDateTime = new GlideDateTime(sentTime);
      const now = new GlideDateTime();
      const diffMinutes = gs.dateDiff(sentDateTime.getValue(), now.getValue(), true) / 60000; // Convert to minutes
      
      if (diffMinutes >= 60) { // 1 hour
        notificationGR.setValue('status', 'completed');
        notificationGR.update();
        
        gs.info(`Notification ${notificationId} marked as completed - no pending recipients after 1 hour`);
      }
    }
  }
}

/**
 * Cleanup old notification data (can be called via scheduled job)
 */
export function cleanupOldNotifications() {
  const cleanupDate = new GlideDateTime();
  cleanupDate.addDaysUTC(-90); // 90 days ago
  
  // Mark old completed notifications for archival
  const notificationGR = new GlideRecord('x_snc_crisis_notif_crisis_notification');
  notificationGR.addQuery('status', 'completed');
  notificationGR.addQuery('sys_updated_on', '<', cleanupDate);
  notificationGR.query();
  
  let archivedCount = 0;
  while (notificationGR.next()) {
    // You could move to an archive table or just add a flag
    // For now, we'll just log
    gs.info(`Notification ${notificationGR.getUniqueValue()} eligible for archival`);
    archivedCount++;
  }
  
  gs.info(`Found ${archivedCount} notifications eligible for archival`);
  return archivedCount;
}

/**
 * Generate notification statistics report
 */
export function generateNotificationReport(days = 30) {
  const startDate = new GlideDateTime();
  startDate.addDaysUTC(-days);
  
  // Get notification counts by status
  const statusAgg = new GlideAggregate('x_snc_crisis_notif_crisis_notification');
  statusAgg.addQuery('sys_created_on', '>=', startDate);
  statusAgg.addAggregate('COUNT');
  statusAgg.groupBy('status');
  statusAgg.query();
  
  const report = {
    period: `Last ${days} days`,
    statusCounts: {},
    totalNotifications: 0
  };
  
  while (statusAgg.next()) {
    const status = statusAgg.getValue('status');
    const count = parseInt(statusAgg.getAggregate('COUNT'));
    report.statusCounts[status] = count;
    report.totalNotifications += count;
  }
  
  // Get delivery success rate
  const recipientAgg = new GlideAggregate('x_snc_crisis_notif_notification_recipient');
  recipientAgg.addQuery('crisis_notification.sys_created_on', '>=', startDate);
  recipientAgg.addAggregate('COUNT');
  recipientAgg.groupBy('delivery_status');
  recipientAgg.query();
  
  let totalRecipients = 0;
  let successfulDeliveries = 0;
  
  while (recipientAgg.next()) {
    const status = recipientAgg.getValue('delivery_status');
    const count = parseInt(recipientAgg.getAggregate('COUNT'));
    totalRecipients += count;
    
    if (['delivered', 'read'].includes(status)) {
      successfulDeliveries += count;
    }
  }
  
  report.deliveryStats = {
    totalRecipients: totalRecipients,
    successfulDeliveries: successfulDeliveries,
    successRate: totalRecipients > 0 ? Math.round((successfulDeliveries / totalRecipients) * 100) : 0
  };
  
  gs.info(`Notification report generated: ${JSON.stringify(report)}`);
  return report;
}