import React from 'react';

export default function DashboardStats({ stats, pendingCount, activeCount, isLoading }) {
  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'sent': return 'primary';
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'cancelled': return 'danger';
      default: return 'primary';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'danger';
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'primary';
    }
  };

  if (isLoading || !stats) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard statistics...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-grid dashboard-grid--overview">
      {/* Key Metrics */}
      <div className="stats-container">
        <div className="stats-container__header">
          <h3 className="stats-container__title">Key Metrics</h3>
          <p className="stats-container__subtitle">Last 30 days</p>
        </div>
        <div className="metric-cards">
          <div className="metric-card metric-card--primary">
            <div className="metric-card__value">{formatNumber(stats.totalNotifications)}</div>
            <div className="metric-card__label">Total Notifications</div>
          </div>
          <div className="metric-card metric-card--warning">
            <div className="metric-card__value">{pendingCount}</div>
            <div className="metric-card__label">Pending Approval</div>
          </div>
          <div className="metric-card metric-card--success">
            <div className="metric-card__value">{activeCount}</div>
            <div className="metric-card__label">Active</div>
          </div>
          <div className="metric-card">
            <div className="metric-card__value">{stats.averageDeliveryRate}%</div>
            <div className="metric-card__label">Avg Delivery Rate</div>
          </div>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="stats-container">
        <div className="stats-container__header">
          <h3 className="stats-container__title">Status Distribution</h3>
        </div>
        <div className="status-breakdown">
          {Object.entries(stats.statusCounts).map(([status, count]) => (
            <div key={status} className={`status-item status-item--${getStatusColor(status)}`}>
              <div className="status-item__bar" style={{ width: `${(count / stats.totalNotifications) * 100}%` }}></div>
              <div className="status-item__content">
                <span className="status-item__label">{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                <span className="status-item__value">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Severity Analysis */}
      <div className="stats-container">
        <div className="stats-container__header">
          <h3 className="stats-container__title">Severity Analysis</h3>
        </div>
        <div className="severity-chart">
          {Object.entries(stats.severityCounts).map(([severity, count]) => (
            <div key={severity} className={`severity-item severity-item--${getSeverityColor(severity)}`}>
              <div className="severity-item__icon">
                <span className={`severity-indicator__icon severity-indicator__icon--${severity}`}></span>
              </div>
              <div className="severity-item__content">
                <div className="severity-item__label">{severity.charAt(0).toUpperCase() + severity.slice(1)}</div>
                <div className="severity-item__value">{count} notifications</div>
                <div className="severity-item__percentage">
                  {Math.round((count / stats.totalNotifications) * 100)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Types */}
      <div className="stats-container">
        <div className="stats-container__header">
          <h3 className="stats-container__title">Notification Types</h3>
        </div>
        <div className="type-list">
          {Object.entries(stats.typeCounts).map(([type, count]) => (
            <div key={type} className="type-item">
              <div className="type-item__label">{type.replace('_', ' ').charAt(0).toUpperCase() + type.replace('_', ' ').slice(1)}</div>
              <div className="type-item__count">{count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Target Audience Analysis */}
      <div className="stats-container">
        <div className="stats-container__header">
          <h3 className="stats-container__title">Target Audiences</h3>
        </div>
        <div className="audience-chart">
          {Object.entries(stats.audienceCounts).map(([audience, count]) => (
            <div key={audience} className="audience-item">
              <div className="audience-item__bar-container">
                <div 
                  className="audience-item__bar" 
                  style={{ width: `${(count / stats.totalNotifications) * 100}%` }}
                ></div>
              </div>
              <div className="audience-item__content">
                <span className="audience-item__label">
                  {audience.replace('_', ' ').charAt(0).toUpperCase() + audience.replace('_', ' ').slice(1)}
                </span>
                <span className="audience-item__value">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="stats-container">
        <div className="stats-container__header">
          <h3 className="stats-container__title">Recent Activity</h3>
        </div>
        <div className="recent-activity">
          {stats.recentActivity.length === 0 ? (
            <div className="dashboard-empty">
              <p>No recent activity</p>
            </div>
          ) : (
            stats.recentActivity.map(notification => (
              <div key={notification.sys_id?.value} className="activity-item">
                <div className="activity-item__content">
                  <div className="activity-item__title">{notification.title?.display_value}</div>
                  <div className="activity-item__meta">
                    <span className={`status-badge status-badge--${notification.status?.display_value}`}>
                      {notification.status?.display_value}
                    </span>
                    <span className="activity-item__time">
                      {new Date(notification.sys_created_on?.display_value).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="activity-item__severity">
                  <span className={`severity-indicator__icon severity-indicator__icon--${notification.severity?.display_value}`}></span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}