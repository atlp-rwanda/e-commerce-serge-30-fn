// Props type definition
interface IconButtonProps {
  text: string;
  colorClasses: string;
  IconComponent: React.ElementType; // Accepts a component like FaEdit, FaTrashAlt
  onClick?: () => void;
  disabled?: boolean;
}

export const ActionButton: React.FC<IconButtonProps> = ({
  text,
  colorClasses,
  IconComponent,
  onClick,
  disabled,
}) => {
  return (
    <button
      className={`rounded flex items-center transition duration-150 ease-in-out ${colorClasses}`}
      onClick={onClick}
      disabled={disabled}
    >
      <IconComponent className="mr-2" /> {text}
    </button>
  );
};
