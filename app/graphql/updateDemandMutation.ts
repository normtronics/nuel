import { products } from "./data";

export default function updateDemandMutation(_: any, args: { id: string; demand: number }) {
  const product = products.find(p => p.id === args.id);
  if (!product) {
    throw new Error(`Product with id ${args.id} not found`);
  }
  
  product.demand = args.demand;
  return product;
}