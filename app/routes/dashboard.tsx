import { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '~/lib/apollo-client';
import { ProductProvider, useProductContext } from '~/context/ProductContext';
import { TopBar } from '~/components/TopBar';
import { KPICards } from '~/components/KPICards';
import { StockDemandChart } from '~/components/StockDemandChart';
import { FiltersRow } from '~/components/FiltersRow';
import { ProductsTable } from '~/components/ProductsTable';
import { ProductDetailsDrawer } from '~/components/ProductDetailsDrawer';
import { ErrorBanner } from '~/components/ErrorBanner';
import type { Product } from "~/types/types";

function DashboardContent() {
  const {
    kpis,
    loading: productsLoading,
    searchLoading,
    dateRange,
    setDateRange,
    setSelectedProduct,
  } = useProductContext();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProduct(null);
  };

  if (productsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar dateRange={dateRange} onDateRangeChange={setDateRange} />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <KPICards />
        
        <StockDemandChart kpis={kpis} />
        
        <FiltersRow />
        
        <div className="relative">
          {searchLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-75 z-10 flex items-center justify-center rounded-lg">
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm">Searching...</span>
              </div>
            </div>
          )}
          <ProductsTable
            onProductClick={handleProductClick}
          />
        </div>
      </div>

      <ProductDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
      
      <ErrorBanner />
    </div>
  );
}

export default function Dashboard() {
  return (
    <ApolloProvider client={apolloClient}>
      <ProductProvider>
        <DashboardContent />
      </ProductProvider>
    </ApolloProvider>
  );
}