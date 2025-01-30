import React from 'react';
import { nikeProducts } from './card/data'; 
import Card from './card/Card';

const ProductList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 pb-10 border-b-2">
      {nikeProducts.map((product) => (
        <Card
          key={product.id}
          _id={product.id}
          tags={product.tags}
          title={product.title}
          description={product.description}
          color={product.color}
          price={product.price}
          imagesUrls={product.imagesUrls}
        />
      ))}
    </div>
  );
};

export default ProductList;