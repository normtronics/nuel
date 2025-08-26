import { warehouses } from "./data";
import productsQuery from "./products";
import kpisQuery from "./kpis";
import updateDemandMutation from "./updateDemandMutation";
import transferStockMutation from "./transferStockMutation";


export const resolvers = {
  Query: {
    products: productsQuery,
    warehouses: () => warehouses,
    kpis: kpisQuery,
  },

  Mutation: {
    updateDemand: updateDemandMutation,
    transferStock: transferStockMutation,
  }
};