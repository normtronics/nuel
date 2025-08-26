import { useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useProductContext } from '~/context/ProductContext';
import { Pagination } from '~/components/Pagination';
import type { Product } from "~/types/types";

interface ProductsTableProps {
  onProductClick: (product: Product) => void;
}

export function ProductsTable({
  onProductClick,
}: ProductsTableProps) {
  const { products, selectedStatus, search, selectedWarehouse } = useProductContext();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  // Filter products based on status
  const filteredProducts = useMemo(() => {
    if (!selectedStatus) return products;
    
    return products.filter((product: Product) => {
      if (selectedStatus === 'in_stock') return product.stock > product.demand;  // Healthy: stock > demand
      if (selectedStatus === 'equal') return product.stock === product.demand;   // Low: stock === demand
      if (selectedStatus === 'low_stock') return product.stock < product.demand; // Critical: stock < demand
      return true;
    });
  }, [products, selectedStatus]);

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage > 1) {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('page');
      setSearchParams(newParams, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, selectedWarehouse, selectedStatus]);

  const onPageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    if (page > 1) {
      newParams.set('page', page.toString());
    } else {
      newParams.delete('page');
    }
    setSearchParams(newParams);
  };
  
  const getStatusInfo = (stock: number, demand: number) => {
    if (stock > demand) {
      return { status: 'Healthy', color: 'green', icon: '🟢' };
    } else if (stock === demand) {
      return { status: 'Low', color: 'yellow', icon: '🟡' };
    } else {
      return { status: 'Critical', color: 'red', icon: '🔴' };
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Warehouse
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Demand
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedProducts.map((product) => {
              const statusInfo = getStatusInfo(product.stock, product.demand);
              return (
                <tr
                  key={product.id}
                  onClick={() => onProductClick(product)}
                  className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                    statusInfo.color === 'red' ? 'bg-red-50' : 
                    statusInfo.color === 'yellow' ? 'bg-yellow-50' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.warehouse}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.stock.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.demand.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="inline-flex items-center">
                      <span className="mr-2">{statusInfo.icon}</span>
                      {statusInfo.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        totalItems={filteredProducts.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}