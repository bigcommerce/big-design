export interface Product {
  name: string;
  stock: number;
  category: string;
}

export const mockProducts: Product[] = [
  {
    name: 'Wine - Rioja Campo Viejo',
    stock: 5,
    category: 'Drink'
  },
  {
    name: 'Wine - Baron De Rothschild',
    stock: 17,
    category: 'Drink'
  },
  {
    name: 'Nut - Walnut, Pieces',
    stock: 0,
    category: 'Food'
  }
];
