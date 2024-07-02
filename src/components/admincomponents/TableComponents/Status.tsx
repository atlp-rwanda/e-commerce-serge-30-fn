interface StatusProps {
  isActive: boolean;
}

const Status: React.FC<StatusProps> = ({ isActive }) => {
  return (
    <span
      className={`px-2 py-1 rounded-full text-sm font-semibold ${
        isActive ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
      }`}
    >
      {isActive ? 'Active' : 'Not Active'}
    </span>
  );
};

export default Status;
