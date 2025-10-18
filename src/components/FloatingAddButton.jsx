import { Plus } from 'lucide-react';

const FloatingAddButton = ({ onClick }) => (
  <div className="fixed bottom-8 right-8">
    <button
      onClick={onClick}
      className="w-16 h-16 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors"
    >
      <Plus className="w-8 h-8" strokeWidth={1} />
    </button>
  </div>
);

export default FloatingAddButton;
