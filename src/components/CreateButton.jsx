import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CreateButton = ({ onClick }) => {
  let navigate = useNavigate();
  const navigateToCreate = () => {
    if (onClick) {
      onClick();
    }
    navigate('/create');
  }
  return (
    <div className="flex justify-center">
      <button
        onClick={navigateToCreate}
        className="inline-flex items-center space-x-2 cursor-pointer bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
      >
        <Plus className="h-5 w-5" />
        <span>Create New Note</span>
      </button>
    </div>
  );
};

export default CreateButton;
