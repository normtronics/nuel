import type { Product, Warehouse, KPI } from "~/types/types";

export let products: Product[] = [
  { "id": "P-1001", "name": "12mm Hex Bolt", "sku": "HEX-12-100", "warehouse": "BLR-A", "stock": 180, "demand": 120 },
  { "id": "P-1002", "name": "Steel Washer", "sku": "WSR-08-500", "warehouse": "BLR-A", "stock": 50, "demand": 80 },
  { "id": "P-1003", "name": "M8 Nut", "sku": "NUT-08-200", "warehouse": "PNQ-C", "stock": 80, "demand": 80 },
  { "id": "P-1004", "name": "Bearing 608ZZ", "sku": "BRG-608-50", "warehouse": "DEL-B", "stock": 24, "demand": 120 },
  
  // Additional products for pagination testing
  { "id": "P-1005", "name": "Socket Head Cap Screw", "sku": "SHC-10-75", "warehouse": "BLR-A", "stock": 350, "demand": 200 },
  { "id": "P-1006", "name": "Flat Head Screw", "sku": "FHS-06-50", "warehouse": "PNQ-C", "stock": 120, "demand": 150 },
  { "id": "P-1007", "name": "Lock Washer", "sku": "LWR-08-300", "warehouse": "DEL-B", "stock": 75, "demand": 90 },
  { "id": "P-1008", "name": "Threaded Rod", "sku": "THR-12-1000", "warehouse": "BLR-A", "stock": 45, "demand": 60 },
  { "id": "P-1009", "name": "Wing Nut", "sku": "WNG-10-150", "warehouse": "PNQ-C", "stock": 200, "demand": 180 },
  { "id": "P-1010", "name": "Carriage Bolt", "sku": "CBT-08-100", "warehouse": "DEL-B", "stock": 90, "demand": 110 },
  
  { "id": "P-1011", "name": "Allen Key Set", "sku": "ALK-SET-9PC", "warehouse": "BLR-A", "stock": 25, "demand": 30 },
  { "id": "P-1012", "name": "Machine Screw", "sku": "MSC-06-40", "warehouse": "PNQ-C", "stock": 500, "demand": 400 },
  { "id": "P-1013", "name": "Spring Washer", "sku": "SPW-10-250", "warehouse": "DEL-B", "stock": 180, "demand": 200 },
  { "id": "P-1014", "name": "U-Bolt", "sku": "UBT-12-80", "warehouse": "BLR-A", "stock": 60, "demand": 45 },
  { "id": "P-1015", "name": "Eye Bolt", "sku": "EBT-10-120", "warehouse": "PNQ-C", "stock": 35, "demand": 50 },
  { "id": "P-1016", "name": "Thumb Screw", "sku": "THS-08-60", "warehouse": "DEL-B", "stock": 150, "demand": 120 },
  
  { "id": "P-1017", "name": "Anchor Bolt", "sku": "ANB-16-200", "warehouse": "BLR-A", "stock": 80, "demand": 100 },
  { "id": "P-1018", "name": "Set Screw", "sku": "SSC-06-25", "warehouse": "PNQ-C", "stock": 300, "demand": 280 },
  { "id": "P-1019", "name": "Flange Nut", "sku": "FNT-12-180", "warehouse": "DEL-B", "stock": 95, "demand": 110 },
  { "id": "P-1020", "name": "Cap Nut", "sku": "CNT-10-100", "warehouse": "BLR-A", "stock": 140, "demand": 120 },
  { "id": "P-1021", "name": "Lag Screw", "sku": "LSC-14-150", "warehouse": "PNQ-C", "stock": 55, "demand": 75 },
  { "id": "P-1022", "name": "Toggle Bolt", "sku": "TGB-08-90", "warehouse": "DEL-B", "stock": 120, "demand": 100 },
  
  { "id": "P-1023", "name": "Wood Screw", "sku": "WSC-08-75", "warehouse": "BLR-A", "stock": 400, "demand": 350 },
  { "id": "P-1024", "name": "Self Tapping Screw", "sku": "STS-06-40", "warehouse": "PNQ-C", "stock": 250, "demand": 300 },
  { "id": "P-1025", "name": "Concrete Anchor", "sku": "CAN-12-100", "warehouse": "DEL-B", "stock": 70, "demand": 85 },
  { "id": "P-1026", "name": "Rivet", "sku": "RVT-05-20", "warehouse": "BLR-A", "stock": 1000, "demand": 800 },
  { "id": "P-1027", "name": "Cotter Pin", "sku": "CTP-04-30", "warehouse": "PNQ-C", "stock": 500, "demand": 600 },
  { "id": "P-1028", "name": "Snap Ring", "sku": "SNR-15-50", "warehouse": "DEL-B", "stock": 180, "demand": 160 },
  
  { "id": "P-1029", "name": "Ball Bearing", "sku": "BBR-6201-25", "warehouse": "BLR-A", "stock": 45, "demand": 60 },
  { "id": "P-1030", "name": "Roller Bearing", "sku": "RBR-6202-30", "warehouse": "PNQ-C", "stock": 35, "demand": 40 },
  { "id": "P-1031", "name": "Thrust Bearing", "sku": "TBR-51100-15", "warehouse": "DEL-B", "stock": 20, "demand": 25 },
  { "id": "P-1032", "name": "Linear Bearing", "sku": "LBR-LM8UU-40", "warehouse": "BLR-A", "stock": 85, "demand": 70 }
];


// Sample warehouse data
export const warehouses: Warehouse[] = [
  { "code": "BLR-A", "name": "Warehouse A", "city": "Los Angeles", "country": "USA" },
  { "code": "PNQ-C", "name": "Warehouse C", "city": "New York", "country": "USA" },
  { "code": "DEL-B", "name": "Warehouse B", "city": "Chicago", "country": "USA" }
];