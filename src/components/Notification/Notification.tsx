import React from 'react';
import './Notification.css';

interface NotificationProps {
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="notification">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20,6 9,17 4,12"/>
      </svg>
      {message}
    </div>
  );
};

export default Notification;