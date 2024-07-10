import { useNavigate } from 'react-router-dom';

interface MenuLinkIconProp {
  menuActive?: boolean;
  className?: string;
}

const MenuLinksIcons = ({ menuActive, className }: MenuLinkIconProp) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('user');
  };
  return (
    <div className={className}>
      {' '}
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-6 w-6 h-6 ${menuActive && 'w-12 h-12'}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
        {/* <div
          className={`w-[1.05rem] h-[1.05rem] bg-red-400 absolute bottom-[1rem] left-4 rounded-full text-xs text-white text-center ${menuActive && 'w-8 h-8 text-2xl bottom-8 left-6'}`}
        >
          1
        </div> */}
      </div>
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`size-6 w-6 h-6 ${menuActive && 'w-12 h-12'}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
        {/* <div
          className={`w-[1.05rem] h-[1.05rem] bg-red-400 absolute bottom-[1rem] left-4 rounded-full text-xs text-white text-center ${menuActive && 'w-8 h-8 text-2xl bottom-8 items-center left-6'}`}
        >
          1
        </div> */}
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        onDoubleClick={handleClick}
        className={`size-6 w-6 h-6 ${menuActive && 'w-12 h-12'}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
        />
      </svg>
    </div>
  );
};

export default MenuLinksIcons;
