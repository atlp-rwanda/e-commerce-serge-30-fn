import React from 'react';
import { Button } from '../../rootcomponents/Button';

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssignRole: (_role: string) => void;
  current: string;
}

const RoleModal: React.FC<RoleModalProps> = ({
  isOpen,
  onClose,
  onAssignRole,
  current,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="bg-black bg-opacity-50 absolute inset-0"
        onClick={onClose}
      />
      <div className="bg-white rounded-lg p-6 z-10 w-80">
        <h2 className="text-lg font-semibold mb-4">Assign Role</h2>
        <div className="space-y-2">
          <Button
            onClick={() => onAssignRole('USER')}
            disabled={current === 'USER'}
            className={`  w-full px-4 py-2 text-sm rounded ${
              current === 'USER'
                ? 'bg-gray-300 text-gray-700 cursor-not-allowed hover:bg-blue-400'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {' '}
            User
          </Button>

          <Button
            onClick={() => onAssignRole('ADMIN')}
            disabled={current === 'ADMIN'}
            className={` w-full px-4 py-2 text-sm rounded ${
              current === 'ADMIN'
                ? 'bg-gray-300 text-gray-700 cursor-not-allowed hover:bg-green-500'
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
          >
            Admin
          </Button>

          <Button
            onClick={() => onAssignRole('VENDOR')}
            disabled={current === 'VENDOR'}
            className={` w-full px-4 py-2 text-sm rounded ${
              current === 'VENDOR'
                ? 'bg-gray-300 text-gray-700 cursor-not-allowed hover:bg-yellow-400'
                : 'bg-yellow-500 text-white hover:bg-yellow-600'
            }`}
          >
            Vendor
          </Button>
        </div>
        <Button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          {' '}
          Close
        </Button>
      </div>
    </div>
  );
};

export default RoleModal;
