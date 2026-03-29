import React, { useState, useEffect, useMemo } from 'react';
import { CrisisNotificationService } from './services/CrisisNotificationService.js';
import NotificationList from './components/NotificationList.jsx';
import NotificationForm from './components/NotificationForm.jsx';
import NotificationDetail from './components/NotificationDetail.jsx';
import Header from './components/Header.jsx';
import './app.css';

export default function App() {
  const service = useMemo(() => new CrisisNotificationService(), []);
  const [currentView, setCurrentView] = useState('list');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({});

  // Handle hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || 'list';
      const [view, id] = hash.split('/');
      setCurrentView(view);
      if (id && view === 'detail') {
        loadNotification(id);
      } else if (view === 'list') {
        setSelectedNotification(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial load
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Load notifications
  useEffect(() => {
    if (currentView === 'list') {
      loadNotifications();
    }
  }, [currentView, filters]);

  const navigate = (view, id = null) => {
    window.location.hash = id ? `${view}/${id}` : view;
  };

  const loadNotifications = async () => {
    setIsLoading(true);
    try {
      const data = await service.getNotifications(filters);
      setNotifications(data);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadNotification = async (sysId) => {
    setIsLoading(true);
    try {
      const data = await service.getNotification(sysId);
      setSelectedNotification(data);
    } catch (error) {
      console.error('Failed to load notification:', error);
      navigate('list');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationSaved = () => {
    loadNotifications();
    navigate('list');
  };

  const handleNotificationSelect = (notification) => {
    navigate('detail', notification.sys_id.value);
  };

  const handleNotificationEdit = (notification) => {
    setSelectedNotification(notification);
    navigate('edit');
  };

  const renderView = () => {
    switch (currentView) {
      case 'create':
        return (
          <NotificationForm 
            service={service}
            onSave={handleNotificationSaved}
            onCancel={() => navigate('list')}
          />
        );
      case 'edit':
        return (
          <NotificationForm 
            service={service}
            notification={selectedNotification}
            onSave={handleNotificationSaved}
            onCancel={() => navigate('list')}
          />
        );
      case 'detail':
        return selectedNotification ? (
          <NotificationDetail 
            service={service}
            notification={selectedNotification}
            onEdit={handleNotificationEdit}
            onBack={() => navigate('list')}
            onRefresh={() => loadNotification(selectedNotification.sys_id.value)}
          />
        ) : null;
      case 'list':
      default:
        return (
          <NotificationList 
            service={service}
            notifications={notifications}
            isLoading={isLoading}
            filters={filters}
            onFiltersChange={setFilters}
            onNotificationSelect={handleNotificationSelect}
            onRefresh={loadNotifications}
          />
        );
    }
  };

  return (
    <div className="crisis-app">
      <Header 
        currentView={currentView} 
        onNavigate={navigate}
        onRefresh={currentView === 'list' ? loadNotifications : null}
      />
      <main className="crisis-app__content">
        {renderView()}
      </main>
    </div>
  );
}