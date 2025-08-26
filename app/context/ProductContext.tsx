import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useQuery } from '@apollo/client';
import { useSearchParams } from 'react-router';
import { GET_PRODUCTS, GET_WAREHOUSES, GET_KPIS } from '~/lib/graphql-queries';
import type { Product, Warehouse, KPI } from "~/types/types";

interface ProductContextType {
  products: Product[];
  warehouses: Warehouse[];
  kpis: KPI[];
  loading: boolean;
  searchLoading: boolean;
  refetchProducts: () => Promise<any>;
  search: string;
  setSearch: (search: string) => void;
  selectedWarehouse: string;
  setSelectedWarehouse: (warehouse: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  dateRange: string;
  setDateRange: (range: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export function ProductProvider({ children }: ProductProviderProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize from URL params or defaults
  const search = searchParams.get('search') || '';
  const selectedWarehouse = searchParams.get('warehouse') || '';
  const selectedStatus = searchParams.get('status') || '';
  const dateRange = searchParams.get('range') || '7d';
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Functions to update both state and URL params
  const setSearch = (newSearch: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (newSearch) {
      newParams.set('search', newSearch);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);
  };

  const setSelectedWarehouse = (warehouse: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (warehouse) {
      newParams.set('warehouse', warehouse);
    } else {
      newParams.delete('warehouse');
    }
    setSearchParams(newParams);
  };

  const setSelectedStatus = (status: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (status) {
      newParams.set('status', status);
    } else {
      newParams.delete('status');
    }
    setSearchParams(newParams);
  };

  const setDateRange = (range: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (range && range !== '7d') {
      newParams.set('range', range);
    } else {
      newParams.delete('range');
    }
    setSearchParams(newParams);
  };

  const { data: productsData, loading: productsLoading, refetch: refetchProducts } = useQuery(GET_PRODUCTS, {
    variables: {
      search: search || undefined,
      warehouse: selectedWarehouse || undefined,
      status: selectedStatus || undefined,
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });

  const refetchAllProducts = async () => {
    const result = await refetchProducts({
      search: search || undefined,
      warehouse: selectedWarehouse || undefined,
      status: selectedStatus || undefined,
    });
        
    return result;
  };

  const clearError = () => {
    setError(null);
  };

  const { data: warehousesData } = useQuery(GET_WAREHOUSES);
  const { data: kpisData } = useQuery(GET_KPIS, {
    variables: { range: dateRange },
  });

  const products = productsData?.products || [];
  const warehouses = warehousesData?.warehouses || [];
  const kpis = kpisData?.kpis || [];

  // Use a debounced loading state to prevent too frequent loading indicators
  const [searchLoading, setSearchLoading] = useState(false);
  
  useEffect(() => {
    if (search || selectedWarehouse || selectedStatus) {
      setSearchLoading(true);
      // Use a shorter delay to show loading feedback without long delays
      const timer = setTimeout(() => {
        setSearchLoading(false);
      }, 150);
      
      return () => clearTimeout(timer);
    } else {
      setSearchLoading(false);
    }
  }, [search, selectedWarehouse, selectedStatus]);

  useEffect(() => {
    if (!productsLoading) {
      setSearchLoading(false);
    }
  }, [productsLoading]);

  // Update selectedProduct when products array changes to keep it in sync
  useEffect(() => {
    if (selectedProduct && products.length > 0) {
      const updatedProduct = products.find(p => p.id === selectedProduct.id);
      if (updatedProduct && 
          (updatedProduct.stock !== selectedProduct.stock || 
           updatedProduct.demand !== selectedProduct.demand)) {
        setSelectedProduct(updatedProduct);
      }
    }
  }, [products]); // Only depend on products to avoid infinite loops



  const value: ProductContextType = {
    products,
    warehouses,
    kpis,
    loading: productsLoading,
    searchLoading,
    refetchProducts: refetchAllProducts,
    search,
    setSearch,
    selectedWarehouse,
    setSelectedWarehouse,
    selectedStatus,
    setSelectedStatus,
    dateRange,
    setDateRange,
    selectedProduct,
    setSelectedProduct,
    error,
    setError,
    clearError,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
}