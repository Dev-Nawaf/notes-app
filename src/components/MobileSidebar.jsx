import { X } from 'lucide-react';

const MobileSidebar = ({ isOpen, setIsOpen, onNavigate, currentView }) =>
  isOpen && (
    <div
      className="fixed left-0 top-0 h-full w-64 bg-[#F6F6F6] shadow-lg p-4 transform transition-transform duration-300"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={() => setIsOpen(false)}
          className="mr-3 p-1 hover:bg-gray-100 rounded"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <nav className="flex-1 flex flex-col p-2">
        <button
          onClick={() => onNavigate('notes')}
          className={`flex items-center my-2 mx-6 px-4 py-2 cursor-pointer 
            ${currentView === 'notes' ? 'text-orange-500' : 'text-gray-600'}
            ${currentView === 'notes' ? 'relative' : ''}`}
        >
          <span
            className={`absolute left-0 top-2 w-1 h-5 bg-orange-500 ${currentView === 'notes' ? 'block' : 'hidden'}`}
          ></span>
          Notes
        </button>
        <button
          onClick={() => onNavigate('addNote')}
          className={`flex items-center my-2 mx-6 px-4 py-2 cursor-pointer 
            ${currentView === 'addNote' ? 'text-orange-500' : 'text-gray-600'}
            ${currentView === 'addNote' ? 'relative' : ''}`}
        >
          <span
            className={`absolute left-0 top-2 w-1 h-5 bg-orange-500 ${currentView === 'addNote' ? 'block' : 'hidden'}`}
          ></span>
          Add Note
        </button>
      </nav>
    </div>
  );

export default MobileSidebar;
