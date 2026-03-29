import React, { useState } from 'react';
import { display, value } from '../utils/fields.js';

export default function PendingApprovals({ service, pendingApprovals, onApprovalAction, isLoading }) {
  const [actionLoading, setActionLoading] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState(new Set());
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectingNotification, setRejectingNotification] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const handleApprove = async (notificationId) => {
    setActionLoading(`approve-${notificationId}`);
    try {
      await service.approveNotification(notificationId);
      onApprovalAction();
    } catch (error) {
      console.error('Failed to approve notification:', error);
      alert('Failed to approve notification: ' + error.message);
    } finally {
      setActionLoading('');
    }
  };

  const handleReject = (notification) => {
    setRejectingNotification(notification);
    setShowRejectModal(true);
    setRejectReason('');
  };

  const handleRejectConfirm = async () => {
    if (!rejectingNotification || !rejectReason.trim()) {
      return;
    }

    setActionLoading(`reject-${value(rejectingNotification.sys_id)}`);
    try {
      await service.rejectNotification(value(rejectingNotification.sys_id), rejectReason);
      setShowRejectModal(false);
      setRejectingNotification(null);
      setRejectReason('');
      onApprovalAction();
    } catch (error) {
      console.error('Failed to reject notification:', error);
      alert('Failed to reject notification: ' + error.message);
    } finally {
      setActionLoading('');
    }
  };

  const handleBulkApprove = async () => {
    if (selectedNotifications.size === 0) return;

    setActionLoading('bulk-approve');
    try {
      const results = await service.bulkApprove(Array.from(selectedNotifications));
      const failures = results.filter(r => !r.success);
      
      if (failures.length > 0) {
        alert(`${results.length - failures.length} notifications approved successfully. ${failures.length} failed.`);
      }
      
      setSelectedNotifications(new Set());
      onApprovalAction();
    } catch (error) {
      console.error('Failed bulk approve:', error);
      alert('Failed to bulk approve notifications: ' + error.message);
    } finally {
      setActionLoading('');
    }
  };

  const toggleSelection = (notificationId) => {
    const newSelection = new Set(selectedNotifications);
    if (newSelection.has(notificationId)) {
      newSelection.delete(notificationId);
    } else {
      newSelection.add(notificationId);
    }
    setSelectedNotifications(newSelection);
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

  if (pendingApprovals.length === 0) {
    return (
      <div className="dashboard-grid dashboard-grid--full">
        <div className="dashboard-empty">
          <svg width="48" height="48" viewBox="0 0 16 16" fill="currentColor">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
          </svg>
          <h3>No Pending Approvals</h3>
          <p>All notifications have been processed. Great work!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-grid dashboard-grid--full">
      <div className="stats-container">
        <div className="stats-container__header">
          <div>
            <h3 className="stats-container__title">Pending Approvals</h3>
            <p className="stats-container__subtitle">
              {pendingApprovals.length} notification{pendingApprovals.length !== 1 ? 's' : ''} awaiting approval
            </p>
          </div>
          
          {selectedNotifications.size > 0 && (
            <div className="bulk-actions">
              <span className="bulk-selection-count">
                {selectedNotifications.size} selected
              </span>
              <button 
                className="btn btn--primary action-btn--small"
                onClick={handleBulkApprove}
                disabled={actionLoading === 'bulk-approve'}
              >
                {actionLoading === 'bulk-approve' ? (
                  <>
                    <span className="loading-spinner"></span>
                    Approving...
                  </>
                ) : (
                  'Bulk Approve'
                )}
              </button>
            </div>
          )}
        </div>
        
        <div className="priority-queue">
          {pendingApprovals.map(notification => (
            <div 
              key={value(notification.sys_id)} 
              className={`priority-item priority-item--${display(notification.severity)}`}
            >
              <div className="priority-item__header">
                <label className="bulk-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedNotifications.has(value(notification.sys_id))}
                    onChange={() => toggleSelection(value(notification.sys_id))}
                  />
                </label>
                
                <div className="priority-item__content">
                  <h4 className="priority-item__title">{display(notification.title)}</h4>
                  {display(notification.subject) && (
                    <p className="priority-item__subject">{display(notification.subject)}</p>
                  )}
                  <div className="priority-item__meta">
                    <span>Created: {formatDateTime(notification.sys_created_on)}</span>
                    <span>By: {display(notification.created_by)}</span>
                    <span>Type: {display(notification.notification_type)}</span>
                    <span className={`severity-indicator__icon severity-indicator__icon--${display(notification.severity)}`}></span>
                    <span>{display(notification.severity).toUpperCase()}</span>
                  </div>
                </div>
              </div>
              
              <div className="priority-item__message">
                {display(notification.message).substring(0, 150)}
                {display(notification.message).length > 150 ? '...' : ''}
              </div>

              <div className="priority-item__actions">
                <button 
                  className="btn btn--primary action-btn--small"
                  onClick={() => handleApprove(value(notification.sys_id))}
                  disabled={actionLoading === `approve-${value(notification.sys_id)}`}
                >
                  {actionLoading === `approve-${value(notification.sys_id)}` ? (
                    <>
                      <span className="loading-spinner"></span>
                      Approving...
                    </>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                      </svg>
                      Approve
                    </>
                  )}
                </button>
                
                <button 
                  className="btn btn--danger action-btn--small"
                  onClick={() => handleReject(notification)}
                >
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                  </svg>
                  Reject
                </button>
                
                <button 
                  className="btn btn--secondary action-btn--small"
                  onClick={() => window.open(`/x_snc_crisis_notif_management.do#detail/${value(notification.sys_id)}`, '_blank')}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reject Modal */}
      {showRejectModal && rejectingNotification && (
        <div className="modal-overlay" onClick={() => setShowRejectModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h3>Reject Notification</h3>
              <button 
                className="modal__close"
                onClick={() => setShowRejectModal(false)}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="modal__body">
              <p>
                <strong>Rejecting:</strong> {display(rejectingNotification.title)}
              </p>
              <div className="form-field">
                <label className="form-field__label">Reason for rejection *</label>
                <textarea
                  className="form-field__textarea"
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Please provide a reason for rejecting this notification..."
                  rows="4"
                />
              </div>
            </div>
            <div className="modal__footer">
              <button 
                className="btn btn--secondary"
                onClick={() => setShowRejectModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn--danger"
                onClick={handleRejectConfirm}
                disabled={!rejectReason.trim() || actionLoading.includes('reject')}
              >
                {actionLoading.includes('reject') ? (
                  <>
                    <span className="loading-spinner"></span>
                    Rejecting...
                  </>
                ) : (
                  'Confirm Rejection'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}