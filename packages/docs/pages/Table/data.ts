interface Data {
  sku: string;
  name: string;
  price: number;
}

function createData(
  sku,
  name,
  price,
): Data {
  return { sku, name, price };
}

export const data: Data[] = [
  createData('SM13', '[Sample] Smith Journal 13', 25),
  createData('DPB', '[Sample] Dustpan & Brush', 34.95),
  createData('OFSUC', '[Sample] Utility Caddy', 45.95),
  createData('CLC', '[Sample] Canvas Laundry Cart', 200),
  createData('CGLD', '[Sample] Laundry Detergent', 29.95),
  createData('TWB', '[Sample] Tiered Wire Basket', 119.95),
  createData('OCG', '[Sample] Oak Cheese Grater', 34.95),
  createData('SLLPJ', '[Sample] 1 L Le Parfait Jar', 7),
  createData('CC3C', '[Sample] Chemex Coffeemaker 3 cup', 49.50),
  createData('ABS', '[Sample] Able Brewing System', 225),
  createData('OTS', '[Sample] Orbit Terrarium - Small', 89),
  createData('OTL', '[Sample] Orbit Terrarium - Large', 109),
  createData('SLCTBS', '[Sample] Fog Linen Chambray Towel - Beige Stripe with some fondu of some sort', 49),
];