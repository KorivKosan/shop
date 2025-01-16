import React, { useEffect } from 'react';
import styles from './Notification.module.css';

interface NotificationProps {
  id: string;
  message: string;
  type?: 'success' | 'error';
  onClose: (id: string) => void;
}

const Notification: React.FC<NotificationProps> = ({ 
  id,
  message, 
  type = 'success',
  onClose 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      {message}
    </div>
  );
};

export const NotificationContainer: React.FC<{
  notifications: Array<{
    id: string;
    message: string;
    type: 'success' | 'error';
  }>;
  onClose: (id: string) => void;
}> = ({ notifications, onClose }) => {
  return (
    <div className={styles.container}>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          id={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={onClose}
        />
      ))}
    </div>
  );
};

export default Notification; 