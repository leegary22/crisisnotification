import React, { useState } from 'react';
import { display, value } from '../utils/fields.js';
import './NotificationList.css';

export default function NotificationList({ 
  notifications, 
  isLoading, 
  filters, 
  onFiltersChange, 
  onNotificationSelect, 
  onRefresh 
}) {
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key, newValue) => {
    onFiltersChange({
      ...filters,
      [key]: newValue
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const getSeverityIcon = (severity) => {
    return (
      <span className={`severity-indicator__icon severity-indicator__icon--${severity}`}></span>
    );
  };

  const getStatusBadge = (status) => {
    return (
      <span className={`status-badge status-badge--${status}`}>
        {status}
      </span>
    );
  };

  const formatDateTime = (dateValue) => {
    if (!dateValue) return '-';
    const displayValue = display(dateValue);
    if (!displayValue) return '-';
    
    try {
      const date = new Date(displayValue);
      return date.toLocaleString();
    } catch {
      return displayValue;
    }
  };

  if (isLoading && notifications.length === 0) {
    return (
      <div className="notification-list__loading">
        <div className="loading-spinner"></div>
        <p>Loading notifications...</p>
      </div>
    );
  }

  return (
    <div className="notification-list">
      <div className="notification-list__toolbar">
        <div className="notification-list__toolbar-left">
          <button 
            className={`btn btn--secondary ${showFilters ? 'btn--active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
            </svg>
            Filters
          </button>
          
          {Object.keys(filters).length > 0 && (
            <button 
              className="btn btn--secondary"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="notification-list__toolbar-right">
          <span className="notification-list__count">
            {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {showFilters && (
        <div className="notification-list__filters card">
          <div className="card__body">
            <div className="filters-grid">
              <div className="form-field">
                <label className="form-field__label">Status</label>
                <select 
                  className="form-field__select"
                  value={filters.status || ''}
                  onChange={(e) => handleFilterChange('status', e.target.value || undefined)}
                >
                  <option value="">All Statuses</option>
                  <option value="draft">Draft</option>
                  <option value="pending">Pending Approval</option>
                  <option value="approved">Approved</option>
                  <option value="sent">Sent</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="form-field">
                <label className="form-field__label">Severity</label>
                <select 
                  className="form-field__select"
                  value={filters.severity || ''}
                  onChange={(e) => handleFilterChange('severity', e.target.value || undefined)}
                >
                  <option value="">All Severities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {notifications.length === 0 ? (
        <div className="notification-list__empty card">
          <div className="card__body">
            <div className="notification-list__empty-content">
              <svg width="48" height="48" viewBox="0 0 16 16" fill="currentColor" opacity="0.5">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
              </svg>
              <h3>No notifications found</h3>
              <p>Create your first crisis notification to get started.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="table notification-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Severity</th>
                <th>Type</th>
                <th>Created</th>
                <th>Recipients</th>
                <th>Success Rate</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification) => (
                <tr 
                  key={value(notification.sys_id)}
                  className="notification-table__row"
                  onClick={() => onNotificationSelect(notification)}
                >
                  <td className="notification-table__title">
                    <div>
                      <div className="notification-title">
                        {display(notification.title)}
                      </div>
                      {display(notification.subject) && (
                        <div className="notification-subject">
                          {display(notification.subject)}
                        </div>
                      )}
                      <div className="notification-preview">
                        {display(notification.message).substring(0, 100)}
                        {display(notification.message).length > 100 ? '...' : ''}
                      </div>
                    </div>
                  </td>
                  <td>
                    {getStatusBadge(display(notification.status))}
                  </td>
                  <td>
                    <div className="severity-indicator">
                      {getSeverityIcon(display(notification.severity))}
                      <span className="severity-text">
                        {display(notification.severity)}
                      </span>
                    </div>
                  </td>
                  <td>{display(notification.notification_type)}</td>
                  <td>{formatDateTime(notification.sys_created_on)}</td>
                  <td>{display(notification.recipient_count) || '0'}</td>
                  <td>
                    {(() => {
                      const total = parseInt(display(notification.recipient_count)) || 0;
                      const success = parseInt(display(notification.delivery_success_count)) || 0;
                      if (total === 0) return '-';
                      const rate = Math.round((success / total) * 100);
                      return (
                        <div className="success-rate">
                          <span className={`success-rate__value ${rate >= 90 ? 'success-rate__value--good' : rate >= 70 ? 'success-rate__value--ok' : 'success-rate__value--poor'}`}>
                            {rate}%
                          </span>
                          <span className="success-rate__details">
                            ({success}/{total})
                          </span>
                        </div>
                      );
                    })()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}