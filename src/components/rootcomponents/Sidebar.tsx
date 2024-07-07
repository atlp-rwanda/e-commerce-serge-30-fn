import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { IoLogOutOutline } from 'react-icons/io5';
import { CiSettings } from 'react-icons/ci';
import { NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { SidebarLink } from '../../data/index';

interface SidebarProps {
  userLinks: SidebarLink[];
}

export const Sidebar: React.FC<SidebarProps> = ({ userLinks }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Sidebar for large screens */}
      <div className="hidden tablet:flex flex-col p-3 border-r w-64 h-screen">
        <div className="flex justify-center items-center gap-x-3 mb-12">
          <FaShoppingCart className="text-2xl" />
          <h1 className="text-2xl font-bold">Exclusive</h1>
        </div>
        <ul className="flex flex-col text-slate-600 font-semibold space-y-2">
          {userLinks.map((item) => (
            <li
              key={item.id}
              className="w-full hover:bg-gray-100 cursor-pointer"
            >
              <NavLink
                end
                className="flex items-center gap-x-2 p-2 hover:bg-customBlue hover:text-white"
                to={`/user${item.link}`}
              >
                <item.icon className="text-2xl" />
                <span className="tracking-wide">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="mt-auto">
          <li className="flex gap-x-2 p-3 items-center hover:bg-customBlue hover:text-white cursor-pointer">
            <CiSettings className="text-2xl" />
            <span>Settings</span>
          </li>
          <li className="flex gap-x-2 items-center p-3 hover:bg-customBlue hover:text-white cursor-pointer">
            <IoLogOutOutline className="text-2xl" />
            <span>Logout</span>
          </li>
        </ul>
      </div>

      {/* Navbar for small screens */}
      <div className="tablet:hidden flex flex-col p-3 border-b w-full">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-x-3">
            <FaShoppingCart className="text-2xl" />
            <h1 className="text-2xl font-bold">Exclusive</h1>
          </div>
          <FiMenu
            className="text-2xl cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        {isOpen && (
          <ul className="flex flex-col text-slate-600 font-semibold space-y-2 mt-4">
            {userLinks.map((item) => (
              <li
                key={item.id}
                className="w-full hover:bg-gray-100 cursor-pointer"
              >
                <NavLink
                  end
                  className="flex items-center gap-x-2 p-2 hover:bg-customBlue hover:text-white"
                  to={`/user${item.link}`}
                >
                  <item.icon className="text-2xl" />
                  <span className="tracking-wide">{item.name}</span>
                </NavLink>
              </li>
            ))}
            <li className="flex gap-x-2 p-3 items-center hover:bg-customBlue hover:text-white cursor-pointer">
              <CiSettings className="text-2xl" />
              <span>Settings</span>
            </li>
            <li className="flex gap-x-2 items-center p-3 hover:bg-customBlue hover:text-white cursor-pointer">
              <IoLogOutOutline className="text-2xl" />
              <span>Logout</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
