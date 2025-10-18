import { Search } from 'lucide-react';

const SearchBar = ({ searchQuery, onSearchChange, className = '' }) => (
  <div className={`relative ${className}`}>
    <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full pl-10 pr-4 py-2 shadow-sm rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
    />
  </div>
);

export default SearchBar;
