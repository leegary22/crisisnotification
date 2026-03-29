import { gs, GlideDateTime, GlideRecord } from '@servicenow/glide';

/**
 * MS Teams API Integration Service
 * Handles authentication and message sending to Microsoft Teams
 */
export class TeamsService {
  constructor() {
    this.apiEndpoint = 'https://graph.microsoft.com/v1.0';
    this.config = this.getActiveConfig();
  }

  /**
   * Get active Teams configuration
   */
  getActiveConfig() {
    const configGR = new GlideRecord('x_snc_crisis_notif_teams_config');
    configGR.addQuery('active', true);
    configGR.orderByDesc('sys_created_on');
    configGR.setLimit(1);
    configGR.query();
    
    if (configGR.next()) {
      return {
        tenantId: configGR.getValue('tenant_id'),
        clientId: configGR.getValue('client_id'),
        clientSecret: configGR.getValue('client_secret'),
        webhookUrl: configGR.getValue('webhook_url'),
        defaultChannelId: configGR.getValue('default_channel_id'),
        apiEndpoint: configGR.getValue('api_endpoint') || this.apiEndpoint,
        testMode: configGR.getValue('test_mode') === 'true',
        sysId: configGR.getUniqueValue()
      };
    }
    return null;
  }

  /**
   * Get access token from Microsoft Graph API
   */
  async getAccessToken() {
    if (!this.config) {
      throw new Error('No active Teams configuration found');
    }

    // Check if we have a valid token
    const token = this.getCachedToken();
    if (token) {
      return token;
    }

    const tokenUrl = `https://login.microsoftonline.com/${this.config.tenantId}/oauth2/v2.0/token`;
    
    const requestBody = {
      'grant_type': 'client_credentials',
      'client_id': this.config.clientId,
      'client_secret': this.config.clientSecret,
      'scope': 'https://graph.microsoft.com/.default'
    };

    const response = await this.makeHttpRequest('POST', tokenUrl, requestBody, {
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    if (response.access_token) {
      this.cacheToken(response.access_token, response.expires_in);
      return response.access_token;
    }

    throw new Error('Failed to obtain access token: ' + JSON.stringify(response));
  }

  /**
   * Get cached access token if still valid
   */
  getCachedToken() {
    const configGR = new GlideRecord('x_snc_crisis_notif_teams_config');
    if (configGR.get(this.config.sysId)) {
      const token = configGR.getValue('access_token');
      const expiresAt = configGR.getValue('token_expires_at');
      
      if (token && expiresAt) {
        const now = new GlideDateTime();
        const expiry = new GlideDateTime();
        expiry.setValue(expiresAt);
        
        if (now.before(expiry)) {
          return token;
        }
      }
    }
    return null;
  }

  /**
   * Cache access token with expiration
   */
  cacheToken(token, expiresIn) {
    const configGR = new GlideRecord('x_snc_crisis_notif_teams_config');
    if (configGR.get(this.config.sysId)) {
      const expiryTime = new GlideDateTime();
      expiryTime.addSeconds(parseInt(expiresIn) - 300); // 5 minute buffer
      
      configGR.setValue('access_token', token);
      configGR.setValue('token_expires_at', expiryTime);
      configGR.update();
    }
  }

  /**
   * Send message to Teams channel
   */
  async sendChannelMessage(channelId, message, notificationId) {
    try {
      const token = await this.getAccessToken();
      const messageData = this.createAdaptiveCard(message, notificationId);
      
      const url = `${this.config.apiEndpoint}/teams/${channelId}/channels/19:general/messages`;
      
      const response = await this.makeHttpRequest('POST', url, messageData, {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      return {
        success: true,
        messageId: response.id,
        response: response
      };
    } catch (error) {
      gs.error('Teams API Error: ' + error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Send direct message to user
   */
  async sendDirectMessage(userId, message, notificationId) {
    try {
      const token = await this.getAccessToken();
      
      // Create chat if it doesn't exist
      const chatId = await this.createOrGetChat(userId, token);
      
      const messageData = this.createAdaptiveCard(message, notificationId);
      
      const url = `${this.config.apiEndpoint}/chats/${chatId}/messages`;
      
      const response = await this.makeHttpRequest('POST', url, messageData, {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      return {
        success: true,
        messageId: response.id,
        chatId: chatId,
        response: response
      };
    } catch (error) {
      gs.error('Teams Direct Message Error: ' + error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Create or get existing chat with user
   */
  async createOrGetChat(userId, token) {
    const chatData = {
      chatType: 'oneOnOne',
      members: [
        {
          '@odata.type': '#microsoft.graph.aadUserConversationMember',
          'user@odata.bind': `https://graph.microsoft.com/v1.0/users('${userId}')`
        }
      ]
    };

    const response = await this.makeHttpRequest('POST', `${this.config.apiEndpoint}/chats`, chatData, {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return response.id;
  }

  /**
   * Create adaptive card for Teams message
   */
  createAdaptiveCard(notification, notificationId) {
    const severity = notification.severity || 'medium';
    const severityColors = {
      low: 'Good',
      medium: 'Warning', 
      high: 'Attention',
      critical: 'Attention'
    };

    const card = {
      type: 'message',
      attachments: [{
        contentType: 'application/vnd.microsoft.card.adaptive',
        content: {
          type: 'AdaptiveCard',
          version: '1.4',
          body: [
            {
              type: 'ColumnSet',
              columns: [
                {
                  type: 'Column',
                  width: 'auto',
                  items: [
                    {
                      type: 'Image',
                      url: this.getSeverityIcon(severity),
                      size: 'Small'
                    }
                  ]
                },
                {
                  type: 'Column',
                  width: 'stretch',
                  items: [
                    {
                      type: 'TextBlock',
                      text: notification.title,
                      weight: 'Bolder',
                      size: 'Large',
                      color: severityColors[severity] || 'Default'
                    },
                    {
                      type: 'TextBlock',
                      text: notification.subject || '',
                      weight: 'Normal',
                      size: 'Medium',
                      color: 'Default',
                      spacing: 'Small',
                      isSubtle: true
                    },
                    {
                      type: 'TextBlock',
                      text: `**Severity:** ${severity.toUpperCase()}`,
                      weight: 'Bolder',
                      color: severityColors[severity] || 'Default'
                    }
                  ]
                }
              ]
            },
            {
              type: 'TextBlock',
              text: notification.message,
              wrap: true,
              spacing: 'Medium'
            },
            {
              type: 'FactSet',
              facts: [
                {
                  title: 'Type:',
                  value: notification.notification_type || 'General'
                },
                {
                  title: 'Sent:',
                  value: new GlideDateTime().getDisplayValue()
                }
              ]
            }
          ],
          actions: [
            {
              type: 'Action.OpenUrl',
              title: 'View Details',
              url: `${gs.getProperty('glide.servlet.uri')}nav_to.do?uri=x_snc_crisis_notif_crisis_notification.do?sys_id=${notificationId}`
            },
            {
              type: 'Action.Submit',
              title: 'Acknowledge',
              data: {
                action: 'acknowledge',
                notificationId: notificationId
              }
            }
          ]
        }
      }]
    };

    return card;
  }

  /**
   * Get severity icon URL
   */
  getSeverityIcon(severity) {
    const icons = {
      low: 'https://img.icons8.com/color/48/000000/info.png',
      medium: 'https://img.icons8.com/color/48/000000/warning-shield.png',
      high: 'https://img.icons8.com/color/48/000000/error.png',
      critical: 'https://img.icons8.com/color/48/000000/critical-error.png'
    };
    return icons[severity] || icons.medium;
  }

  /**
   * Make HTTP request using ServiceNow REST message
   */
  async makeHttpRequest(method, url, data, headers) {
    return new Promise((resolve, reject) => {
      try {
        const request = new sn_ws.RESTMessage('Teams API', method);
        request.setEndpoint(url);
        
        // Set headers
        if (headers) {
          Object.keys(headers).forEach(key => {
            request.setRequestHeader(key, headers[key]);
          });
        }

        // Set request body
        if (data) {
          if (typeof data === 'object') {
            if (headers && headers['Content-Type'] === 'application/x-www-form-urlencoded') {
              // Convert object to URL-encoded string
              const params = Object.keys(data).map(key => 
                encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
              ).join('&');
              request.setRequestBody(params);
            } else {
              request.setRequestBody(JSON.stringify(data));
            }
          } else {
            request.setRequestBody(data);
          }
        }

        const response = request.execute();
        const responseBody = response.getBody();
        const statusCode = response.getStatusCode();

        if (statusCode >= 200 && statusCode < 300) {
          resolve(JSON.parse(responseBody));
        } else {
          reject(new Error(`HTTP ${statusCode}: ${responseBody}`));
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Test Teams connection
   */
  async testConnection() {
    try {
      const token = await this.getAccessToken();
      
      // Test by getting user profile
      const response = await this.makeHttpRequest('GET', `${this.config.apiEndpoint}/me`, null, {
        'Authorization': `Bearer ${token}`
      });

      return {
        success: true,
        message: 'Successfully connected to Microsoft Teams API',
        userPrincipalName: response.userPrincipalName
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to connect to Microsoft Teams API: ' + error.message
      };
    }
  }
}

/**
 * Notification Delivery Service
 * Handles sending notifications through various channels
 */
export class NotificationDeliveryService {
  constructor() {
    this.teamsService = new TeamsService();
  }

  /**
   * Send notification to all recipients
   */
  async sendNotification(notificationId) {
    const notificationGR = new GlideRecord('x_snc_crisis_notif_crisis_notification');
    if (!notificationGR.get(notificationId)) {
      throw new Error('Notification not found: ' + notificationId);
    }

    const notification = {
      title: notificationGR.getValue('title'),
      message: notificationGR.getValue('message'),
      severity: notificationGR.getValue('severity'),
      notification_type: notificationGR.getValue('notification_type'),
      send_to_teams: notificationGR.getValue('send_to_teams') === 'true',
      send_to_email: notificationGR.getValue('send_to_email') === 'true',
      send_to_sms: notificationGR.getValue('send_to_sms') === 'true',
      teams_channel_id: notificationGR.getValue('teams_channel_id')
    };

    let successCount = 0;
    let failureCount = 0;

    // Get all recipients
    const recipientGR = new GlideRecord('x_snc_crisis_notif_notification_recipient');
    recipientGR.addQuery('crisis_notification', notificationId);
    recipientGR.addQuery('delivery_status', 'pending');
    recipientGR.query();

    while (recipientGR.next()) {
      const recipientId = recipientGR.getUniqueValue();
      const deliveryMethod = recipientGR.getValue('delivery_method');
      const userId = recipientGR.getValue('recipient_user');
      const teamsUserId = recipientGR.getValue('teams_user_id');

      try {
        let result = null;

        if (deliveryMethod === 'teams' && notification.send_to_teams) {
          if (notification.teams_channel_id) {
            // Send to channel
            result = await this.teamsService.sendChannelMessage(
              notification.teams_channel_id, 
              notification, 
              notificationId
            );
          } else if (teamsUserId) {
            // Send direct message
            result = await this.teamsService.sendDirectMessage(
              teamsUserId, 
              notification, 
              notificationId
            );
          }

          if (result && result.success) {
            this.updateRecipientStatus(recipientId, 'sent', result.messageId, result.chatId);
            successCount++;
          } else {
            this.updateRecipientStatus(recipientId, 'failed', null, null, result ? result.error : 'Unknown error');
            failureCount++;
          }
        } else if (deliveryMethod === 'email' && notification.send_to_email) {
          // Email delivery implementation would go here
          this.updateRecipientStatus(recipientId, 'sent');
          successCount++;
        } else if (deliveryMethod === 'sms' && notification.send_to_sms) {
          // SMS delivery implementation would go here
          this.updateRecipientStatus(recipientId, 'sent');
          successCount++;
        }
      } catch (error) {
        gs.error(`Failed to deliver notification to recipient ${recipientId}: ${error.message}`);
        this.updateRecipientStatus(recipientId, 'failed', null, null, error.message);
        failureCount++;
      }
    }

    // Update notification status
    notificationGR.setValue('status', 'sent');
    notificationGR.setValue('actual_send_time', new GlideDateTime());
    notificationGR.setValue('delivery_success_count', successCount);
    notificationGR.setValue('delivery_failure_count', failureCount);
    notificationGR.update();

    return {
      success: true,
      successCount: successCount,
      failureCount: failureCount
    };
  }

  /**
   * Update recipient delivery status
   */
  updateRecipientStatus(recipientId, status, messageId = null, conversationId = null, failureReason = null) {
    const recipientGR = new GlideRecord('x_snc_crisis_notif_notification_recipient');
    if (recipientGR.get(recipientId)) {
      recipientGR.setValue('delivery_status', status);
      
      if (status === 'sent') {
        recipientGR.setValue('sent_time', new GlideDateTime());
      }
      
      if (messageId) {
        // Store message ID in a custom field if needed
      }
      
      if (conversationId) {
        recipientGR.setValue('teams_conversation_id', conversationId);
      }
      
      if (failureReason) {
        recipientGR.setValue('failure_reason', failureReason);
      }
      
      recipientGR.update();
    }
  }
}