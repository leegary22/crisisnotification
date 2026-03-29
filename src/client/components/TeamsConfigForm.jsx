import React, { useState, useEffect } from 'react';
import { display, value } from '../utils/fields.js';
import './TeamsConfigForm.css';

export default function TeamsConfigForm({ service, configuration, onSave, isLoading, setIsLoading }) {
  const [formData, setFormData] = useState({
    name: 'Default Teams Configuration',
    tenant_id: '',
    client_id: '',
    client_secret: '',
    webhook_url: '',
    default_channel_id: '',
    api_endpoint: 'https://graph.microsoft.com/v1.0',
    active: true,
    test_mode: false
  });
  
  const [errors, setErrors] = useState({});
  const [showSecrets, setShowSecrets] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Initialize form data when editing
  useEffect(() => {
    if (configuration) {
      setFormData({
        name: display(configuration.name) || 'Default Teams Configuration',
        tenant_id: display(configuration.tenant_id) || '',
        client_id: display(configuration.client_id) || '',
        client_secret: display(configuration.client_secret) || '',
        webhook_url: display(configuration.webhook_url) || '',
        default_channel_id: display(configuration.default_channel_id) || '',
        api_endpoint: display(configuration.api_endpoint) || 'https://graph.microsoft.com/v1.0',
        active: display(configuration.active) === 'true',
        test_mode: display(configuration.test_mode) === 'true'
      });
    }
  }, [configuration]);

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

    // Clear save success when form is modified
    if (saveSuccess) {
      setSaveSuccess(false);
    }
  };

  const validateForm = () => {
    const validation = service.validateConfiguration(formData);
    setErrors(validation.errors);
    return validation.isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setSaveSuccess(false);

    try {
      const submissionData = {
        ...formData,
        active: formData.active.toString(),
        test_mode: formData.test_mode.toString()
      };

      let result;
      if (configuration) {
        // Update existing configuration
        result = await service.updateConfiguration(value(configuration.sys_id), submissionData);
      } else {
        // Deactivate all existing configs first when creating new one
        submissionData.active = 'true';
        result = await service.createConfiguration(submissionData);
      }

      onSave(result);
      setSaveSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to save Teams configuration:', error);
      setErrors({
        general: error.message || 'Failed to save configuration'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isEditing = !!configuration;

  return (
    <div className="teams-config-form">
      <div className="teams-config-form__header">
        <h2>
          {isEditing ? 'Edit Teams Configuration' : 'Create Teams Configuration'}
        </h2>
        <p>Configure the Microsoft Teams integration settings for crisis notifications.</p>
      </div>

      <form onSubmit={handleSubmit} className="teams-config-form__form">
        {errors.general && (
          <div className="setup-message setup-message--error">
            <strong>Error:</strong> {errors.general}
          </div>
        )}

        {saveSuccess && (
          <div className="setup-message setup-message--success">
            <strong>Success:</strong> Teams configuration saved successfully!
          </div>
        )}

        {/* Basic Information Section */}
        <div className="setup-section">
          <div className="setup-section__header">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" className="setup-section__icon">
              <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zM8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            <div>
              <h3 className="setup-section__title">Basic Information</h3>
              <p className="setup-section__description">
                Provide a name and description for this configuration.
              </p>
            </div>
          </div>

          <div className="form-field">
            <label className="form-field__label">Configuration Name *</label>
            <input
              type="text"
              className="form-field__input"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g., Production Teams Config"
            />
            {errors.name && <div className="form-field__error">{errors.name}</div>}
          </div>
        </div>

        {/* Azure AD Application Section */}
        <div className="setup-section">
          <div className="setup-section__header">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" className="setup-section__icon">
              <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
            </svg>
            <div>
              <h3 className="setup-section__title">Azure AD Application Details</h3>
              <p className="setup-section__description">
                Enter the details from your Azure AD application registration.
              </p>
            </div>
          </div>

          <div className="teams-config-form__grid">
            <div className="form-field">
              <label className="form-field__label">Tenant ID *</label>
              <input
                type="text"
                className="form-field__input"
                value={formData.tenant_id}
                onChange={(e) => handleChange('tenant_id', e.target.value)}
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              />
              {errors.tenant_id && <div className="form-field__error">{errors.tenant_id}</div>}
              <div className="form-field__help">
                Found in Azure Portal → Azure AD → Overview → Directory (tenant) ID
              </div>
            </div>

            <div className="form-field">
              <label className="form-field__label">Client ID *</label>
              <input
                type="text"
                className="form-field__input"
                value={formData.client_id}
                onChange={(e) => handleChange('client_id', e.target.value)}
                placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              />
              {errors.client_id && <div className="form-field__error">{errors.client_id}</div>}
              <div className="form-field__help">
                Found in your app registration → Overview → Application (client) ID
              </div>
            </div>
          </div>

          <div className="form-field">
            <label className="form-field__label">Client Secret *</label>
            <div className="secret-input-wrapper">
              <input
                type={showSecrets ? "text" : "password"}
                className="form-field__input"
                value={formData.client_secret}
                onChange={(e) => handleChange('client_secret', e.target.value)}
                placeholder="Enter your client secret..."
              />
              <button
                type="button"
                className="secret-toggle-btn"
                onClick={() => setShowSecrets(!showSecrets)}
                title={showSecrets ? "Hide secret" : "Show secret"}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  {showSecrets ? (
                    <path d="M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                  ) : (
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                  )}
                </svg>
              </button>
            </div>
            {errors.client_secret && <div className="form-field__error">{errors.client_secret}</div>}
            <div className="form-field__help">
              Generated in your app registration → Certificates $[AMP] secrets → Client secrets
            </div>
          </div>
        </div>

        {/* Teams Integration Section */}
        <div className="setup-section">
          <div className="setup-section__header">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" className="setup-section__icon">
              <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zM8 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
            </svg>
            <div>
              <h3 className="setup-section__title">Teams Integration Settings</h3>
              <p className="setup-section__description">
                Configure how notifications are delivered through Microsoft Teams.
              </p>
            </div>
          </div>

          <div className="teams-config-form__grid">
            <div className="form-field">
              <label className="form-field__label">API Endpoint</label>
              <input
                type="url"
                className="form-field__input"
                value={formData.api_endpoint}
                onChange={(e) => handleChange('api_endpoint', e.target.value)}
                placeholder="https://graph.microsoft.com/v1.0"
              />
              {errors.api_endpoint && <div className="form-field__error">{errors.api_endpoint}</div>}
              <div className="form-field__help">
                Microsoft Graph API endpoint (usually default is correct)
              </div>
            </div>

            <div className="form-field">
              <label className="form-field__label">Default Teams Channel ID</label>
              <input
                type="text"
                className="form-field__input"
                value={formData.default_channel_id}
                onChange={(e) => handleChange('default_channel_id', e.target.value)}
                placeholder="19:xxxxxxxxxxxxxxxxxxxxxx@thread.tacv2"
              />
              {errors.default_channel_id && <div className="form-field__error">{errors.default_channel_id}</div>}
              <div className="form-field__help">
                Optional: Default channel for sending notifications when none is specified
              </div>
            </div>
          </div>

          <div className="form-field">
            <label className="form-field__label">Webhook URL (Optional)</label>
            <input
              type="url"
              className="form-field__input"
              value={formData.webhook_url}
              onChange={(e) => handleChange('webhook_url', e.target.value)}
              placeholder="https://your-instance.service-now.com/api/webhook/teams"
            />
            {errors.webhook_url && <div className="form-field__error">{errors.webhook_url}</div>}
            <div className="form-field__help">
              Optional: Webhook URL for receiving Teams events and responses
            </div>
          </div>
        </div>

        {/* Configuration Options Section */}
        <div className="setup-section">
          <div className="setup-section__header">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" className="setup-section__icon">
              <path d="M7 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zM2 1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zM0 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1zM0 10.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1zM0 13.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1zM8 7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V7zm1 0h6v3H9V7z"/>
            </svg>
            <div>
              <h3 className="setup-section__title">Configuration Options</h3>
              <p className="setup-section__description">
                Configure additional settings and behavior options.
              </p>
            </div>
          </div>

          <div className="teams-config-form__checkboxes">
            <label className="form-field__checkbox">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => handleChange('active', e.target.checked)}
              />
              <span className="form-field__checkbox-label">
                <strong>Active Configuration</strong>
                <span className="checkbox-description">
                  Make this the active Teams configuration for the system
                </span>
              </span>
            </label>

            <label className="form-field__checkbox">
              <input
                type="checkbox"
                checked={formData.test_mode}
                onChange={(e) => handleChange('test_mode', e.target.checked)}
              />
              <span className="form-field__checkbox-label">
                <strong>Test Mode</strong>
                <span className="checkbox-description">
                  Enable test mode for debugging and development
                </span>
              </span>
            </label>
          </div>
        </div>

        {/* Security Notice */}
        <div className="setup-message setup-message--warning">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
          <div>
            <strong>Security Notice:</strong> Client secrets and tokens are stored securely in the ServiceNow database. 
            Ensure your Azure AD application has the minimum required permissions and follows your organization's security policies.
          </div>
        </div>

        {/* Actions */}
        <div className="teams-config-form__actions">
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
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                  <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
                </svg>
                {isEditing ? 'Update Configuration' : 'Save Configuration'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}