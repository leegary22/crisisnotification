import React from 'react';
import { display } from '../utils/fields.js';
import './ConnectionStatus.css';

export default function ConnectionStatus({ configuration, connectionStatus, isLoading, onTestConnection }) {
  const formatConfigValue = (value, isSecret = false) => {
    if (!value) return <em>Not configured</em>;
    if (isSecret) return '••••••••••••••••';
    return value;
  };

  const renderConnectionResult = () => {
    if (!connectionStatus) return null;

    return (
      <div className={`setup-message ${connectionStatus.success ? 'setup-message--success' : 'setup-message--error'}`}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          {connectionStatus.success ? (
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
          ) : (
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
          )}
        </svg>
        <div>
          <div className="connection-status__result-title">
            {connectionStatus.success ? 'Connection Successful' : 'Connection Failed'}
          </div>
          <div className="connection-status__result-message">
            {connectionStatus.message}
          </div>
          {connectionStatus.userPrincipalName && (
            <div className="connection-status__result-detail">
              Connected as: <strong>{connectionStatus.userPrincipalName}</strong>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (!configuration) {
    return (
      <div className="connection-status">
        <div className="connection-status__empty">
          <svg width="48" height="48" viewBox="0 0 16 16" fill="currentColor" opacity="0.5">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
          <h3>No Configuration Found</h3>
          <p>Please create a Teams configuration first before testing the connection.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="connection-status">
      <div className="connection-status__header">
        <h2>Test Teams Connection</h2>
        <p>Verify that your Microsoft Teams configuration is working correctly.</p>
      </div>

      <div className="connection-status__config-summary">
        <h3>Current Configuration</h3>
        <div className="config-summary-grid">
          <div className="config-item">
            <dt>Configuration Name</dt>
            <dd>{display(configuration.name)}</dd>
          </div>
          <div className="config-item">
            <dt>Status</dt>
            <dd>
              <span className={`connection-indicator ${display(configuration.active) === 'true' ? 'connection-indicator--success' : 'connection-indicator--error'}`}>
                <span className="connection-indicator__icon">●</span>
                {display(configuration.active) === 'true' ? 'Active' : 'Inactive'}
              </span>
            </dd>
          </div>
          <div className="config-item">
            <dt>Tenant ID</dt>
            <dd className="config-value">{formatConfigValue(display(configuration.tenant_id))}</dd>
          </div>
          <div className="config-item">
            <dt>Client ID</dt>
            <dd className="config-value">{formatConfigValue(display(configuration.client_id))}</dd>
          </div>
          <div className="config-item">
            <dt>Client Secret</dt>
            <dd className="config-value">{formatConfigValue(display(configuration.client_secret), true)}</dd>
          </div>
          <div className="config-item">
            <dt>API Endpoint</dt>
            <dd className="config-value">{formatConfigValue(display(configuration.api_endpoint))}</dd>
          </div>
          <div className="config-item">
            <dt>Default Channel</dt>
            <dd className="config-value">{formatConfigValue(display(configuration.default_channel_id))}</dd>
          </div>
          <div className="config-item">
            <dt>Test Mode</dt>
            <dd>
              <span className={`connection-indicator ${display(configuration.test_mode) === 'true' ? 'connection-indicator--testing' : 'connection-indicator--success'}`}>
                <span className="connection-indicator__icon">●</span>
                {display(configuration.test_mode) === 'true' ? 'Enabled' : 'Disabled'}
              </span>
            </dd>
          </div>
        </div>
      </div>

      <div className="connection-status__test-section">
        <div className="connection-status__test-header">
          <h3>Connection Test</h3>
          <p>This test will attempt to authenticate with Microsoft Graph API and verify connectivity.</p>
        </div>

        {renderConnectionResult()}

        <div className="connection-status__test-actions">
          <button
            className="btn btn--primary connection-test-btn"
            onClick={onTestConnection}
            disabled={isLoading || display(configuration.active) !== 'true'}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span>
                Testing Connection...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
                Test Connection
              </>
            )}
          </button>

          {display(configuration.active) !== 'true' && (
            <div className="connection-status__inactive-warning">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
              Configuration is inactive. Activate it in the Configuration tab to test the connection.
            </div>
          )}
        </div>
      </div>

      <div className="connection-status__help">
        <h4>What does this test verify?</h4>
        <ul>
          <li>Authentication with Microsoft Graph API using your credentials</li>
          <li>Token generation and validation</li>
          <li>API endpoint accessibility</li>
          <li>Required permissions are properly configured</li>
        </ul>
        
        <div className="setup-message setup-message--info">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zM8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
          </svg>
          <div>
            <strong>Note:</strong> The connection test only verifies API connectivity. 
            To test actual message delivery, create a test crisis notification and send it to a specific Teams channel.
          </div>
        </div>
      </div>
    </div>
  );
}