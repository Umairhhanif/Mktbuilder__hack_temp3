"use client"
import React, { useEffect, useState } from 'react'
import { Product } from '../../../types/products';
import { client } from '@/sanity/lib/client';
import { allproduct } from '@/sanity/lib/queries';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { addToCart } from '../actions/actions';
import Swal from 'sweetalert2';
import { useCart } from '../context/CartContext';

const SHOES = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const { updateCart } = useCart();

  useEffect(() => {
    async function fetchproduct() {
        const fetchedProduct : Product[] = await client.fetch(allproduct)
        setProduct(fetchedProduct);
    }
    fetchproduct();
  }, []);

const handleAddTocart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    addToCart(product);
    updateCart();
    
    Swal.fire({
        position : 'top-right',
        icon : 'success',
        title : `${product.productName} added to cart`,
        showConfirmButton : false,
        timer : 2000
    });
}

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
        <h1 className='text-2xl font-bold mb-6 text-center'>
            Our Latest Products
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center'>
            {product.map((product) => (
                <motion.div 
                    key={product._id} 
                    className='border rounded-lg shadow-md p-4 transition duration-200 hover:shadow-lg'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                >
                    <Link href={`/product/${product.slug.current}`} className="block">
                        {product.image && (
                            <Image
                                src={urlFor(product.image).url()}
                                alt="image"
                                width={200}
                                height={200}
                                className='w-full h-48 object-cover rounded-md'
                            />
                        )}
                        <h1 className='text-lg font-semibold mt-4 text-center'>
                            {product.productName}
                        </h1>
                        <p className='text-lg font-light mt-4 text-center'>
                            {product.description ? product.description.split(' ').slice(0, 10).join(' ') : ''}...
                        </p>
                        <p className='text-gray-500 mt-2 text-center'>
                            ${product.price}
                        </p>
                    </Link>
                    <div className='flex justify-center mt-4' onClick={(e) => e.stopPropagation()}>
                        <motion.button 
                            className='animate-gradient text-white py-2 px-6 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl'
                            onClick={(e) => handleAddTocart(e, product)}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98, y: 1 }}
                            transition={{ 
                                duration: 0.2,
                                type: "spring",
                                stiffness: 400,
                                damping: 25
                            }}
                        >
                            Add to Cart
                        </motion.button>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
  );
}

export default SHOES;
