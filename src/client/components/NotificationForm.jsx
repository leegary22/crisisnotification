import React, { useState, useEffect } from 'react';
import { display, value } from '../utils/fields.js';
import './NotificationForm.css';

export default function NotificationForm({ service, notification, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    message: '',
    severity: 'medium',
    notification_type: 'general',
    target_audience: 'all_users',
    send_to_teams: true,
    send_to_email: false,
    send_to_sms: false,
    teams_channel_id: '',
    scheduled_send_time: '',
    expires_on: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [templates, setTemplates] = useState([]);

  // Initialize form data when editing
  useEffect(() => {
    if (notification) {
      setFormData({
        title: display(notification.title) || '',
        subject: display(notification.subject) || '',
        message: display(notification.message) || '',
        severity: display(notification.severity) || 'medium',
        notification_type: display(notification.notification_type) || 'general',
        target_audience: display(notification.target_audience) || 'all_users',
        send_to_teams: display(notification.send_to_teams) === 'true',
        send_to_email: display(notification.send_to_email) === 'true',
        send_to_sms: display(notification.send_to_sms) === 'true',
        teams_channel_id: display(notification.teams_channel_id) || '',
        scheduled_send_time: display(notification.scheduled_send_time) || '',
        expires_on: display(notification.expires_on) || ''
      });
    }
  }, [notification]);

  // Load templates
  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const templatesData = await service.getTemplates();
      setTemplates(templatesData);
    } catch (error) {
      console.error('Failed to load templates:', error);
    }
  };

  const handleChange = (field, newValue) => {
    setFormData(prev => ({
      ...prev,
      [field]: newValue
    }));

    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleTemplateSelect = (templateId) => {
    const template = templates.find(t => value(t.sys_id) === templateId);
    if (template) {
      setFormData(prev => ({
        ...prev,
        title: display(template.title_template) || prev.title,
        subject: display(template.subject_template) || prev.subject,
        message: display(template.message_template) || prev.message,
        severity: display(template.default_severity) || prev.severity,
        notification_type: display(template.template_type) || prev.notification_type
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (formData.send_to_teams && !formData.teams_channel_id.trim()) {
      newErrors.teams_channel_id = 'Teams Channel ID is required when sending to Teams';
    }

    if (formData.scheduled_send_time) {
      const scheduledDate = new Date(formData.scheduled_send_time);
      if (scheduledDate <= new Date()) {
        newErrors.scheduled_send_time = 'Scheduled time must be in the future';
      }
    }

    if (formData.expires_on) {
      const expiryDate = new Date(formData.expires_on);
      const scheduledDate = formData.scheduled_send_time ? new Date(formData.scheduled_send_time) : new Date();
      
      if (expiryDate <= scheduledDate) {
        newErrors.expires_on = 'Expiry date must be after the send time';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const submissionData = {
        ...formData,
        send_to_teams: formData.send_to_teams.toString(),
        send_to_email: formData.send_to_email.toString(),
        send_to_sms: formData.send_to_sms.toString()
      };

      if (notification) {
        // Update existing notification
        await service.updateNotification(value(notification.sys_id), submissionData);
      } else {
        // Create new notification
        await service.createNotification(submissionData);
      }

      onSave();
    } catch (error) {
      console.error('Failed to save notification:', error);
      setErrors({
        general: error.message || 'Failed to save notification'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isEditing = !!notification;

  return (
    <div className="notification-form">
      <form onSubmit={handleSubmit} className="notification-form__form card">
        <div className="card__header">
          <h2>{isEditing ? 'Edit' : 'Create'} Crisis Notification</h2>
        </div>

        <div className="card__body">
          {errors.general && (
            <div className="notification-form__error">
              {errors.general}
            </div>
          )}

          {!isEditing && templates.length > 0 && (
            <div className="form-field">
              <label className="form-field__label">Use Template (Optional)</label>
              <select 
                className="form-field__select"
                onChange={(e) => e.target.value && handleTemplateSelect(e.target.value)}
                defaultValue=""
              >
                <option value="">Select a template...</option>
                {templates.map(template => (
                  <option key={value(template.sys_id)} value={value(template.sys_id)}>
                    {display(template.name)} ({display(template.template_type)})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="notification-form__grid">
            <div className="form-field">
              <label className="form-field__label">Title *</label>
              <input
                type="text"
                className="form-field__input"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Enter notification title..."
              />
              {errors.title && <div className="form-field__error">{errors.title}</div>}
            </div>

            <div className="form-field">
              <label className="form-field__label">Subject *</label>
              <input
                type="text"
                className="form-field__input"
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                placeholder="Enter notification subject..."
              />
              {errors.subject && <div className="form-field__error">{errors.subject}</div>}
            </div>
          </div>

          <div className="form-field">
            <label className="form-field__label">Message *</label>
            <textarea
              className="form-field__textarea"
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              placeholder="Enter your crisis notification message..."
              rows="6"
            />
            {errors.message && <div className="form-field__error">{errors.message}</div>}
          </div>

          <div className="notification-form__grid">
            <div className="form-field">
              <label className="form-field__label">Severity *</label>
              <select
                className="form-field__select"
                value={formData.severity}
                onChange={(e) => handleChange('severity', e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div className="form-field">
              <label className="form-field__label">Type *</label>
              <select
                className="form-field__select"
                value={formData.notification_type}
                onChange={(e) => handleChange('notification_type', e.target.value)}
              >
                <option value="emergency">Emergency Alert</option>
                <option value="maintenance">Maintenance Notice</option>
                <option value="security">Security Alert</option>
                <option value="weather">Weather Alert</option>
                <option value="general">General Announcement</option>
              </select>
            </div>

            <div className="form-field">
              <label className="form-field__label">Target Audience *</label>
              <select
                className="form-field__select"
                value={formData.target_audience}
                onChange={(e) => handleChange('target_audience', e.target.value)}
              >
                <option value="all_users">All Users</option>
                <option value="employees_only">Employees Only</option>
                <option value="contractors_only">Contractors Only</option>
                <option value="specific_groups">Specific Groups</option>
                <option value="specific_users">Specific Users</option>
              </select>
            </div>
          </div>

          <div className="notification-form__section">
            <h3>Delivery Channels</h3>
            <div className="notification-form__checkboxes">
              <label className="form-field__checkbox">
                <input
                  type="checkbox"
                  checked={formData.send_to_teams}
                  onChange={(e) => handleChange('send_to_teams', e.target.checked)}
                />
                <span className="form-field__checkbox-label">Send to MS Teams</span>
              </label>

              <label className="form-field__checkbox">
                <input
                  type="checkbox"
                  checked={formData.send_to_email}
                  onChange={(e) => handleChange('send_to_email', e.target.checked)}
                />
                <span className="form-field__checkbox-label">Send to Email</span>
              </label>

              <label className="form-field__checkbox">
                <input
                  type="checkbox"
                  checked={formData.send_to_sms}
                  onChange={(e) => handleChange('send_to_sms', e.target.checked)}
                />
                <span className="form-field__checkbox-label">Send to SMS</span>
              </label>
            </div>
          </div>

          {formData.send_to_teams && (
            <div className="form-field">
              <label className="form-field__label">Teams Channel ID</label>
              <input
                type="text"
                className="form-field__input"
                value={formData.teams_channel_id}
                onChange={(e) => handleChange('teams_channel_id', e.target.value)}
                placeholder="Enter Teams Channel ID..."
              />
              {errors.teams_channel_id && <div className="form-field__error">{errors.teams_channel_id}</div>}
            </div>
          )}

          <div className="notification-form__grid">
            <div className="form-field">
              <label className="form-field__label">Scheduled Send Time</label>
              <input
                type="datetime-local"
                className="form-field__input"
                value={formData.scheduled_send_time}
                onChange={(e) => handleChange('scheduled_send_time', e.target.value)}
              />
              {errors.scheduled_send_time && <div className="form-field__error">{errors.scheduled_send_time}</div>}
            </div>

            <div className="form-field">
              <label className="form-field__label">Expires On</label>
              <input
                type="datetime-local"
                className="form-field__input"
                value={formData.expires_on}
                onChange={(e) => handleChange('expires_on', e.target.value)}
              />
              {errors.expires_on && <div className="form-field__error">{errors.expires_on}</div>}
            </div>
          </div>
        </div>

        <div className="card__footer">
          <button
            type="button"
            className="btn btn--secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn--primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                {isEditing ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              isEditing ? 'Update Notification' : 'Create Notification'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}