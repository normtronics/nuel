import { products } from "./data";

export default function kpisQuery(_: any, args: { range: string }) {
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const totalDemand = products.reduce((sum, product) => sum + product.demand, 0);
  
  const days = args.range === '30d' ? 30 : args.range === '14d' ? 14 : 7;
  const kpiData = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const stockVariation = Math.random() * 0.1 - 0.05;
    const demandVariation = Math.random() * 0.1 - 0.05;
    
    kpiData.push({
      date: date.toISOString().split('T')[0],
      stock: Math.round(totalStock * (1 + stockVariation)),
      demand: Math.round(totalDemand * (1 + demandVariation))
    });
  }
  
  return kpiData;
}