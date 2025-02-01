import React from 'react';
import { nikeProducts } from './card/data'; 
import Card from './card/Card';
import { useSearch } from '../context/SearchContext';

const ProductList = () => {
  const { searchQuery } = useSearch();

  // Filter products based on search query
  const filteredProducts = nikeProducts.filter(product => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      product.title.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.color.toLowerCase().includes(searchLower) ||
      (product.tags && Array.isArray(product.tags) && 
        product.tags.some(tag => tag?.toLowerCase().includes(searchLower)))
    );
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 pb-10 border-b-2">
      {filteredProducts.length === 0 ? (
        <div className="col-span-full text-center py-10">
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search criteria</p>
        </div>
      ) : (
        filteredProducts.map((product) => (
          <Card
            key={product.id}
            id={product.id.toString()}
            tags={product.tags}
            title={product.title}
            description={product.description}
            color={product.color}
            price={Number(product.price)}
            imagesUrls={product.imagesUrls}
          />
        ))
      )}
    </div>
  );
};

export default ProductList;