import React from 'react';
import './TeamsSetupGuide.css';

export default function TeamsSetupGuide({ hasConfiguration, onStartConfiguration }) {
  return (
    <div className="setup-guide">
      <div className="setup-guide__header">
        <h2>Microsoft Teams Integration Setup Guide</h2>
        <p>Follow these steps to configure Microsoft Teams integration for your crisis notifications.</p>
        
        {hasConfiguration && (
          <div className="setup-message setup-message--info">
            <strong>Configuration Detected:</strong> You already have a Teams configuration. 
            You can modify it using the Configuration tab or create a new one below.
          </div>
        )}
      </div>

      <div className="setup-guide__content">
        <div className="setup-steps">
          <div className="setup-step">
            <div className="setup-step__content">
              <h3 className="setup-step__title">Create an Azure AD Application</h3>
              <div className="setup-step__description">
                <p>First, you need to create an application in Azure Active Directory:</p>
                <ol>
                  <li>Go to the <strong>Azure Portal</strong> and navigate to <strong>Azure Active Directory</strong></li>
                  <li>Click on <strong>App registrations</strong> in the left sidebar</li>
                  <li>Click <strong>New registration</strong></li>
                  <li>Enter a name for your app (e.g., "Crisis Notifications")</li>
                  <li>Select <strong>Accounts in this organizational directory only</strong></li>
                  <li>Leave the Redirect URI blank for now</li>
                  <li>Click <strong>Register</strong></li>
                </ol>
              </div>
            </div>
          </div>

          <div className="setup-step">
            <div className="setup-step__content">
              <h3 className="setup-step__title">Configure API Permissions</h3>
              <div className="setup-step__description">
                <p>Your application needs specific permissions to send Teams messages:</p>
                <ol>
                  <li>In your app registration, click <strong>API permissions</strong></li>
                  <li>Click <strong>Add a permission</strong></li>
                  <li>Select <strong>Microsoft Graph</strong></li>
                  <li>Choose <strong>Application permissions</strong></li>
                  <li>Add these permissions:</li>
                  <ul>
                    <li><code className="setup-code--inline">Chat.Create</code> - Create chats</li>
                    <li><code className="setup-code--inline">ChatMessage.Send</code> - Send messages</li>
                    <li><code className="setup-code--inline">User.Read.All</code> - Read user profiles</li>
                    <li><code className="setup-code--inline">Channel.ReadBasic.All</code> - Read channel info</li>
                  </ul>
                  <li>Click <strong>Grant admin consent</strong> for your organization</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="setup-step">
            <div className="setup-step__content">
              <h3 className="setup-step__title">Create a Client Secret</h3>
              <div className="setup-step__description">
                <p>Generate a secret that will be used for authentication:</p>
                <ol>
                  <li>In your app registration, click <strong>Certificates $[AMP] secrets</strong></li>
                  <li>Under <strong>Client secrets</strong>, click <strong>New client secret</strong></li>
                  <li>Enter a description (e.g., "Crisis Notification Secret")</li>
                  <li>Choose an expiration period (recommend 12-24 months)</li>
                  <li>Click <strong>Add</strong></li>
                  <li><strong>Important:</strong> Copy the secret value immediately - it won't be shown again</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="setup-step">
            <div className="setup-step__content">
              <h3 className="setup-step__title">Gather Required Information</h3>
              <div className="setup-step__description">
                <p>Collect the following information from your Azure AD application:</p>
                <div className="info-grid">
                  <div className="info-item">
                    <h4>Tenant ID</h4>
                    <p>Found in <strong>Overview</strong> → <strong>Directory (tenant) ID</strong></p>
                  </div>
                  <div className="info-item">
                    <h4>Client ID</h4>
                    <p>Found in <strong>Overview</strong> → <strong>Application (client) ID</strong></p>
                  </div>
                  <div className="info-item">
                    <h4>Client Secret</h4>
                    <p>The value you copied from the previous step</p>
                  </div>
                  <div className="info-item">
                    <h4>Teams Channel ID (Optional)</h4>
                    <p>The ID of the Teams channel where notifications will be sent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="setup-step">
            <div className="setup-step__content">
              <h3 className="setup-step__title">Configure ServiceNow Integration</h3>
              <div className="setup-step__description">
                <p>Now you're ready to configure the integration in ServiceNow:</p>
                <ol>
                  <li>Click the <strong>Configuration</strong> tab above</li>
                  <li>Fill in the required information from your Azure AD app</li>
                  <li>Test the connection to ensure everything is working</li>
                  <li>Save the configuration</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="setup-guide__actions">
          <button 
            className="btn btn--primary setup-guide__start-btn"
            onClick={onStartConfiguration}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
              <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
            </svg>
            Start Configuration
          </button>
        </div>
      </div>

      <div className="setup-guide__help">
        <h3>Need Help?</h3>
        <div className="help-links">
          <a 
            href="https://docs.microsoft.com/en-us/graph/api/resources/teams-api-overview" 
            target="_blank" 
            rel="noopener noreferrer"
            className="help-link"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm.312-3.5h2.49c-.062-.89-.291-1.733-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
            </svg>
            Microsoft Teams API Documentation
          </a>
          <a 
            href="https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="help-link"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zM8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg>
            Azure App Registration Guide
          </a>
        </div>
      </div>
    </div>
  );
}