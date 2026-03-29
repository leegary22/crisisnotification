import React, { useState } from 'react';
import { display, value } from '../utils/fields.js';

export default function DashboardNotifications({ 
  service, 
  pendingApprovals, 
  recentNotifications, 
  onActionComplete, 
  isLoading 
}) {
  const [actionLoading, setActionLoading] = useState('');
  const [selectedTab, setSelectedTab] = useState('pending');

  const handleQuickAction = async (action, notificationId) => {
    const actionKey = `${action}-${notificationId}`;
    setActionLoading(actionKey);
    
    try {
      if (action === 'approve') {
        await service.quickApprove(notificationId);
      } else if (action === 'send') {
        await service.sendNotification(notificationId);
      }
      onActionComplete();
    } catch (error) {
      console.error(`Failed to ${action} notification:`, error);
      alert(`Failed to ${action} notification: ${error.message}`);
    } finally {
      setActionLoading('');
    }
  };

  const formatDateTime = (dateValue) => {
    if (!dateValue) return 'Unknown';
    try {
      const date = new Date(display(dateValue));
      return date.toLocaleString();
    } catch {
      return display(dateValue);
    }
  };

  const renderNotificationItem = (notification, showActions = false) => (
    <div key={value(notification.sys_id)} className="notification-item">
      <div className="notification-item__content">
        <div className="notification-item__header">
          <h4 className="notification-item__title">{display(notification.title)}</h4>
          <div className="notification-item__badges">
            <span className={`severity-badge severity-badge--${display(notification.severity)}`}>
              {display(notification.severity)?.toUpperCase()}
            </span>
            <span className={`status-badge status-badge--${service.getStatusColor(display(notification.status))}`}>
              {display(notification.status)}
            </span>
          </div>
        </div>
        
        {display(notification.subject) && (
          <p className="notification-item__subject">{display(notification.subject)}</p>
        )}
        
        <div className="notification-item__message">
          {display(notification.message).substring(0, 150)}
          {display(notification.message).length > 150 ? '...' : ''}
        </div>
        
        <div className="notification-item__meta">
          <span>Created: {formatDateTime(notification.sys_created_on)}</span>
          <span>By: {display(notification.created_by)}</span>
          <span>Type: {display(notification.notification_type)}</span>
          {display(notification.recipient_count) && (
            <span>Recipients: {display(notification.recipient_count)}</span>
          )}
        </div>
      </div>
      
      {showActions && (
        <div className="notification-item__actions">
          {display(notification.status) === 'pending' && (
            <>
              <button
                className="btn btn--primary btn--small"
                onClick={() => handleQuickAction('approve', value(notification.sys_id))}
                disabled={actionLoading === `approve-${value(notification.sys_id)}`}
              >
                {actionLoading === `approve-${value(notification.sys_id)}` ? (
                  <>
                    <span className="loading-spinner"></span>
                    Approving...
                  </>
                ) : (
                  'Approve'
                )}
              </button>
              <button className="btn btn--danger btn--small">
                Reject
              </button>
            </>
          )}
          
          {display(notification.status) === 'approved' && (
            <button
              className="btn btn--success btn--small"
              onClick={() => handleQuickAction('send', value(notification.sys_id))}
              disabled={actionLoading === `send-${value(notification.sys_id)}`}
            >
              {actionLoading === `send-${value(notification.sys_id)}` ? (
                <>
                  <span className="loading-spinner"></span>
                  Sending...
                </>
              ) : (
                'Send Now'
              )}
            </button>
          )}
          
          <button 
            className="btn btn--secondary btn--small"
            onClick={() => window.open(`/x_snc_crisis_notif_management.do#detail/${value(notification.sys_id)}`, '_blank')}
          >
            View Details
          </button>
        </div>
      )}
    </div>
  );

  const renderPendingTab = () => {
    if (pendingApprovals.length === 0) {
      return (
        <div className="notifications-empty">
          <svg width="48" height="48" viewBox="0 0 16 16" fill="currentColor">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
          </svg>
          <h3>No Pending Approvals</h3>
          <p>All notifications have been processed. Great work!</p>
        </div>
      );
    }

    return (
      <div className="notifications-list">
        {pendingApprovals.map(notification => renderNotificationItem(notification, true))}
      </div>
    );
  };

  const renderRecentTab = () => {
    if (recentNotifications.length === 0) {
      return (
        <div className="notifications-empty">
          <svg width="48" height="48" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
          </svg>
          <h3>No Recent Notifications</h3>
          <p>No notifications have been created recently.</p>
        </div>
      );
    }

    return (
      <div className="notifications-list">
        {recentNotifications.map(notification => renderNotificationItem(notification, false))}
      </div>
    );
  };

  return (
    <div className="dashboard-notifications">
      <div className="dashboard-section">
        <div className="dashboard-section__header">
          <h2 className="dashboard-section__title">Notifications Management</h2>
          <div className="dashboard-section__actions">
            <a 
              href="/x_snc_crisis_notif_management.do"
              className="btn btn--primary"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
              Create New
            </a>
          </div>
        </div>

        <div className="notification-tabs">
          <button
            className={`notification-tab ${selectedTab === 'pending' ? 'notification-tab--active' : ''}`}
            onClick={() => setSelectedTab('pending')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
            Pending Approval
            {pendingApprovals.length > 0 && (
              <span className="notification-tab__badge">
                {pendingApprovals.length}
              </span>
            )}
          </button>

          <button
            className={`notification-tab ${selectedTab === 'recent' ? 'notification-tab--active' : ''}`}
            onClick={() => setSelectedTab('recent')}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
            </svg>
            Recent Activity
          </button>
        </div>

        <div className="notification-tabs__content">
          {selectedTab === 'pending' && renderPendingTab()}
          {selectedTab === 'recent' && renderRecentTab()}
        </div>
      </div>
    </div>
  );
}