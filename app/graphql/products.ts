import { products } from "./data";

export default function productsQuery(_: any, args: { search?: string; status?: string; warehouse?: string }) {
  let filteredProducts = [...products];

  if (args.search) {
    const searchLower = args.search.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchLower) ||
      product.sku.toLowerCase().includes(searchLower)
    );
  }

  if (args.warehouse) {
    filteredProducts = filteredProducts.filter(product => 
      product.warehouse === args.warehouse
    );
  }

  if (args.status) {
    if (args.status === 'low_stock') {
      filteredProducts = filteredProducts.filter(product => product.stock < product.demand);
    } else if (args.status === 'in_stock') {
      filteredProducts = filteredProducts.filter(product => product.stock >= product.demand);
    }
  }
  return filteredProducts;
}