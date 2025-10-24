import { ChevronLeft, ChevronRight } from 'lucide-react';
import SearchBar from './SearchBar';

const DesktopSidebar = ({
  currentView,
  searchQuery,
  onSearchChange,
  onNavigate,
  sidebarCollapsed,
  onToggleSidebar,
}) => (
  <div className="min-h-screen bg-[#F6F6F6] shadow-lg transition-all duration-300 flex flex-col relative md:w-48 lg:min-w-50">
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center  mb-4">
        <h1 className="text-xl font-bold text-orange-500">Notes App</h1>
      </div>
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        className="bg-white"
      />
    </div>
    <nav className="flex-1 flex flex-col">
      <ul className="flex-1 py-2 flex-col">
        <button
          onClick={() => onNavigate('notes')}
          className={`flex items-center my-2 mx-6 px-4 py-2 hover:text-gray-900 cursor-pointer ${
            currentView === 'notes' ? 'text-orange-500' : 'text-gray-600'
          }
          ${currentView === 'notes' ? 'relative' : ''}`}
        >
          <span
            className={`absolute left-0 top-2 w-1 h-5 bg-orange-500 ${currentView === 'notes' ? 'block' : 'hidden'}`}
          ></span>
          Notes
        </button>
        <button
          onClick={() => onNavigate('addNote')}
          className={`flex items-center my-2 mx-6 px-4 py-2 hover:text-gray-900  cursor-pointer ${
            currentView === 'addNote' ? 'text-orange-500' : 'text-gray-600'
          }
          ${currentView === 'addNote' ? 'relative' : ''}`}
        >
          <span
            className={`absolute left-0 top-2 w-1 h-5 bg-orange-500 ${currentView === 'addNote' ? 'block' : 'hidden'}`}
          ></span>
          Add Note
        </button>
      </ul>
    </nav>

    {currentView === 'notes' && (
      <>
        <label
          htmlFor="toggleSidebar"
          className={`absolute top-24 -right-5 p-2 bg-white shadow-lg border border-[#E7E7E9] hover:bg-gray-100 rounded-full duration-300 cursor-pointer
          ${!sidebarCollapsed ? '-right-[21.2rem] left-auto' : ''} z-0`}
        >
          {sidebarCollapsed ? (
            <ChevronLeft className="w-6 h-6 text-[#E7E7E9]" />
          ) : (
            <ChevronRight className="w-6 h-6 text-[#E7E7E9]" />
          )}
        </label>
        <input
          id="toggleSidebar"
          type="checkbox"
          checked={sidebarCollapsed}
          onChange={onToggleSidebar}
          className="hidden"
        />
      </>
    )}
  </div>
);

export default DesktopSidebar;
