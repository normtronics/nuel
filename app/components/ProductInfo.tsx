import { useMemo } from 'react';
import { Package } from 'lucide-react';
import { useProductContext } from '~/context/ProductContext';

export function ProductInfo() {
  const { selectedProduct } = useProductContext();

  const statusInfo = useMemo(() => {
    if (!selectedProduct) return null;
    
    return selectedProduct.stock > selectedProduct.demand
      ? { status: 'Healthy', color: 'green', icon: '🟢' }
      : selectedProduct.stock === selectedProduct.demand
      ? { status: 'Low', color: 'yellow', icon: '🟡' }
      : { status: 'Critical', color: 'red', icon: '🔴' };
  }, [selectedProduct?.stock, selectedProduct?.demand]);

  if (!selectedProduct || !statusInfo) return null;
  
  const product = selectedProduct;

  return (
    <div className="bg-gray-50 p-6 rounded-lg mb-6">
      <div className="flex items-start gap-4">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Package className="h-6 w-6 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Product ID:</span>
              <p className="font-medium text-gray-900">{product.id}</p>
            </div>
            <div>
              <span className="text-gray-500">SKU:</span>
              <p className="font-medium text-gray-900">{product.sku}</p>
            </div>
            <div>
              <span className="text-gray-500">Warehouse:</span>
              <p className="font-medium text-gray-900">{product.warehouse}</p>
            </div>
            <div>
              <span className="text-gray-500">Status:</span>
              <div className="flex items-center gap-2">
                <span>{statusInfo.icon}</span>
                <span className={`font-medium ${
                  statusInfo.color === 'green' ? 'text-green-600' : 
                  statusInfo.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {statusInfo.status}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-gray-500 text-sm">Current Stock</span>
                <p className="text-2xl font-bold text-gray-900">{product.stock.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Demand</span>
                <p className="text-2xl font-bold text-gray-900">{product.demand.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}