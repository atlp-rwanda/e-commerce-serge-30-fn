import { useState } from 'react';
import logoImage from '../../assets/Group 1000005934.png';
import MenuLinks from '../rootcomponents/MenuLinks';
import MenuLinksIcons from '../rootcomponents/MenuLinksIcons';

const NavBar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const handleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div className="flex flex-col font-outfit px-12 max-tablet:px-2">
      <header className="flex justify-between items-center p-4 text-white font-outfit">
        <div className="logo">
          <img src={logoImage} alt="Exclusive" className="w-32" />
        </div>
        <nav
          className={`menu flex space-x-4 text-slate-700 ${menuActive ? 'max-tablet:flex max-tablet:flex-col max-tablet:z-10 max-tablet:absolute max-tablet:right-20 max-tablet:pt-60 max-tablet:pr-40 max-tablet:text-4xl max-tablet:gap-4 max-tablet:text-left max-tablet:items-baseline' : ''} max-tablet:hidden`}
        >
          <MenuLinks className="flex gap-4" />
        </nav>
        <div
          className={`links text-black flex items-center gap-4 ${menuActive ? 'max-tablet:flex max-tablet:flex-col max-tablet:z-10 max-tablet:absolute max-tablet:right-20 max-tablet:pt-96 max-tablet:mt-56 max-tablet:pr-40 max-tablet:text-lg max-tablet:text-left max-tablet:items-baseline' : ''} max-tablet:hidden`}
        >
          <div
            className={`flex items-center border border-slate-400 rounded-md ${menuActive && 'max-tablet:hidden'}`}
          >
            <input
              type="search"
              name=""
              id=""
              placeholder="Search Product"
              className="p-2 text-sm placeholder:text-sm outline-none"
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <MenuLinksIcons menuActive={menuActive} className="flex gap-4" />
        </div>
        <div className="tablet:hidden relative z-50" onClick={handleMenu}>
          {menuActive ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-white"
              aria-label="close menu"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-black tablet:hidden"
              aria-label="open menu"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
          {menuActive && (
            <div className="-z-50 absolute w-72 h-screen bg-slate-800 rounded-md shadow-md shadow-blue-100 top-0 right-0 transition-all ease-in-out duration-300 animate-slideIn max-tablet:flex max-tablet:flex-col max-tablet:px-10 max-tablet:pt-12 max-tablet:text-3xl max-tablet:gap-4">
              <MenuLinks className="flex flex-col px-10 pt-12 text-3xl gap-4" />
              <MenuLinksIcons
                menuActive={menuActive}
                className="pt-20 pl-10 flex gap-6"
              />
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default NavBar;
