import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { TRANSFER_STOCK, GET_PRODUCTS } from '~/lib/graphql-queries';
import { useProductContext } from '~/context/ProductContext';

export function TransferStockForm() {
  const { selectedProduct, warehouses, refetchProducts, setError, clearError } = useProductContext();

  if (!selectedProduct) return null;
  
  const product = selectedProduct;
  const [transferStock] = useMutation(TRANSFER_STOCK, {
    refetchQueries: [{ query: GET_PRODUCTS }],
    awaitRefetchQueries: true,
  });
  
  const [transferQty, setTransferQty] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleTransferStock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transferQty || !transferTo || isUpdating) return;

    setIsUpdating(true);
    clearError(); // Clear any previous errors
    
    try {
      const result = await transferStock({
        variables: {
          id: product.id,
          from: product.warehouse,
          to: transferTo,
          qty: parseInt(transferQty),
        },
      });
      setTransferQty('');
      setTransferTo('');
      
      await refetchProducts();
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to transfer stock. Please try again.';
      setError(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  const availableWarehouses = warehouses.filter(w => w.code !== product.warehouse);

  return (    
    <div>
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <ArrowRight className="h-5 w-5" />
        Transfer Stock
      </h4>
      <form onSubmit={handleTransferStock} className="space-y-4">
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
            Quantity to Transfer
          </label>
          <input
            type="number"
            id="quantity"
            value={transferQty}
            onChange={(e) => setTransferQty(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            placeholder={`Max: ${product.stock}`}
            min="1"
            max={product.stock}
          />
        </div>
        <div>
          <label htmlFor="warehouse" className="block text-sm font-medium text-gray-700 mb-2">
            Transfer To Warehouse
          </label>
          <select
            id="warehouse"
            value={transferTo}
            onChange={(e) => setTransferTo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
          >
            <option value="">Select warehouse...</option>
            {availableWarehouses.map((warehouse) => (
              <option key={warehouse.code} value={warehouse.code}>
                {warehouse.name} ({warehouse.code})
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={!transferQty || !transferTo || isUpdating}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUpdating ? 'Transferring...' : 'Transfer Stock'}
        </button>
      </form>
    </div>
  );
}