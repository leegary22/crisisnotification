import React from 'react';

export default function DashboardAnalytics({ overviewStats, isLoading }) {

  const renderStatusChart = () => {
    if (!overviewStats?.statusCounts) return null;

    const total = overviewStats.totalNotifications;
    if (total === 0) return <div className="chart-empty">No data available</div>;

    return (
      <div className="status-chart">
        {Object.entries(overviewStats.statusCounts).map(([status, count]) => {
          const percentage = Math.round((count / total) * 100);
          return (
            <div key={status} className="status-chart__item">
              <div className="status-chart__bar-container">
                <div 
                  className={`status-chart__bar status-chart__bar--${status}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="status-chart__legend">
                <span className="status-chart__label">{status}</span>
                <span className="status-chart__value">{count} ({percentage}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderSeverityChart = () => {
    if (!overviewStats?.severityCounts) return null;

    return (
      <div className="severity-chart">
        {Object.entries(overviewStats.severityCounts).map(([severity, count]) => {
          const percentage = Math.round((count / overviewStats.totalNotifications) * 100);
          return (
            <div key={severity} className={`severity-chart__item severity-chart__item--${severity}`}>
              <div className="severity-chart__header">
                <span className={`severity-indicator severity-indicator--${severity}`}>
                  {severity}
                </span>
                <span className="severity-chart__count">{count}</span>
              </div>
              <div className="severity-chart__bar-container">
                <div 
                  className={`severity-chart__bar severity-chart__bar--${severity}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="severity-chart__percentage">{percentage}%</div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderTypeBreakdown = () => {
    if (!overviewStats?.typeCounts) return null;

    return (
      <div className="type-breakdown">
        {Object.entries(overviewStats.typeCounts)
          .sort(([,a], [,b]) => b - a)
          .map(([type, count]) => (
            <div key={type} className="type-breakdown__item">
              <div className="type-breakdown__label">
                {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </div>
              <div className="type-breakdown__bar-container">
                <div 
                  className="type-breakdown__bar"
                  style={{ width: `${(count / overviewStats.totalNotifications) * 100}%` }}
                ></div>
              </div>
              <div className="type-breakdown__value">{count}</div>
            </div>
          ))}
      </div>
    );
  };

  const renderAudienceAnalysis = () => {
    if (!overviewStats?.audienceCounts) return null;

    return (
      <div className="audience-analysis">
        {Object.entries(overviewStats.audienceCounts).map(([audience, count]) => {
          const percentage = Math.round((count / overviewStats.totalNotifications) * 100);
          return (
            <div key={audience} className="audience-analysis__item">
              <div className="audience-analysis__info">
                <span className="audience-analysis__label">
                  {audience.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                <span className="audience-analysis__stats">{count} notifications ({percentage}%)</span>
              </div>
              <div className="audience-analysis__visual">
                <div className="audience-analysis__circle-container">
                  <svg className="audience-analysis__circle" width="60" height="60">
                    <circle
                      cx="30"
                      cy="30"
                      r="25"
                      fill="none"
                      stroke="var(--snx-color-border)"
                      strokeWidth="4"
                    />
                    <circle
                      cx="30"
                      cy="30"
                      r="25"
                      fill="none"
                      stroke="rgb(var(--now-actionable--primary--background-color, 0,128,163))"
                      strokeWidth="4"
                      strokeDasharray={`${percentage * 1.57} 157`}
                      strokeDashoffset="39.25"
                      transform="rotate(-90 30 30)"
                    />
                  </svg>
                  <div className="audience-analysis__percentage">{percentage}%</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (isLoading && !overviewStats) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading analytics data...</p>
      </div>
    );
  }

  if (!overviewStats) {
    return (
      <div className="dashboard-empty">
        <p>No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="dashboard-analytics">
      <div className="dashboard-grid dashboard-grid--two-col">
        {/* Status Distribution */}
        <div className="analytics-card">
          <div className="analytics-card__header">
            <h3 className="analytics-card__title">Status Distribution</h3>
            <span className="analytics-card__subtitle">
              {overviewStats.totalNotifications} total notifications
            </span>
          </div>
          <div className="analytics-card__content">
            {renderStatusChart()}
          </div>
        </div>

        {/* Severity Analysis */}
        <div className="analytics-card">
          <div className="analytics-card__header">
            <h3 className="analytics-card__title">Severity Analysis</h3>
            <span className="analytics-card__subtitle">Risk level breakdown</span>
          </div>
          <div className="analytics-card__content">
            {renderSeverityChart()}
          </div>
        </div>
      </div>

      <div className="dashboard-grid dashboard-grid--two-col">
        {/* Notification Types */}
        <div className="analytics-card">
          <div className="analytics-card__header">
            <h3 className="analytics-card__title">Notification Types</h3>
            <span className="analytics-card__subtitle">Most common alert types</span>
          </div>
          <div className="analytics-card__content">
            {renderTypeBreakdown()}
          </div>
        </div>

        {/* Target Audience */}
        <div className="analytics-card">
          <div className="analytics-card__header">
            <h3 className="analytics-card__title">Target Audience</h3>
            <span className="analytics-card__subtitle">Notification reach analysis</span>
          </div>
          <div className="analytics-card__content">
            {renderAudienceAnalysis()}
          </div>
        </div>
      </div>

      {/* Delivery Performance */}
      <div className="analytics-card analytics-card--full">
        <div className="analytics-card__header">
          <h3 className="analytics-card__title">Delivery Performance</h3>
          <span className="analytics-card__subtitle">Last 30 days delivery statistics</span>
        </div>
        <div className="analytics-card__content">
          <div className="delivery-stats">
            <div className="delivery-stats__metric">
              <div className="delivery-stats__value">
                {overviewStats.deliveryStats.averageSuccessRate}%
              </div>
              <div className="delivery-stats__label">Average Success Rate</div>
            </div>
            <div className="delivery-stats__metric">
              <div className="delivery-stats__value">
                {overviewStats.deliveryStats.totalRecipients.toLocaleString()}
              </div>
              <div className="delivery-stats__label">Total Recipients</div>
            </div>
            <div className="delivery-stats__metric">
              <div className="delivery-stats__value">
                {overviewStats.deliveryStats.successfulDeliveries.toLocaleString()}
              </div>
              <div className="delivery-stats__label">Successful Deliveries</div>
            </div>
            <div className="delivery-stats__metric">
              <div className="delivery-stats__value">
                {(overviewStats.deliveryStats.totalRecipients - overviewStats.deliveryStats.successfulDeliveries).toLocaleString()}
              </div>
              <div className="delivery-stats__label">Failed Deliveries</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}