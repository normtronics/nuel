import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { useMutation } from '@apollo/client';
import { UPDATE_DEMAND } from '~/lib/graphql-queries';
import { useProductContext } from '~/context/ProductContext';

export function UpdateDemandForm() {
  const { selectedProduct, refetchProducts, setError, clearError } = useProductContext();

  if (!selectedProduct) return null;
  
  const product = selectedProduct;
  const [updateDemand] = useMutation(UPDATE_DEMAND);
  const [demandValue, setDemandValue] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateDemand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!demandValue || isUpdating) return;

    setIsUpdating(true);
    clearError(); // Clear any previous errors
    
    try {
      const result = await updateDemand({
        variables: {
          id: product.id,
          demand: parseInt(demandValue),
        },
      });
      setDemandValue('');
      
      // Refetch all products to get updated data
      if (result.data?.updateDemand) {
        await refetchProducts();
      }
    } catch (error: any) {
      const errorMessage = error?.message || 'Failed to update demand. Please try again.';
      setError(errorMessage);
      console.error('Error updating demand:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <TrendingUp className="h-5 w-5" />
        Update Demand
      </h4>
      <form onSubmit={handleUpdateDemand} className="space-y-4">
        <div>
          <label htmlFor="demand" className="block text-sm font-medium text-gray-700 mb-2">
            New Demand Value
          </label>
          <input
            type="number"
            id="demand"
            value={demandValue}
            onChange={(e) => setDemandValue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            placeholder={`Current: ${product.demand}`}
            min="0"
          />
        </div>
        <button
          type="submit"
          disabled={!demandValue || isUpdating}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUpdating ? 'Updating...' : 'Update Demand'}
        </button>
      </form>
    </div>
  );
}