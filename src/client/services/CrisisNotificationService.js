/**
 * Crisis Notification Service
 * Handles API calls to ServiceNow tables and custom REST APIs
 */
export class CrisisNotificationService {
  constructor() {
    this.scope = 'x_snc_crisis_notif';
    this.baseApiUrl = `/api/now/table/${this.scope}`;
    this.customApiUrl = `/api/${this.scope}/crisis_notifications`;
  }

  /**
   * Get all crisis notifications
   */
  async getNotifications(filters = {}) {
    try {
      let url = `${this.baseApiUrl}_crisis_notification?sysparm_display_value=all&sysparm_limit=100`;
      
      // Add filters
      if (filters.status) {
        url += `&sysparm_query=status=${filters.status}`;
      }
      if (filters.severity) {
        url += `${filters.status ? '^' : '&sysparm_query='}severity=${filters.severity}`;
      }

      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch notifications');
      }

      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw error;
    }
  }

  /**
   * Get single notification by ID
   */
  async getNotification(sysId) {
    try {
      const response = await fetch(`${this.baseApiUrl}_crisis_notification/${sysId}?sysparm_display_value=all`, {
        headers: {
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch notification');
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error fetching notification:', error);
      throw error;
    }
  }

  /**
   * Create new crisis notification
   */
  async createNotification(notificationData) {
    try {
      const response = await fetch(`${this.baseApiUrl}_crisis_notification?sysparm_display_value=all`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        },
        body: JSON.stringify(notificationData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create notification');
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  /**
   * Update crisis notification
   */
  async updateNotification(sysId, notificationData) {
    try {
      const response = await fetch(`${this.baseApiUrl}_crisis_notification/${sysId}?sysparm_display_value=all`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        },
        body: JSON.stringify(notificationData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update notification');
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error updating notification:', error);
      throw error;
    }
  }

  /**
   * Delete crisis notification
   */
  async deleteNotification(sysId) {
    try {
      const response = await fetch(`${this.baseApiUrl}_crisis_notification/${sysId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        }
      });

      return response.ok;
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
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

  /**
   * Create recipients using custom API
   */
  async createRecipients(sysId) {
    try {
      const response = await fetch(`${this.customApiUrl}/recipients/${sysId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create recipients');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating recipients:', error);
      throw error;
    }
  }

  /**
   * Test Teams connection
   */
  async testTeamsConnection() {
    try {
      const response = await fetch(`${this.customApiUrl}/test/teams`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to test Teams connection');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error testing Teams connection:', error);
      throw error;
    }
  }

  /**
   * Get notification recipients
   */
  async getRecipients(notificationId) {
    try {
      const url = `${this.baseApiUrl}_notification_recipient?sysparm_display_value=all&sysparm_query=crisis_notification=${notificationId}`;
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch recipients');
      }

      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error fetching recipients:', error);
      throw error;
    }
  }

  /**
   * Get notification templates
   */
  async getTemplates() {
    try {
      const url = `${this.baseApiUrl}_notification_template?sysparm_display_value=all&sysparm_query=active=true&sysparm_order_by=name`;
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch templates');
      }

      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error fetching templates:', error);
      throw error;
    }
  }

  /**
   * Get Teams configurations
   */
  async getTeamsConfigs() {
    try {
      const url = `${this.baseApiUrl}_teams_config?sysparm_display_value=all&sysparm_query=active=true`;
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch Teams configs');
      }

      const data = await response.json();
      return data.result || [];
    } catch (error) {
      console.error('Error fetching Teams configs:', error);
      throw error;
    }
  }
}