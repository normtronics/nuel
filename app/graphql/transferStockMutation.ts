import type { Product } from "~/types/types";
import { products } from "./data";

export default function transferStockMutation(_: any, args: { id: string; from: string; to: string; qty: number }) {
  const sourceProduct = products.find(p => p.id === args.id);
  if (!sourceProduct) {
    throw new Error(`Product with id ${args.id} not found`);
  }

  if (sourceProduct.warehouse !== args.from) {
    throw new Error(`Product is not in warehouse ${args.from}`);
  }

  if (sourceProduct.stock < args.qty) {
    throw new Error(`Insufficient stock. Available: ${sourceProduct.stock}, Requested: ${args.qty}`);
  }

  const destinationProduct = products.find(p => 
    p.sku === sourceProduct.sku && p.warehouse === args.to
  );
  
  sourceProduct.stock -= args.qty;

  if (destinationProduct) {
    destinationProduct.stock += args.qty;
    return sourceProduct;
  } else {
    const newProduct: Product = {
      id: `P-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: sourceProduct.name,
      sku: sourceProduct.sku,
      warehouse: args.to,
      stock: args.qty,
      demand: 0,
    };
  
    products.push(newProduct);  
    return sourceProduct;
  }
}