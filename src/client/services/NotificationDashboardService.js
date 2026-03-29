/**
 * Notification Dashboard Service
 * Handles data retrieval, analytics, and management operations for the dashboard
 */
export class NotificationDashboardService {
  constructor() {
    this.scope = 'x_snc_crisis_notif';
    this.baseApiUrl = `/api/now/table/${this.scope}`;
    this.customApiUrl = `/api/${this.scope}/crisis_notifications`;
  }

  /**
   * Get dashboard overview statistics
   */
  async getOverviewStats(days = 30) {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      const dateFilter = `sys_created_on>=${startDate.toISOString().split('T')[0]}`;
      
      // Get all notifications in the time period
      const notificationsUrl = `${this.baseApiUrl}_crisis_notification?sysparm_display_value=all&sysparm_query=${dateFilter}`;
      const response = await this.fetchWithAuth(notificationsUrl);
      const notifications = response.result || [];

      // Calculate basic metrics
      const stats = {
        totalNotifications: notifications.length,
        pendingApprovals: notifications.filter(n => n.status?.display_value === 'pending').length,
        activeSent: notifications.filter(n => ['sent', 'completed'].includes(n.status?.display_value)).length,
        drafts: notifications.filter(n => n.status?.display_value === 'draft').length,
        
        // Status breakdown
        statusCounts: this.groupBy(notifications, n => n.status?.display_value || 'unknown'),
        
        // Severity analysis
        severityCounts: this.groupBy(notifications, n => n.severity?.display_value || 'unknown'),
        
        // Type analysis
        typeCounts: this.groupBy(notifications, n => n.notification_type?.display_value || 'unknown'),
        
        // Target audience analysis
        audienceCounts: this.groupBy(notifications, n => n.target_audience?.display_value || 'unknown'),
        
        // Calculate trends (if we have data from previous period)
        trends: await this.calculateTrends(notifications, days),
        
        // Recent activity (last 10 notifications)
        recentActivity: notifications
          .sort((a, b) => new Date(b.sys_created_on?.display_value) - new Date(a.sys_created_on?.display_value))
          .slice(0, 10),
          
        // Delivery success rates
        deliveryStats: this.calculateDeliveryStats(notifications)
      };

      return stats;
    } catch (error) {
      console.error('Error fetching overview stats:', error);
      throw error;
    }
  }

  /**
   * Get pending approvals requiring immediate attention
   */
  async getPendingApprovals() {
    try {
      const url = `${this.baseApiUrl}_crisis_notification?sysparm_display_value=all&sysparm_query=status=pending&sysparm_order_by=sys_created_on&sysparm_limit=20`;
      const response = await this.fetchWithAuth(url);
      return response.result || [];
    } catch (error) {
      console.error('Error fetching pending approvals:', error);
      throw error;
    }
  }

  /**
   * Get recent notifications with detailed information
   */
  async getRecentNotifications(limit = 20) {
    try {
      const url = `${this.baseApiUrl}_crisis_notification?sysparm_display_value=all&sysparm_order_by=sys_created_on&sysparm_query=ORDERBYDESCsys_created_on&sysparm_limit=${limit}`;
      const response = await this.fetchWithAuth(url);
      return response.result || [];
    } catch (error) {
      console.error('Error fetching recent notifications:', error);
      throw error;
    }
  }

  /**
   * Get system health and configuration status
   */
  async getSystemHealth() {
    try {
      // Check Teams configuration
      const configUrl = `${this.baseApiUrl}_teams_config?sysparm_display_value=all&sysparm_query=active=true&sysparm_limit=1`;
      const configResponse = await this.fetchWithAuth(configUrl);
      const hasTeamsConfig = configResponse.result && configResponse.result.length > 0;

      // Test Teams connection if configuration exists
      let teamsConnection = { success: false, message: 'No configuration found' };
      if (hasTeamsConfig) {
        try {
          const testResponse = await fetch(`${this.customApiUrl}/test/teams`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-UserToken': window.g_ck
            }
          });
          
          if (testResponse.ok) {
            teamsConnection = await testResponse.json();
          } else {
            teamsConnection = { success: false, message: 'Connection test failed' };
          }
        } catch (error) {
          teamsConnection = { success: false, message: error.message };
        }
      }

      // Get template count
      const templatesUrl = `${this.baseApiUrl}_notification_template?sysparm_query=active=true`;
      const templatesResponse = await this.fetchWithAuth(templatesUrl);
      const templateCount = templatesResponse.result ? templatesResponse.result.length : 0;

      return {
        teamsConfigured: hasTeamsConfig,
        teamsConnection: teamsConnection,
        templatesAvailable: templateCount,
        systemStatus: this.determineSystemStatus(hasTeamsConfig, teamsConnection, templateCount)
      };
    } catch (error) {
      console.error('Error checking system health:', error);
      return {
        teamsConfigured: false,
        teamsConnection: { success: false, message: 'Health check failed' },
        templatesAvailable: 0,
        systemStatus: 'error'
      };
    }
  }

  /**
   * Quick actions for notification management
   */
  async quickApprove(notificationId) {
    try {
      const response = await fetch(`${this.baseApiUrl}_crisis_notification/${notificationId}?sysparm_display_value=all`, {
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
   * Send approved notification
   */
  async sendNotification(notificationId) {
    try {
      const response = await fetch(`${this.customApiUrl}/send/${notificationId}`, {
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
  async fetchWithAuth(url) {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'X-UserToken': window.g_ck
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  groupBy(array, keyFunction) {
    return array.reduce((groups, item) => {
      const key = keyFunction(item);
      groups[key] = (groups[key] || 0) + 1;
      return groups;
    }, {});
  }

  calculateDeliveryStats(notifications) {
    const sentNotifications = notifications.filter(n => 
      ['sent', 'completed'].includes(n.status?.display_value)
    );

    if (sentNotifications.length === 0) {
      return { averageSuccessRate: 0, totalRecipients: 0, successfulDeliveries: 0 };
    }

    let totalRecipients = 0;
    let successfulDeliveries = 0;

    sentNotifications.forEach(n => {
      const recipients = parseInt(n.recipient_count?.display_value) || 0;
      const successes = parseInt(n.delivery_success_count?.display_value) || 0;
      totalRecipients += recipients;
      successfulDeliveries += successes;
    });

    return {
      averageSuccessRate: totalRecipients > 0 ? Math.round((successfulDeliveries / totalRecipients) * 100) : 0,
      totalRecipients,
      successfulDeliveries
    };
  }

  async calculateTrends(currentNotifications, days) {
    try {
      // Get data from previous period for comparison
      const previousEndDate = new Date();
      previousEndDate.setDate(previousEndDate.getDate() - days);
      const previousStartDate = new Date();
      previousStartDate.setDate(previousStartDate.getDate() - (days * 2));

      const previousDateFilter = `sys_created_on>=${previousStartDate.toISOString().split('T')[0]}^sys_created_on<${previousEndDate.toISOString().split('T')[0]}`;
      
      const previousUrl = `${this.baseApiUrl}_crisis_notification?sysparm_display_value=all&sysparm_query=${previousDateFilter}`;
      const response = await this.fetchWithAuth(previousUrl);
      const previousNotifications = response.result || [];

      const currentCount = currentNotifications.length;
      const previousCount = previousNotifications.length;

      const change = currentCount - previousCount;
      const percentChange = previousCount > 0 ? Math.round((change / previousCount) * 100) : 0;

      return {
        change,
        percentChange,
        direction: change > 0 ? 'up' : change < 0 ? 'down' : 'stable'
      };
    } catch (error) {
      console.error('Error calculating trends:', error);
      return { change: 0, percentChange: 0, direction: 'stable' };
    }
  }

  determineSystemStatus(hasTeamsConfig, teamsConnection, templateCount) {
    if (!hasTeamsConfig) return 'warning';
    if (!teamsConnection.success) return 'error';
    if (templateCount === 0) return 'warning';
    return 'healthy';
  }

  formatDateTime(dateValue) {
    if (!dateValue) return 'Unknown';
    try {
      const date = new Date(dateValue);
      return date.toLocaleString();
    } catch {
      return dateValue;
    }
  }

  getStatusColor(status) {
    const colors = {
      'completed': 'success',
      'sent': 'primary',
      'approved': 'success',
      'pending': 'warning',
      'draft': 'secondary',
      'cancelled': 'danger',
      'rejected': 'danger'
    };
    return colors[status] || 'secondary';
  }

  getSeverityColor(severity) {
    const colors = {
      'critical': 'danger',
      'high': 'danger',
      'medium': 'warning',
      'low': 'success'
    };
    return colors[severity] || 'primary';
  }
}