// Props type definition
interface IconButtonProps {
  text: string;
  colorClasses: string;
  IconComponent: React.ElementType; // Accepts a component like FaEdit, FaTrashAlt
  onClick?: () => void;
}

export const ActionButton: React.FC<IconButtonProps> = ({
  text,
  colorClasses,
  IconComponent,
  onClick,
}) => {
  return (
    <button
      className={`px-6 py-2 rounded flex items-center transition duration-150 ease-in-out ${colorClasses}`}
      onClick={onClick}
    >
      <IconComponent className="mr-2" /> {text}
    </button>
  );
};
