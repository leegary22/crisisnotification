import React from 'react';
import { display, value } from '../utils/fields.js';

export default function DashboardOverview({ 
  service, 
  overviewStats, 
  pendingApprovals, 
  systemHealth, 
  onActionComplete, 
  onViewChange,
  isLoading 
}) {

  const handleQuickAction = async (action, notificationId) => {
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
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num?.toString() || '0';
  };

  const renderMetricCard = (title, value, color = 'primary', trend = null, onClick = null) => (
    <div 
      className={`metric-card metric-card--${color} ${onClick ? 'metric-card--clickable' : ''}`}
      onClick={onClick}
    >
      <div className="metric-card__value">{formatNumber(value)}</div>
      <div className="metric-card__label">{title}</div>
      {trend && (
        <div className={`metric-card__trend metric-card__trend--${trend.direction}`}>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
            {trend.direction === 'up' ? (
              <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
            ) : trend.direction === 'down' ? (
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
            ) : (
              <path d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8z"/>
            )}
          </svg>
          {trend.percentChange > 0 ? `+${trend.percentChange}%` : `${trend.percentChange}%`}
        </div>
      )}
    </div>
  );

  const renderSystemStatusCard = () => {
    if (!systemHealth) return null;
    
    const statusInfo = {
      healthy: { color: 'success', text: 'All Systems Operational', icon: '✓' },
      warning: { color: 'warning', text: 'Minor Issues Detected', icon: '⚠' },
      error: { color: 'danger', text: 'System Issues Found', icon: '✕' }
    };

    const status = statusInfo[systemHealth.systemStatus] || statusInfo.warning;

    return (
      <div className={`system-status-card system-status-card--${status.color}`}>
        <div className="system-status-card__header">
          <div className="system-status-card__icon">{status.icon}</div>
          <div className="system-status-card__title">System Health</div>
        </div>
        <div className="system-status-card__status">{status.text}</div>
        <div className="system-status-card__details">
          <div className="status-detail">
            <span className="status-detail__label">Teams Integration:</span>
            <span className={`status-detail__value ${systemHealth.teamsConfigured ? 'status-detail__value--success' : 'status-detail__value--error'}`}>
              {systemHealth.teamsConfigured ? 'Configured' : 'Not Configured'}
            </span>
          </div>
          <div className="status-detail">
            <span className="status-detail__label">Connection:</span>
            <span className={`status-detail__value ${systemHealth.teamsConnection.success ? 'status-detail__value--success' : 'status-detail__value--error'}`}>
              {systemHealth.teamsConnection.success ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
        <button 
          className="system-status-card__action btn btn--secondary btn--small"
          onClick={() => onViewChange('system')}
        >
          View Details
        </button>
      </div>
    );
  };

  const renderPendingApprovals = () => {
    if (pendingApprovals.length === 0) {
      return (
        <div className="quick-actions__empty">
          <svg width="32" height="32" viewBox="0 0 16 16" fill="currentColor">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
          </svg>
          <p>No pending approvals</p>
        </div>
      );
    }

    return (
      <div className="pending-approvals-list">
        {pendingApprovals.slice(0, 3).map(notification => (
          <div key={value(notification.sys_id)} className="approval-item">
            <div className="approval-item__content">
              <div className="approval-item__title">{display(notification.title)}</div>
              <div className="approval-item__meta">
                <span className={`severity-badge severity-badge--${display(notification.severity)}`}>
                  {display(notification.severity).toUpperCase()}
                </span>
                <span className="approval-item__time">
                  {new Date(display(notification.sys_created_on)).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="approval-item__actions">
              <button
                className="btn btn--primary btn--small"
                onClick={() => handleQuickAction('approve', value(notification.sys_id))}
              >
                Approve
              </button>
            </div>
          </div>
        ))}
        {pendingApprovals.length > 3 && (
          <div className="pending-approvals-list__footer">
            <button 
              className="btn btn--secondary btn--small"
              onClick={() => onViewChange('notifications')}
            >
              View All {pendingApprovals.length} Pending
            </button>
          </div>
        )}
      </div>
    );
  };

  if (isLoading && !overviewStats) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading overview data...</p>
      </div>
    );
  }

  if (!overviewStats) {
    return (
      <div className="dashboard-empty">
        <p>No overview data available</p>
      </div>
    );
  }

  return (
    <div className="dashboard-overview">
      {/* Key Metrics Row */}
      <div className="dashboard-section">
        <div className="dashboard-section__header">
          <h2 className="dashboard-section__title">Key Metrics</h2>
          <span className="dashboard-section__subtitle">Last 30 days</span>
        </div>
        <div className="metrics-grid">
          {renderMetricCard(
            'Total Notifications',
            overviewStats.totalNotifications,
            'primary',
            overviewStats.trends
          )}
          {renderMetricCard(
            'Pending Approval',
            overviewStats.pendingApprovals,
            'warning',
            null,
            () => onViewChange('notifications')
          )}
          {renderMetricCard(
            'Active/Sent',
            overviewStats.activeSent,
            'success'
          )}
          {renderMetricCard(
            'Avg Delivery Rate',
            `${overviewStats.deliveryStats.averageSuccessRate}%`,
            'info'
          )}
        </div>
      </div>

      <div className="dashboard-grid dashboard-grid--two-col">
        {/* Quick Actions */}
        <div className="dashboard-section">
          <div className="dashboard-section__header">
            <h2 className="dashboard-section__title">Pending Approvals</h2>
            <button 
              className="btn btn--secondary btn--small"
              onClick={() => onViewChange('notifications')}
            >
              View All
            </button>
          </div>
          <div className="quick-actions">
            {renderPendingApprovals()}
          </div>
        </div>

        {/* System Health */}
        <div className="dashboard-section">
          <div className="dashboard-section__header">
            <h2 className="dashboard-section__title">System Status</h2>
          </div>
          {renderSystemStatusCard()}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="dashboard-section">
        <div className="dashboard-section__header">
          <h2 className="dashboard-section__title">Recent Activity</h2>
          <button 
            className="btn btn--secondary btn--small"
            onClick={() => onViewChange('notifications')}
          >
            View All
          </button>
        </div>
        <div className="recent-activity">
          {overviewStats.recentActivity.slice(0, 5).map(notification => (
            <div key={value(notification.sys_id)} className="activity-item">
              <div className="activity-item__content">
                <div className="activity-item__title">{display(notification.title)}</div>
                <div className="activity-item__meta">
                  <span className={`status-badge status-badge--${service.getStatusColor(display(notification.status))}`}>
                    {display(notification.status)}
                  </span>
                  <span className="activity-item__time">
                    {new Date(display(notification.sys_created_on)).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="activity-item__severity">
                <span className={`severity-indicator severity-indicator--${display(notification.severity)}`}>
                  {display(notification.severity)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}