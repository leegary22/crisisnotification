import React, { useState, useEffect, useMemo } from 'react';
import { TeamsConfigService } from '../services/TeamsConfigService.js';
import { display, value } from '../utils/fields.js';
import TeamsConfigForm from './TeamsConfigForm.jsx';
import TeamsSetupGuide from './TeamsSetupGuide.jsx';
import ConnectionStatus from './ConnectionStatus.jsx';
import './TeamsSetupApp.css';

export default function TeamsSetupApp() {
  const service = useMemo(() => new TeamsConfigService(), []);
  const [currentView, setCurrentView] = useState('guide');
  const [configuration, setConfiguration] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  useEffect(() => {
    loadConfiguration();
  }, []);

  const loadConfiguration = async () => {
    setIsLoading(true);
    try {
      const config = await service.getActiveConfiguration();
      setConfiguration(config);
      
      // If configuration exists, start with the configure view
      if (config) {
        setCurrentView('configure');
      }
    } catch (error) {
      console.error('Failed to load Teams configuration:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfigurationSaved = (newConfig) => {
    setConfiguration(newConfig);
    setCurrentView('configure');
    // Clear connection status when config changes
    setConnectionStatus(null);
  };

  const handleTestConnection = async () => {
    setIsLoading(true);
    setConnectionStatus(null);
    
    try {
      const result = await service.testConnection();
      setConnectionStatus(result);
    } catch (error) {
      setConnectionStatus({
        success: false,
        message: error.message || 'Connection test failed'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToMain = () => {
    window.location.href = '/x_snc_crisis_notif_management.do';
  };

  const renderNavigation = () => (
    <nav className="teams-setup__nav">
      <button 
        className={`nav-button ${currentView === 'guide' ? 'nav-button--active' : ''}`}
        onClick={() => setCurrentView('guide')}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zM8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
        </svg>
        Setup Guide
      </button>
      
      <button 
        className={`nav-button ${currentView === 'configure' ? 'nav-button--active' : ''}`}
        onClick={() => setCurrentView('configure')}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
        </svg>
        Configuration
      </button>
      
      {configuration && (
        <button 
          className={`nav-button ${currentView === 'test' ? 'nav-button--active' : ''}`}
          onClick={() => setCurrentView('test')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
          </svg>
          Test Connection
        </button>
      )}
    </nav>
  );

  const renderView = () => {
    if (isLoading && !configuration) {
      return (
        <div className="teams-setup__loading">
          <div className="loading-spinner"></div>
          <p>Loading Teams configuration...</p>
        </div>
      );
    }

    switch (currentView) {
      case 'configure':
        return (
          <TeamsConfigForm
            service={service}
            configuration={configuration}
            onSave={handleConfigurationSaved}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        );
      case 'test':
        return (
          <ConnectionStatus
            configuration={configuration}
            connectionStatus={connectionStatus}
            isLoading={isLoading}
            onTestConnection={handleTestConnection}
          />
        );
      case 'guide':
      default:
        return (
          <TeamsSetupGuide
            hasConfiguration={!!configuration}
            onStartConfiguration={() => setCurrentView('configure')}
          />
        );
    }
  };

  return (
    <div className="teams-setup">
      <header className="teams-setup__header">
        <div className="teams-setup__header-content">
          <div className="teams-setup__title-section">
            <h1 className="teams-setup__title">
              <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zM8 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
              </svg>
              MS Teams Integration Setup
            </h1>
            <p className="teams-setup__subtitle">
              Configure Microsoft Teams integration for crisis notifications
            </p>
          </div>
          
          <button 
            className="btn btn--secondary"
            onClick={handleBackToMain}
          >
            ← Back to Management
          </button>
        </div>
      </header>

      <div className="teams-setup__content">
        {renderNavigation()}
        <main className="teams-setup__main">
          {renderView()}
        </main>
      </div>
    </div>
  );
}