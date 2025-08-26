import { SearchBar } from './SearchBar';
import { WarehouseDropdown } from './WarehouseDropdown';
import { StatusDropdown } from './StatusDropdown';

export function FiltersRow() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SearchBar placeholder="Search by name, SKU, or ID..." />
        <WarehouseDropdown />
        <StatusDropdown />
      </div>
    </div>
  );
}