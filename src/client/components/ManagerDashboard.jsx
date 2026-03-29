import React, { useState, useEffect, useMemo } from 'react';
import { ManagerDashboardService } from '../services/ManagerDashboardService.js';
import { display, value } from '../utils/fields.js';
import DashboardStats from './DashboardStats.jsx';
import PendingApprovals from './PendingApprovals.jsx';
import ActiveNotifications from './ActiveNotifications.jsx';
import SystemHealth from './SystemHealth.jsx';
import './ManagerDashboard.css';

export default function ManagerDashboard() {
  const service = useMemo(() => new ManagerDashboardService(), []);
  const [currentView, setCurrentView] = useState('overview');
  const [dashboardData, setDashboardData] = useState({
    stats: null,
    pendingApprovals: [],
    activeNotifications: [],
    systemHealth: null
  });
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    loadDashboardData();
  }, [refreshKey]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [stats, pendingApprovals, activeNotifications, systemHealth] = await Promise.all([
        service.getDashboardStats(30),
        service.getPendingApprovals(),
        service.getActiveNotifications(),
        service.getSystemHealth()
      ]);

      setDashboardData({
        stats,
        pendingApprovals,
        activeNotifications,
        systemHealth
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleApprovalAction = () => {
    // Refresh data after approval actions
    handleRefresh();
  };

  const handleBackToMain = () => {
    window.location.href = '/x_snc_crisis_notif_management.do';
  };

  const renderNavigation = () => (
    <nav className="dashboard-nav">
      <button 
        className={`nav-button ${currentView === 'overview' ? 'nav-button--active' : ''}`}
        onClick={() => setCurrentView('overview')}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
          <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
        </svg>
        Overview
      </button>
      
      <button 
        className={`nav-button ${currentView === 'approvals' ? 'nav-button--active' : ''}`}
        onClick={() => setCurrentView('approvals')}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
        </svg>
        Approvals
        {dashboardData.pendingApprovals.length > 0 && (
          <span className="nav-button__badge">
            {dashboardData.pendingApprovals.length}
          </span>
        )}
      </button>

      <button 
        className={`nav-button ${currentView === 'active' ? 'nav-button--active' : ''}`}
        onClick={() => setCurrentView('active')}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M15.854.146a.5.5 0 0 1 .11.54L13.026 8.2a.5.5 0 0 1-.708.292L8.5 6.846 2.146 13.2a.5.5 0 0 1-.708-.708L7.793 6.5 6.346 2.682a.5.5 0 0 1 .292-.708L13.854.036a.5.5 0 0 1 .11.11z"/>
        </svg>
        Active
      </button>

      <button 
        className={`nav-button ${currentView === 'system' ? 'nav-button--active' : ''}`}
        onClick={() => setCurrentView('system')}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zM8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
        </svg>
        System Health
      </button>
    </nav>
  );

  const renderView = () => {
    if (isLoading && !dashboardData.stats) {
      return (
        <div className="dashboard-loading">
          <div className="loading-spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      );
    }

    switch (currentView) {
      case 'approvals':
        return (
          <PendingApprovals 
            service={service}
            pendingApprovals={dashboardData.pendingApprovals}
            onApprovalAction={handleApprovalAction}
            isLoading={isLoading}
          />
        );
      case 'active':
        return (
          <ActiveNotifications 
            service={service}
            activeNotifications={dashboardData.activeNotifications}
            onRefresh={handleRefresh}
            isLoading={isLoading}
          />
        );
      case 'system':
        return (
          <SystemHealth 
            systemHealth={dashboardData.systemHealth}
            onRefresh={handleRefresh}
            isLoading={isLoading}
          />
        );
      case 'overview':
      default:
        return (
          <DashboardStats 
            stats={dashboardData.stats}
            pendingCount={dashboardData.pendingApprovals.length}
            activeCount={dashboardData.activeNotifications.length}
            isLoading={isLoading}
          />
        );
    }
  };

  return (
    <div className="manager-dashboard">
      <header className="manager-dashboard__header">
        <div className="manager-dashboard__header-content">
          <div className="manager-dashboard__title-section">
            <h1 className="manager-dashboard__title">
              <svg width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
              </svg>
              Manager Dashboard
            </h1>
            <p className="manager-dashboard__subtitle">
              Crisis notification oversight, analytics, and system management
            </p>
          </div>
          
          <div className="manager-dashboard__actions">
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

            <button 
              className="btn btn--secondary"
              onClick={handleBackToMain}
            >
              User Interface
            </button>
          </div>
        </div>
      </header>

      <div className="manager-dashboard__content">
        {renderNavigation()}
        <main className="manager-dashboard__main">
          {renderView()}
        </main>
      </div>
    </div>
  );
}