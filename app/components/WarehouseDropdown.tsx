import { ChevronDown } from 'lucide-react';
import { useProductContext } from '~/context/ProductContext';

interface WarehouseDropdownProps {
  placeholder?: string;
  className?: string;
}

export function WarehouseDropdown({ 
  placeholder = "All Warehouses",
  className = ""
}: WarehouseDropdownProps) {
  const { selectedWarehouse, warehouses, setSelectedWarehouse } = useProductContext();
  return (
    <div className={`relative ${className}`}>
      <select
        value={selectedWarehouse}
        onChange={(e) => setSelectedWarehouse(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-900"
      >
        <option value="">{placeholder}</option>
        {warehouses.map((warehouse) => (
          <option key={warehouse.code} value={warehouse.code}>
            {warehouse.name} ({warehouse.code})
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
    </div>
  );
}