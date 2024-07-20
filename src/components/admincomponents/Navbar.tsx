import React, { useEffect, useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { IUser } from '../../types';
import { IoMenuOutline } from 'react-icons/io5';
import { Button } from '../rootcomponents/Button';
interface NavbarProps {
  onClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onClick }) => {
  const currentDate = new Date(Date.now()).toLocaleString();
  const [users, setUsers] = useState<IUser>();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (!user) return;
    setUsers(user);
  }, []);
  return (
    <nav className="">
      <header className="flex border w-full items-center justify-between h-16 px-4 border-b shrink-0 md:px-6">
        <div>
          <h1 className="text-lg font-medium">Hello, {users?.firstname}</h1>
          <p className="text-sm text-gray-400">{currentDate}</p>
        </div>
        <div className="flex items-center gap-x-8">
          <FaBell />

          <Button
            className="p-0 hover:bg-white bg-white inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-14 w-14 rounded-full"
            type="button"
            id="radix-:r0:"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed"
          >
            <img
              src={
                users?.image_url ? users.image_url : 'https://i.pravatar.cc/300'
              }
              className="rounded-full ring ring-slate-800"
              alt="Avatar"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div>
        <Button
          onClick={onClick}
          className=" bg-white hover:bg-white lg:hidden"
        >
          <IoMenuOutline size={24} />
        </Button>
      </header>
    </nav>
  );
};
export default Navbar;
