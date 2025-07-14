interface AddButtonProps {
  label: string;
  onClick: () => void;
}
const AddButton: React.FC<AddButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full p-2 border-2 border-dashed rounded-md text-gray-500 hover:border-gray-400"
    >
      + {label}
    </button>
  );
};

export default AddButton;
