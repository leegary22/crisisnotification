import React, { useState, useEffect, useMemo } from 'react';
import { NotificationDashboardService } from '../services/NotificationDashboardService.js';
import DashboardOverview from './DashboardOverview.jsx';
import DashboardNotifications from './DashboardNotifications.jsx';
import DashboardAnalytics from './DashboardAnalytics.jsx';
import DashboardSystem from './DashboardSystem.jsx';
import './NotificationDashboard.css';

export default function NotificationDashboard() {
  const service = useMemo(() => new NotificationDashboardService(), []);
  const [currentView, setCurrentView] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [dashboardData, setDashboardData] = useState({
    overviewStats: null,
    pendingApprovals: [],
    recentNotifications: [],
    systemHealth: null
  });

  useEffect(() => {
    loadDashboardData();
  }, [refreshTrigger]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [overviewStats, pendingApprovals, recentNotifications, systemHealth] = await Promise.all([
        service.getOverviewStats(30),
        service.getPendingApprovals(),
        service.getRecentNotifications(20),
        service.getSystemHealth()
      ]);

      setDashboardData({
        overviewStats,
        pendingApprovals,
        recentNotifications,
        systemHealth
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleActionComplete = () => {
    // Refresh data after actions like approve/send
    handleRefresh();
  };

  const renderNavigation = () => (
    <nav className="dashboard-nav">
      <button 
        className={`dashboard-nav__button ${currentView === 'overview' ? 'dashboard-nav__button--active' : ''}`}
        onClick={() => setCurrentView('overview')}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
        </svg>
        Overview
      </button>
      
      <button 
        className={`dashboard-nav__button ${currentView === 'notifications' ? 'dashboard-nav__button--active' : ''}`}
        onClick={() => setCurrentView('notifications')}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
        </svg>
        Notifications
        {dashboardData.pendingApprovals.length > 0 && (
          <span className="dashboard-nav__badge">
            {dashboardData.pendingApprovals.length}
          </span>
        )}
      </button>

      <button 
        className={`dashboard-nav__button ${currentView === 'analytics' ? 'dashboard-nav__button--active' : ''}`}
        onClick={() => setCurrentView('analytics')}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M1.5 14.5a.5.5 0 0 0 .5.5h4a.5.5 0 1 0 0-1H2.707l3.347-3.346a.5.5 0 0 0-.708-.708L2 13.293V10.5a.5.5 0 0 0-1 0v4zm7.646-9.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708-.708L10.293 7 9.146 5.854a.5.5 0 0 1 0-.708z"/>
          <path d="M6 2a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 6 2zm2.5 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H9a.5.5 0 0 1-.5-.5z"/>
          <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm13 2v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1z"/>
        </svg>
        Analytics
      </button>

      <button 
        className={`dashboard-nav__button ${currentView === 'system' ? 'dashboard-nav__button--active' : ''}`}
        onClick={() => setCurrentView('system')}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
        </svg>
        System
        {dashboardData.systemHealth && dashboardData.systemHealth.systemStatus !== 'healthy' && (
          <span className="dashboard-nav__alert-dot"></span>
        )}
      </button>
    </nav>
  );

  const renderView = () => {
    if (isLoading && !dashboardData.overviewStats) {
      return (
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      );
    }

    switch (currentView) {
      case 'notifications':
        return (
          <DashboardNotifications
            service={service}
            pendingApprovals={dashboardData.pendingApprovals}
            recentNotifications={dashboardData.recentNotifications}
            onActionComplete={handleActionComplete}
            isLoading={isLoading}
          />
        );
      case 'analytics':
        return (
          <DashboardAnalytics
            overviewStats={dashboardData.overviewStats}
            isLoading={isLoading}
          />
        );
      case 'system':
        return (
          <DashboardSystem
            systemHealth={dashboardData.systemHealth}
            onRefresh={handleRefresh}
            isLoading={isLoading}
          />
        );
      case 'overview':
      default:
        return (
          <DashboardOverview
            service={service}
            overviewStats={dashboardData.overviewStats}
            pendingApprovals={dashboardData.pendingApprovals}
            systemHealth={dashboardData.systemHealth}
            onActionComplete={handleActionComplete}
            onViewChange={setCurrentView}
            isLoading={isLoading}
          />
        );
    }
  };

  return (
    <div className="notification-dashboard">
      <header className="notification-dashboard__header">
        <div className="notification-dashboard__header-content">
          <div className="notification-dashboard__title-section">
            <h1 className="notification-dashboard__title">
              <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
              </svg>
              Notification Dashboard
            </h1>
            <p className="notification-dashboard__subtitle">
              Crisis notification oversight, analytics, and management
            </p>
          </div>
          
          <div className="notification-dashboard__actions">
            <button 
              className="btn btn--secondary"
              onClick={handleRefresh}
              disabled={isLoading}
              title="Refresh dashboard data"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
              </svg>
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </button>

            <a 
              href="/x_snc_crisis_notif_teams_setup.do"
              className="btn btn--secondary"
              title="Configure Teams integration"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
              </svg>
              Setup
            </a>

            <a 
              href="/x_snc_crisis_notif_management.do"
              className="btn btn--primary"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
              Create Notification
            </a>
          </div>
        </div>
      </header>

      <div className="notification-dashboard__content">
        {renderNavigation()}
        <main className="notification-dashboard__main">
          {renderView()}
        </main>
      </div>
    </div>
  );
}