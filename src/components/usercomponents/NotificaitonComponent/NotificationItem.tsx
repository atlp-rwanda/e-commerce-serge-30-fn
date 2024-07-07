import { FaBell } from 'react-icons/fa';
import { INotification } from '../../../types';

interface NotificationItemProps {
  notification: INotification;
  onClick: () => void;
  isLoading: boolean;
  isExpanded: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onClick,
  isLoading,
  isExpanded,
}) => {
  return (
    <div
      className={`py-3 flex items-start hover:bg-gray-100 transition duration-300 cursor-pointer`}
      onClick={onClick}
    >
      <div className="mr-3">
        <FaBell />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-baseline">
          <section className="flex-1">
            {isLoading ? (
              <div className="space-y-1 animate-pulse">
                <div className="h-4 bg-gray-400 rounded w-3/4" />
                <div className="h-4 bg-gray-400 rounded w-1/2" />
              </div>
            ) : (
              <>
                <p
                  className={`text-sm ${!notification.isRead ? 'font-semibold' : 'text-gray-600'} ${isExpanded ? 'whitespace-normal' : 'line-clamp-1'}`}
                >
                  {notification.message}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(notification.createdAt).toLocaleDateString()}
                </p>
              </>
            )}
          </section>
          {!notification.isRead && (
            <span className="inline-block mt-1 px-2 py-1 bg-green-500 text-white text-xs rounded-md">
              Unread
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
