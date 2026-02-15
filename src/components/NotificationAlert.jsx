import React from 'react';
import { useNotification } from '../context/NotificationContext';
import { FiX } from 'react-icons/fi';
import './NotificationAlert.css';

const NotificationAlert = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="notification-alerts">
      {notifications.map((notification) => (
        <div 
          key={notification.id} 
          className={`alert alert-${notification.type}`}
        >
          <span>{notification.message}</span>
          <button onClick={() => removeNotification(notification.id)}>
            <FiX />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationAlert;