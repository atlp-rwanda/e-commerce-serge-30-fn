// src/components/NotificationFilters.tsx
import Button from './Button'; // Adjust the import path if necessary

interface NotificationFiltersProps {
  filter: 'all' | 'unread' | 'today';
  setFilter: (filter: 'all' | 'unread' | 'today') => void;
}

const NotificationFilters: React.FC<NotificationFiltersProps> = ({
  filter,
  setFilter,
}) => {
  return (
    <div className="mb-2 flex justify-between">
      <Button
        className={`text-sm ${filter === 'all' ? 'font-semibold' : 'text-gray-600'}`}
        onClick={() => setFilter('all')}
      >
        All
      </Button>
      <Button
        className={`text-sm ${filter === 'unread' ? 'font-semibold' : 'text-gray-600'}`}
        onClick={() => setFilter('unread')}
      >
        Unread
      </Button>
      <Button
        className={`text-sm ${filter === 'today' ? 'font-semibold' : 'text-gray-600'}`}
        onClick={() => setFilter('today')}
      >
        Today
      </Button>
    </div>
  );
};

export default NotificationFilters;
