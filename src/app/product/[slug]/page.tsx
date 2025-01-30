"use client";

import { client } from "@/sanity/lib/client";
import { Product } from "../../../../types/products";
import { groq } from "next-sanity";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { addToCart } from "@/app/actions/actions";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

async function getProduct(slug: string): Promise<Product> {
  return client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
    _id,
    productName,
    _type,
    image,
    price,
    description
    }`,
    { slug }
  );
}

function ProductPageComponent({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const router = useRouter();
  const { updateCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) {
      Swal.fire({
        title: "Please Select Size",
        text: "You need to select a size before adding to cart",
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    // Add the product with selected size to cart
    const productWithSize = {
      ...product,
      selectedSize,
    };
    
    addToCart(productWithSize);
    updateCart(); // Update cart count and show popup
    
    // Optional: Show success message with cart navigation
    Swal.fire({
      title: "Added to Cart!",
      text: `${product.productName} (Size: ${selectedSize}) has been added to your cart`,
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Go to Cart",
      cancelButtonText: "Continue Shopping"
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/cart');
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-6 rounded-2xl shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="aspect-square flex justify-center items-center bg-gray-100 rounded-2xl">
          {product.image && (
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={urlFor(product.image).url()}
                alt={product.productName}
                width={500}
                height={500}
                className="rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105"
              />
            </motion.div>
          )}
        </div>
        <motion.div
          className="flex flex-col gap-8 bg-white p-6 rounded-2xl shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-gray-800">{product.productName}</h1>
          <p className="text-2xl font-sans text-gray-700">
            <span className="text-3xl font-bold text-blue-500">${product.price}</span>
          </p>
          <p className="text-lg text-gray-600">{product.description}</p>
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">Select Size</h2>
            <div className="flex gap-2">
              {["S", "M", "L", "XL"].map((size) => (
                <motion.button
                  key={size}
                  className={`border-2 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${
                    selectedSize === size 
                      ? "border-orange-500 bg-orange-500 text-white" 
                      : "border-gray-300 hover:border-orange-500 hover:bg-orange-50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>
          <motion.button
            className="animate-gradient text-white px-6 py-3 rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98, y: 1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.2,
              type: "spring",
              stiffness: 400,
              damping: 25
            }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default async function Productpage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  return <ProductPageComponent product={product} />;
}
