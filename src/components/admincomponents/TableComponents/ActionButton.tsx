import { useState, useEffect, useRef } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import RoleModal from './RoleModal';
import { IUser } from '../../../types';
import { useAssignRoleMutation } from '../../../service/authApi';
import { ColorRing } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '../../rootcomponents/Button';

interface ActionButtonProps {
  activeRole: string;
  id: string;
  refreshUsers: () => void;
}

const ActionButton = ({ activeRole, refreshUsers, id }: ActionButtonProps) => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [users, setUsers] = useState<IUser>();
  const [token, setToken] = useState<string | null>();
  const [assignRole, { isLoading }] = useAssignRoleMutation();

  const handleAction = () => {
    setDropdownActive(!dropdownActive);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownActive(false);
    }
  };

  useEffect(() => {
    if (dropdownActive) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    const user = JSON.parse(localStorage.getItem('user')!);
    const tokens = localStorage.getItem('token');
    if (user) {
      setUsers(user);
    }
    if (tokens) {
      setToken(tokens);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownActive]);

  const handleAssignRoles = () => {
    setDropdownActive(false);
    setModalActive(true);
  };

  const handleAssignRole = async (role: string) => {
    console.log(`Assigned role: ${role}`);
    role.toLowerCase();
    setModalActive(false);
    if (users && token) {
      const response = await assignRole({ id, token, role });
      console.log(response);
      if (response.data) {
        toast.success('Assigned Role successfully');
        refreshUsers();
      }
      if (response.error) {
        toast.error('Failed to assign role');
      }
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <ToastContainer />

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-white bg-opacity-50">
          <ColorRing
            visible={true}
            height="100%"
            width=""
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div>
      )}

      <Button
        onClick={handleAction}
        className=" bg-white p-2 rounded-full hover:bg-white"
        role="action"
      >
        <BiDotsHorizontalRounded className="h-6 w-6" />
      </Button>

      {dropdownActive && (
        <div className="absolute right-0 mb-24 mr-8 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="py-1">
            <Button
              onClick={handleAssignRoles}
              className="bg-white w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-slate-200"
            >
              Assign Roles
            </Button>

            <Button
              onClick={() => refreshUsers()}
              className="w-full text-left px-4 py-2 text-sm bg-red-500 text-white hover:bg-red-700"
            >
              Disable
            </Button>
          </div>
        </div>
      )}

      <RoleModal
        isOpen={modalActive}
        onClose={() => setModalActive(false)}
        onAssignRole={handleAssignRole}
        current={activeRole}
      />
    </div>
  );
};

export default ActionButton;
