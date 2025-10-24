import { X, Search, ChevronRight, Menu } from 'lucide-react';
const MobileHeader = ({
  title,
  showBack = false,
  showMenu = false,
  onBack,
  onMenuToggle,
  onSearchToggle,
  searchVisible,
  currentView,
}) => (
  <div
    className={`p-4 items-center ${currentView === 'addNote' ? 'grid grid-cols-[1fr,auto,1fr]' : 'flex justify-between'} `}
  >
    {showBack && (
      <button onClick={onBack} className="mr-3 p-1 hover:bg-gray-100 rounded">
        <ChevronRight className="w-5 h-5" />
      </button>
    )}
    {showMenu && (
      <button
        onClick={onMenuToggle}
        className={`mr-3 p-1 hover:bg-gray-100 rounded  ${currentView === 'addNote' ? 'justify-self-start row-1' : ''}`}
      >
        <Menu className="w-5 h-5" />
      </button>
    )}
    <h1
      className={`text-lg font-bold text-orange-500 ${currentView === 'addNote' ? 'justify-self-center col-2' : ''} `}
    >
      {title}
    </h1>

    <button
      onClick={onSearchToggle}
      className={`p-2 text-orange-500 hover:bg-orange-50 rounded-full ${currentView === 'addNote' ? 'opacity-0 col-3' : ''}`}
    >
      {searchVisible ? (
        <X className="w-5 h-5" />
      ) : (
        <Search className="w-5 h-5" />
      )}
    </button>
  </div>
);
export default MobileHeader;
