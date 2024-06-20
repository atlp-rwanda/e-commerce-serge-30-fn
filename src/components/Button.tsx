interface ButtonEl {
  type: any;
  title: string;
  bgColor?: string;
  children: string;
}

const Button = ({ type, title, children }: ButtonEl) => {
  return (
    <button
      type={type}
      title={title}
      className={`bg-black rounded-[8px] w-[60%] text-white border border-[#E0E0E0] py-2 px-4 box-border text-[828282] hover:opacity-90`}
    >
      {children}
    </button>
  );
};

export default Button;
