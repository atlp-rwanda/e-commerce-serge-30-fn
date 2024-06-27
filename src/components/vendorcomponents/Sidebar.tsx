// src/components/Sidebar/Sidebar.tsx

import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';
import { CiSettings } from 'react-icons/ci';
import { useLogoutMutation } from '../../service/authApi';
import { VendorSidebarLinks, SidebarLink } from '../../data';

const Sidebar: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [logoutMutation, { isLoading: logoutLoading }] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logoutMutation({});
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-3 border-r bg-white shadow-lg w-64 md:w-48 lg:w-64">
      <div className="flex justify-center items-center gap-x-3 mb-6">
        <FaShoppingCart
          className="text-3xl text-blue-600"
          data-testid="cart-icon"
        />
        <h1
          className="text-center text-xl md:text-lg lg:text-2xl font-bold text-blue-600"
          data-testid="brand-name"
        >
          Exclusive
        </h1>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <ul className="flex flex-col text-slate-600 font-semibold space-y-2">
          {VendorSidebarLinks.map((item: SidebarLink) => (
            <li
              key={item.id}
              className="rounded-md hover:bg-gray-100"
              data-testid={`link-${item.name.toLowerCase()}`}
            >
              <NavLink
                end
                className="flex items-center p-3 gap-x-2 hover:bg-gray-100"
                to={`/vendor${item.link}`}
                data-testid={`navlink-${item.name.toLowerCase()}`}
              >
                <item.icon
                  className="text-2xl"
                  data-testid={`${item.name.toLowerCase()}-icon`}
                />
                <span className="tracking-wide">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="mt-auto">
          <li
            className="flex items-center p-3 hover:bg-gray-100"
            data-testid="settings-link"
          >
            <CiSettings className="text-2xl" />
            <span className="ml-2">Settings</span>
          </li>
          <li
            className="flex items-center p-3 hover:bg-gray-100"
            data-testid="logout-link"
          >
            <button
              className="flex items-center"
              onClick={handleLogout}
              disabled={isLoading || logoutLoading}
              data-testid="logout-button"
            >
              <IoLogOutOutline className="text-2xl" />
              <span className="ml-2">
                {isLoading ? 'Logging out...' : 'Logout'}
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;