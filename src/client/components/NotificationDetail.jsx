import React, { useState, useEffect } from 'react';
import { display, value } from '../utils/fields.js';
import './NotificationDetail.css';

export default function NotificationDetail({ service, notification, onEdit, onBack, onRefresh }) {
  const [recipients, setRecipients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState('');

  useEffect(() => {
    loadRecipients();
  }, [notification]);

  const loadRecipients = async () => {
    setIsLoading(true);
    try {
      const recipientsData = await service.getRecipients(value(notification.sys_id));
      setRecipients(recipientsData);
    } catch (error) {
      console.error('Failed to load recipients:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendNotification = async () => {
    setActionLoading('send');
    try {
      await service.sendNotification(value(notification.sys_id));
      onRefresh();
    } catch (error) {
      console.error('Failed to send notification:', error);
      alert('Failed to send notification: ' + error.message);
    } finally {
      setActionLoading('');
    }
  };

  const handleCreateRecipients = async () => {
    setActionLoading('recipients');
    try {
      await service.createRecipients(value(notification.sys_id));
      onRefresh();
      loadRecipients();
    } catch (error) {
      console.error('Failed to create recipients:', error);
      alert('Failed to create recipients: ' + error.message);
    } finally {
      setActionLoading('');
    }
  };

  const handleTestTeams = async () => {
    setActionLoading('test');
    try {
      const result = await service.testTeamsConnection();
      if (result.success) {
        alert('Teams connection test successful!');
      } else {
        alert('Teams connection test failed: ' + result.message);
      }
    } catch (error) {
      console.error('Failed to test Teams connection:', error);
      alert('Failed to test Teams connection: ' + error.message);
    } finally {
      setActionLoading('');
    }
  };

  const formatDateTime = (dateValue) => {
    if (!dateValue) return 'Not set';
    const displayValue = display(dateValue);
    if (!displayValue) return 'Not set';
    
    try {
      const date = new Date(displayValue);
      return date.toLocaleString();
    } catch {
      return displayValue;
    }
  };

  const getStatusBadge = (status) => {
    return (
      <span className={`status-badge status-badge--${status}`}>
        {status}
      </span>
    );
  };

  const getSeverityIcon = (severity) => {
    return (
      <span className={`severity-indicator__icon severity-indicator__icon--${severity}`}></span>
    );
  };

  const getDeliveryStats = () => {
    const total = parseInt(display(notification.recipient_count)) || 0;
    const success = parseInt(display(notification.delivery_success_count)) || 0;
    const failure = parseInt(display(notification.delivery_failure_count)) || 0;
    const rate = total > 0 ? Math.round((success / total) * 100) : 0;

    return { total, success, failure, rate };
  };

  const canSend = display(notification.status) === 'approved';
  const canEdit = ['draft', 'pending'].includes(display(notification.status));
  const stats = getDeliveryStats();

  return (
    <div className="notification-detail">
      <div className="notification-detail__header card">
        <div className="card__body">
          <div className="notification-detail__header-content">
            <div className="notification-detail__title-section">
              <h1 className="notification-detail__title">
                {display(notification.title)}
              </h1>
              {display(notification.subject) && (
                <p className="notification-detail__subject">
                  {display(notification.subject)}
                </p>
              )}
              <div className="notification-detail__meta">
                <div className="notification-detail__status">
                  {getStatusBadge(display(notification.status))}
                </div>
                <div className="severity-indicator">
                  {getSeverityIcon(display(notification.severity))}
                  <span className="severity-text">
                    {display(notification.severity)} severity
                  </span>
                </div>
                <span className="notification-detail__type">
                  {display(notification.notification_type)}
                </span>
              </div>
            </div>
            
            <div className="notification-detail__actions">
              {canEdit && (
                <button 
                  className="btn btn--secondary"
                  onClick={() => onEdit(notification)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708L8.5 11.207l-3 1a.5.5 0 0 1-.638-.638l1-3L12.146.146zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                  </svg>
                  Edit
                </button>
              )}
              
              {canSend && (
                <button 
                  className="btn btn--primary"
                  onClick={handleSendNotification}
                  disabled={actionLoading === 'send'}
                >
                  {actionLoading === 'send' ? (
                    <>
                      <span className="loading-spinner"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M15.854.146a.5.5 0 0 1 .11.54L13.026 8.2a.5.5 0 0 1-.708.292L8.5 6.846 2.146 13.2a.5.5 0 0 1-.708-.708L7.793 6.5 6.346 2.682a.5.5 0 0 1 .292-.708L13.854.036a.5.5 0 0 1 .11.11z"/>
                      </svg>
                      Send Now
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="notification-detail__content">
        <div className="notification-detail__main">
          <div className="card">
            <div className="card__header">
              <h2>Message Content</h2>
            </div>
            <div className="card__body">
              <div className="notification-detail__message">
                {display(notification.message)}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card__header">
              <h2>Delivery Channels</h2>
            </div>
            <div className="card__body">
              <div className="notification-detail__channels">
                <div className={`channel-item ${display(notification.send_to_teams) === 'true' ? 'channel-item--enabled' : 'channel-item--disabled'}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zM8 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
                  </svg>
                  <span>MS Teams</span>
                  {display(notification.send_to_teams) === 'true' && display(notification.teams_channel_id) && (
                    <span className="channel-detail">Channel: {display(notification.teams_channel_id)}</span>
                  )}
                </div>
                
                <div className={`channel-item ${display(notification.send_to_email) === 'true' ? 'channel-item--enabled' : 'channel-item--disabled'}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 14H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                  </svg>
                  <span>Email</span>
                </div>
                
                <div className={`channel-item ${display(notification.send_to_sms) === 'true' ? 'channel-item--enabled' : 'channel-item--disabled'}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M1 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2zm12-1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
                    <path d="M3.5 13.5a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-9z"/>
                  </svg>
                  <span>SMS</span>
                </div>
              </div>
            </div>
          </div>

          {stats.total > 0 && (
            <div className="card">
              <div className="card__header">
                <h2>Delivery Statistics</h2>
              </div>
              <div className="card__body">
                <div className="delivery-stats">
                  <div className="stat-item">
                    <div className="stat-value">{stats.total}</div>
                    <div className="stat-label">Total Recipients</div>
                  </div>
                  <div className="stat-item stat-item--success">
                    <div className="stat-value">{stats.success}</div>
                    <div className="stat-label">Successful</div>
                  </div>
                  <div className="stat-item stat-item--failure">
                    <div className="stat-value">{stats.failure}</div>
                    <div className="stat-label">Failed</div>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">{stats.rate}%</div>
                    <div className="stat-label">Success Rate</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="notification-detail__sidebar">
          <div className="card">
            <div className="card__header">
              <h2>Details</h2>
            </div>
            <div className="card__body">
              <div className="detail-grid">
                <div className="detail-item">
                  <dt>Target Audience</dt>
                  <dd>{display(notification.target_audience).replace('_', ' ')}</dd>
                </div>
                
                <div className="detail-item">
                  <dt>Created</dt>
                  <dd>{formatDateTime(notification.sys_created_on)}</dd>
                </div>
                
                <div className="detail-item">
                  <dt>Created By</dt>
                  <dd>{display(notification.created_by)}</dd>
                </div>
                
                {display(notification.approved_by) && (
                  <div className="detail-item">
                    <dt>Approved By</dt>
                    <dd>{display(notification.approved_by)}</dd>
                  </div>
                )}
                
                <div className="detail-item">
                  <dt>Scheduled Time</dt>
                  <dd>{formatDateTime(notification.scheduled_send_time)}</dd>
                </div>
                
                <div className="detail-item">
                  <dt>Expires On</dt>
                  <dd>{formatDateTime(notification.expires_on)}</dd>
                </div>
                
                {display(notification.actual_send_time) && (
                  <div className="detail-item">
                    <dt>Sent Time</dt>
                    <dd>{formatDateTime(notification.actual_send_time)}</dd>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card__header">
              <h2>Actions</h2>
            </div>
            <div className="card__body">
              <div className="action-buttons">
                <button 
                  className="btn btn--secondary action-btn"
                  onClick={handleCreateRecipients}
                  disabled={actionLoading === 'recipients'}
                >
                  {actionLoading === 'recipients' ? (
                    <>
                      <span className="loading-spinner"></span>
                      Creating...
                    </>
                  ) : (
                    'Create Recipients'
                  )}
                </button>
                
                <button 
                  className="btn btn--secondary action-btn"
                  onClick={handleTestTeams}
                  disabled={actionLoading === 'test'}
                >
                  {actionLoading === 'test' ? (
                    <>
                      <span className="loading-spinner"></span>
                      Testing...
                    </>
                  ) : (
                    'Test Teams'
                  )}
                </button>
                
                <button 
                  className="btn btn--secondary action-btn"
                  onClick={onRefresh}
                >
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}