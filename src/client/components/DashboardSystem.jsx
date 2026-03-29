import React from 'react';

export default function DashboardSystem({ systemHealth, onRefresh, isLoading }) {

  const renderHealthStatus = () => {
    if (!systemHealth) {
      return (
        <div className="system-health__status system-health__status--loading">
          <div className="loading-spinner"></div>
          <span>Checking system health...</span>
        </div>
      );
    }

    const statusConfig = {
      healthy: {
        color: 'success',
        icon: '✓',
        title: 'All Systems Operational',
        description: 'All components are functioning correctly'
      },
      warning: {
        color: 'warning',
        icon: '⚠',
        title: 'Minor Issues Detected',
        description: 'Some components may need attention'
      },
      error: {
        color: 'danger',
        icon: '✕',
        title: 'System Issues Found',
        description: 'Critical components need immediate attention'
      }
    };

    const status = statusConfig[systemHealth.systemStatus] || statusConfig.warning;

    return (
      <div className={`system-health__status system-health__status--${status.color}`}>
        <div className="system-health__status-icon">{status.icon}</div>
        <div className="system-health__status-content">
          <div className="system-health__status-title">{status.title}</div>
          <div className="system-health__status-description">{status.description}</div>
        </div>
      </div>
    );
  };

  const renderTeamsHealth = () => {
    if (!systemHealth) return null;

    return (
      <div className="component-health">
        <div className="component-health__header">
          <h4 className="component-health__title">Microsoft Teams Integration</h4>
          <span className={`component-health__status component-health__status--${systemHealth.teamsConfigured ? 'success' : 'error'}`}>
            {systemHealth.teamsConfigured ? 'Configured' : 'Not Configured'}
          </span>
        </div>
        
        <div className="component-health__details">
          <div className="health-check">
            <span className="health-check__label">Configuration:</span>
            <span className={`health-check__value ${systemHealth.teamsConfigured ? 'health-check__value--success' : 'health-check__value--error'}`}>
              {systemHealth.teamsConfigured ? 'Active' : 'Missing'}
            </span>
          </div>
          
          <div className="health-check">
            <span className="health-check__label">API Connection:</span>
            <span className={`health-check__value ${systemHealth.teamsConnection.success ? 'health-check__value--success' : 'health-check__value--error'}`}>
              {systemHealth.teamsConnection.success ? 'Connected' : 'Failed'}
            </span>
          </div>
          
          {systemHealth.teamsConnection.message && (
            <div className="health-check">
              <span className="health-check__label">Status:</span>
              <span className="health-check__message">
                {systemHealth.teamsConnection.message}
              </span>
            </div>
          )}
        </div>
        
        <div className="component-health__actions">
          <a 
            href="/x_snc_crisis_notif_teams_setup.do"
            className="btn btn--secondary btn--small"
          >
            Configure Teams
          </a>
        </div>
      </div>
    );
  };

  const renderTemplatesHealth = () => {
    if (!systemHealth) return null;

    return (
      <div className="component-health">
        <div className="component-health__header">
          <h4 className="component-health__title">Notification Templates</h4>
          <span className={`component-health__status component-health__status--${systemHealth.templatesAvailable > 0 ? 'success' : 'warning'}`}>
            {systemHealth.templatesAvailable || 0} Available
          </span>
        </div>
        
        <div className="component-health__details">
          <div className="health-check">
            <span className="health-check__label">Active Templates:</span>
            <span className="health-check__value">
              {systemHealth.templatesAvailable || 0}
            </span>
          </div>
          
          {systemHealth.templatesAvailable === 0 && (
            <div className="health-check">
              <span className="health-check__message health-check__message--warning">
                No templates configured. Consider creating templates for common notifications.
              </span>
            </div>
          )}
        </div>
        
        <div className="component-health__actions">
          <a 
            href="/x_snc_crisis_notif_notification_template_list.do"
            className="btn btn--secondary btn--small"
          >
            Manage Templates
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-system">
      <div className="dashboard-section">
        <div className="dashboard-section__header">
          <h2 className="dashboard-section__title">System Health</h2>
          <button 
            className="btn btn--secondary btn--small"
            onClick={onRefresh}
            disabled={isLoading}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
              <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
            </svg>
            Refresh
          </button>
        </div>

        <div className="system-overview">
          {renderHealthStatus()}
        </div>

        <div className="dashboard-grid dashboard-grid--two-col">
          {renderTeamsHealth()}
          {renderTemplatesHealth()}
        </div>

        <div className="system-recommendations">
          <h3 className="system-recommendations__title">Recommendations</h3>
          <div className="recommendations-list">
            {!systemHealth?.teamsConfigured && (
              <div className="recommendation-item recommendation-item--warning">
                <div className="recommendation-item__icon">⚠</div>
                <div className="recommendation-item__content">
                  <div className="recommendation-item__title">Configure Microsoft Teams</div>
                  <div className="recommendation-item__description">
                    Set up Teams integration to enable crisis notification delivery through Microsoft Teams.
                  </div>
                </div>
                <a href="/x_snc_crisis_notif_teams_setup.do" className="btn btn--secondary btn--small">
                  Configure
                </a>
              </div>
            )}
            
            {systemHealth?.templatesAvailable === 0 && (
              <div className="recommendation-item recommendation-item--info">
                <div className="recommendation-item__icon">ℹ</div>
                <div className="recommendation-item__content">
                  <div className="recommendation-item__title">Create Notification Templates</div>
                  <div className="recommendation-item__description">
                    Templates help standardize and speed up crisis notification creation.
                  </div>
                </div>
                <a href="/x_snc_crisis_notif_notification_template_list.do" className="btn btn--secondary btn--small">
                  Create Templates
                </a>
              </div>
            )}

            {systemHealth?.teamsConfigured && systemHealth?.teamsConnection.success && systemHealth?.templatesAvailable > 0 && (
              <div className="recommendation-item recommendation-item--success">
                <div className="recommendation-item__icon">✓</div>
                <div className="recommendation-item__content">
                  <div className="recommendation-item__title">System Ready</div>
                  <div className="recommendation-item__description">
                    Your crisis notification system is fully configured and ready for use.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}