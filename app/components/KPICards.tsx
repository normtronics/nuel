import { useMemo } from 'react';
import { useProductContext } from '~/context/ProductContext';

export function KPICards() {
  const { products } = useProductContext();
  const { totalStock, totalDemand, fillRate } = useMemo(() => {
    const stock = products.reduce((sum, product) => sum + product.stock, 0);
    const demand = products.reduce((sum, product) => sum + product.demand, 0);
    const rate = demand > 0 
      ? Math.round((products.reduce((sum, product) => sum + Math.min(product.stock, product.demand), 0) / demand) * 100)
      : 0;
    
    return {
      totalStock: stock,
      totalDemand: demand,
      fillRate: rate
    };
  }, [products]);

  const kpiData = [
    {
      title: 'Total Stock',
      value: totalStock.toLocaleString(),
      color: 'blue',
    },
    {
      title: 'Total Demand',
      value: totalDemand.toLocaleString(),
      color: 'green',
    },
    {
      title: 'Fill Rate',
      value: `${fillRate}%`,
      color: fillRate >= 80 ? 'green' : 'red',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {kpiData.map((kpi) => (
        <div key={kpi.title} className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
            </div>
            <div className={`w-3 h-3 rounded-full ${
              kpi.color === 'green' ? 'bg-green-500' : 
              kpi.color === 'red' ? 'bg-red-500' : 'bg-blue-500'
            }`}></div>
          </div>
        </div>
      ))}
    </div>
  );
}