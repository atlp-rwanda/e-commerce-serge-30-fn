export interface Attributes {
  type?: string;
  name?: string;
  title?: string;
  placeholder?: string;
}

const Input = ({ type, name, title, placeholder }: Attributes) => {
  return (
    <input
      type={type}
      name={name}
      title={title}
      placeholder={placeholder}
      className="rounded-[8px] w-[60%] border border-[#E0E0E0] py-2 px-4 box-border text-[#828282] shadow-sm focus:outline-none font-medium text-[16px]"
    />
  );
};

export default Input;
