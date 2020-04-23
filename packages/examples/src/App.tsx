import React, { useState } from 'react';

import { mockProducts, Product } from './data';
import { ProductForm } from './ProductForm';
import { ProductList } from './ProductList';

export const App: React.FC = () => {
  const [products, setProducts] = useState(mockProducts);

  const handleNewProduct = (product: Product) => {
    setProducts((currentProducts) => [product, ...currentProducts]);
  };

  const handleOnDelete = (product: Product) => {
    setProducts((currentProducts) => currentProducts.filter((p) => p.name !== product.name));
  };

  return (
    <>
      <ProductForm onNewProduct={handleNewProduct} />
      <ProductList products={products} onDelete={handleOnDelete} />
    </>
  );
};
