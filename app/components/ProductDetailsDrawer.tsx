
import { X } from 'lucide-react';
import { useProductContext } from '~/context/ProductContext';
import { ProductInfo } from './ProductInfo';
import { UpdateDemandForm } from './UpdateDemandForm';
import { TransferStockForm } from './TransferStockForm';

interface ProductDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailsDrawer({
  isOpen,
  onClose,
}: ProductDetailsDrawerProps) {
  const { selectedProduct } = useProductContext();

  if (!selectedProduct || !isOpen) return null;





  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b border-gray-200 bg-white px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
              <button
                onClick={onClose}
                className="rounded-md p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Product Info */}
            <ProductInfo />

            {/* Update Demand Form */}
            <UpdateDemandForm />

            {/* Transfer Stock Form */}
            <TransferStockForm />
          </div>
        </div>
      </div>
    </div>
  );
}