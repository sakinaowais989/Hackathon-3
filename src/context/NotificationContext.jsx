import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showSuccess = (message) => {
    toast.success(message);
    addNotification(message, 'success');
  };

  const showError = (message) => {
    toast.error(message);
    addNotification(message, 'error');
  };

  const showInfo = (message) => {
    toast(message);
    addNotification(message, 'info');
  };

  const addNotification = (message, type) => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [newNotification, ...prev].slice(0, 10));
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      showSuccess,
      showError,
      showInfo,
      removeNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
};