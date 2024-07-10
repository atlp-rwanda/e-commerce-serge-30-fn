interface ButtonEl {
  type: 'button' | 'submit' | 'reset';
  title: string;
  bgColor?: string;
  children: string;
  className?: string;
  onClick?: () => void;
}

const Button = ({ type, title, children, className, onClick }: ButtonEl) => {
  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      className={`bg-black rounded-[8px] w-[60%] text-white border border-[#E0E0E0] py-2 px-4 box-border text-[828282] hover:opacity-90 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
