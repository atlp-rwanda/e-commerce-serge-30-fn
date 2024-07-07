import { INotification } from '../../../types';
import NotificationItem from './NotificationItem';

interface NotificationListProps {
  notifications: INotification[];
  onNotificationClick: (id: string) => void;
  loadingNotifications: string[];
  expandedNotificationId: string | null;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onNotificationClick,
  loadingNotifications,
  expandedNotificationId,
}) => {
  return (
    <div className="divide-y divide-gray-200">
      {notifications.slice(0, 5).map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClick={() => onNotificationClick(notification.id)}
          isLoading={loadingNotifications.includes(notification.id)}
          isExpanded={expandedNotificationId === notification.id}
        />
      ))}
    </div>
  );
};

export default NotificationList;
