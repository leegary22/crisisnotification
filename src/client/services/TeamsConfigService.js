/**
 * Teams Configuration Service
 * Handles CRUD operations for Teams configuration
 */
export class TeamsConfigService {
  constructor() {
    this.scope = 'x_snc_crisis_notif';
    this.baseApiUrl = `/api/now/table/${this.scope}`;
  }

  /**
   * Get current active Teams configuration
   */
  async getActiveConfiguration() {
    try {
      const url = `${this.baseApiUrl}_teams_config?sysparm_display_value=all&sysparm_query=active=true&sysparm_order_by=sys_created_on&sysparm_limit=1`;
      
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        }
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch Teams configuration');
      }

      const data = await response.json();
      return data.result && data.result.length > 0 ? data.result[0] : null;
    } catch (error) {
      console.error('Error fetching Teams configuration:', error);
      throw error;
    }
  }

  /**
   * Create new Teams configuration
   */
  async createConfiguration(configData) {
    try {
      const response = await fetch(`${this.baseApiUrl}_teams_config?sysparm_display_value=all`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        },
        body: JSON.stringify(configData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create Teams configuration');
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error creating Teams configuration:', error);
      throw error;
    }
  }

  /**
   * Update Teams configuration
   */
  async updateConfiguration(sysId, configData) {
    try {
      const response = await fetch(`${this.baseApiUrl}_teams_config/${sysId}?sysparm_display_value=all`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        },
        body: JSON.stringify(configData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update Teams configuration');
      }

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error('Error updating Teams configuration:', error);
      throw error;
    }
  }

  /**
   * Test Teams connection using the crisis notification API
   */
  async testConnection() {
    try {
      const customApiUrl = `/api/${this.scope}/crisis_notifications`;
      const response = await fetch(`${customApiUrl}/test/teams`, {
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
   * Validate configuration data
   */
  validateConfiguration(configData) {
    const errors = {};

    if (!configData.name || !configData.name.trim()) {
      errors.name = 'Configuration name is required';
    }

    if (!configData.tenant_id || !configData.tenant_id.trim()) {
      errors.tenant_id = 'Tenant ID is required';
    }

    if (!configData.client_id || !configData.client_id.trim()) {
      errors.client_id = 'Client ID is required';
    }

    if (!configData.client_secret || !configData.client_secret.trim()) {
      errors.client_secret = 'Client Secret is required';
    }

    // Validate GUID format for tenant_id and client_id
    const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    
    if (configData.tenant_id && !guidRegex.test(configData.tenant_id)) {
      errors.tenant_id = 'Tenant ID must be a valid GUID format';
    }

    if (configData.client_id && !guidRegex.test(configData.client_id)) {
      errors.client_id = 'Client ID must be a valid GUID format';
    }

    // Validate API endpoint URL
    if (configData.api_endpoint) {
      try {
        new URL(configData.api_endpoint);
      } catch {
        errors.api_endpoint = 'API Endpoint must be a valid URL';
      }
    }

    // Validate webhook URL if provided
    if (configData.webhook_url) {
      try {
        new URL(configData.webhook_url);
      } catch {
        errors.webhook_url = 'Webhook URL must be a valid URL';
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
}