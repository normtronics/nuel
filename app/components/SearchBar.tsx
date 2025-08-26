import { Search } from 'lucide-react';
import { useProductContext } from '~/context/ProductContext';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export function SearchBar({ 
  placeholder = "Search...",
  className = ""
}: SearchBarProps) {
  const { search, setSearch } = useProductContext();
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        type="text"
        placeholder={placeholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
      />
    </div>
  );
}