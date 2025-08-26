import { ChevronDown } from 'lucide-react';
import { useProductContext } from '~/context/ProductContext';

interface StatusDropdownProps {
  className?: string;
}

export function StatusDropdown({ 
  className = ""
}: StatusDropdownProps) {
  const { selectedStatus, setSelectedStatus } = useProductContext();
  const statusOptions = [
    { value: '', label: 'All' },
    { value: 'in_stock', label: 'Healthy' },
    { value: 'equal', label: 'Low' },
    { value: 'low_stock', label: 'Critical' },
  ];

  return (
    <div className={`relative ${className}`}>
      <select
        value={selectedStatus}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-900"
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
    </div>
  );
}