/**
 * Manager Dashboard Service
 * Provides analytics, statistics, and management-focused data
 */
export class ManagerDashboardService {
  constructor() {
    this.scope = 'x_snc_crisis_notif';
    this.baseApiUrl = `/api/now/table/${this.scope}`;
    this.customApiUrl = `/api/${this.scope}/crisis_notifications`;
  }

  /**
   * Get dashboard statistics
   */
  async getDashboardStats(days = 30) {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      const dateFilter = `sys_created_on>=${startDate.toISOString().split('T')[0]}`;

      // Get notification counts by status
      const notificationsUrl = `${this.baseApiUrl}_crisis_notification?sysparm_display_value=all&sysparm_query=${dateFilter}`;
      const notificationsResponse = await fetch(notificationsUrl, {
        headers: {
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        }
      });

      if (!notificationsResponse.ok) {
        throw new Error('Failed to fetch notifications data');
      }

      const notificationsData = await notificationsResponse.json();
      const notifications = notificationsData.result || [];

      // Calculate statistics
      const stats = {
        totalNotifications: notifications.length,
        statusCounts: this.groupBy(notifications, n => n.status?.display_value || 'unknown'),
        severityCounts: this.groupBy(notifications, n => n.severity?.display_value || 'unknown'),
        typeCounts: this.groupBy(notifications, n => n.notification_type?.display_value || 'unknown'),
        audienceCounts: this.groupBy(notifications, n => n.target_audience?.display_value || 'unknown'),
        averageDeliveryRate: this.calculateAverageDeliveryRate(notifications),
        recentActivity: notifications
          .filter(n => n.sys_created_on?.display_value)
          .sort((a, b) => new Date(b.sys_created_on.display_value) - new Date(a.sys_created_on.display_value))
          .slice(0, 10)
      };

      return stats;
    } catch (error) {
      console.error('Error fetching dashboard statistics:', error);
      throw error;
    }
  }

  /**
   * Get pending approvals
   */
  async getPendingApprovals() {
    try {
      const url = `${this.baseApiUrl}_crisis_notification?sysparm_display_value=all&sysparm_query=status=pending&sysparm_order_by=sys_created_on`;
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch pending approvals');
      }

      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error fetching pending approvals:', error);
      throw error;
    }
  }

  /**
   * Approve notification
   */
  async approveNotification(sysId) {
    try {
      const response = await fetch(`${this.baseApiUrl}_crisis_notification/${sysId}?sysparm_display_value=all`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        },
        body: JSON.stringify({ status: 'approved' })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to approve notification');
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error approving notification:', error);
      throw error;
    }
  }

  /**
   * Reject notification
   */
  async rejectNotification(sysId, reason) {
    try {
      const response = await fetch(`${this.baseApiUrl}_crisis_notification/${sysId}?sysparm_display_value=all`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        },
        body: JSON.stringify({ 
          status: 'draft',
          work_notes: `Rejected by manager: ${reason}`
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to reject notification');
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error rejecting notification:', error);
      throw error;
    }
  }

  /**
   * Get active notifications with delivery tracking
   */
  async getActiveNotifications() {
    try {
      const url = `${this.baseApiUrl}_crisis_notification?sysparm_display_value=all&sysparm_query=status=sent^ORstatus=approved&sysparm_order_by=actual_send_time`;
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch active notifications');
      }

      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error fetching active notifications:', error);
      throw error;
    }
  }

  /**
   * Get system health data
   */
  async getSystemHealth() {
    try {
      // Test Teams connection
      const teamsTest = await fetch(`${this.customApiUrl}/test/teams`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        }
      });

      const teamsResult = teamsTest.ok ? await teamsTest.json() : { success: false, message: 'API call failed' };

      // Get Teams configuration status
      const configUrl = `${this.baseApiUrl}_teams_config?sysparm_display_value=all&sysparm_query=active=true&sysparm_limit=1`;
      const configResponse = await fetch(configUrl, {
        headers: {
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        }
      });

      const configData = await configResponse.json();
      const hasConfig = configData.result && configData.result.length > 0;

      return {
        teamsConnection: teamsResult,
        teamsConfigured: hasConfig,
        configurationDetails: hasConfig ? configData.result[0] : null
      };
    } catch (error) {
      console.error('Error getting system health:', error);
      return {
        teamsConnection: { success: false, message: error.message },
        teamsConfigured: false,
        configurationDetails: null
      };
    }
  }

  /**
   * Bulk approve notifications
   */
  async bulkApprove(notificationIds) {
    const results = [];
    
    for (const id of notificationIds) {
      try {
        const result = await this.approveNotification(id);
        results.push({ id, success: true, result });
      } catch (error) {
        results.push({ id, success: false, error: error.message });
      }
    }
    
    return results;
  }

  /**
   * Send notification using custom API
   */
  async sendNotification(sysId) {
    try {
      const response = await fetch(`${this.customApiUrl}/send/${sysId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send notification');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error;
    }
  }

  // Helper methods
  groupBy(array, keyFunction) {
    return array.reduce((groups, item) => {
      const key = keyFunction(item);
      groups[key] = (groups[key] || 0) + 1;
      return groups;
    }, {});
  }

  calculateAverageDeliveryRate(notifications) {
    const sentNotifications = notifications.filter(n => 
      n.status?.display_value === 'sent' || n.status?.display_value === 'completed'
    );

    if (sentNotifications.length === 0) return 0;

    const totalRate = sentNotifications.reduce((sum, n) => {
      const total = parseInt(n.recipient_count?.display_value) || 0;
      const success = parseInt(n.delivery_success_count?.display_value) || 0;
      return sum + (total > 0 ? (success / total) * 100 : 0);
    }, 0);

    return Math.round(totalRate / sentNotifications.length);
  }
}