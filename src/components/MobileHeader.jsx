import { X, Search, ChevronRight, Menu } from 'lucide-react';
const MobileHeader = ({
  title,
  showBack = false,
  showMenu = false,
  onBack,
  onMenuToggle,
  onSearchToggle,
  searchVisible,
}) => (
  <div className="md:hidden bg-white shadow-sm border-b border-gray-200 p-4 flex items-center justify-between">
    {showBack && (
      <button onClick={onBack} className="mr-3 p-1 hover:bg-gray-100 rounded">
        <ChevronRight className="w-5 h-5" />
      </button>
    )}
    {showMenu && (
      <button
        onClick={onMenuToggle}
        className="mr-3 p-1 hover:bg-gray-100 rounded"
      >
        <Menu className="w-5 h-5" />
      </button>
    )}
    <h1 className="text-lg font-bold text-orange-500">{title}</h1>

    <button
      onClick={onSearchToggle}
      className="p-2 text-orange-500 hover:bg-orange-50 rounded-full"
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
