"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { addToCart } from "@/app/actions/actions";
import Swal from "sweetalert2";
import { useCart } from "@/app/context/CartContext";
import { Product } from "../../../../types/products";

export default function ProductPageComponent({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { updateCart } = useCart();

  const handleAddToCart = async () => {
    if (!selectedSize) {
      Swal.fire({
        icon: "error",
        title: "Please select a size",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      // Create a new product object with the selected size
      const productWithSize = {
        ...product,
        selectedSize
      };

      // Add to cart
      addToCart(productWithSize);
      
      // Update cart state
      updateCart();
      
      Swal.fire({
        icon: "success",
        title: "Added to cart!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to add to cart",
        text: "Please try again later",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row gap-8"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1"
        >
          {product.image && (
            <Image
              src={urlFor(product.image).url()}
              alt={product.productName}
              width={500}
              height={500}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex-1 space-y-4"
        >
          <h1 className="text-3xl font-bold">{product.productName}</h1>
          <p className="text-xl font-semibold">${product.price}</p>
          <p className="text-gray-600">{product.description}</p>

          <div className="space-y-2">
            <h3 className="font-semibold">Select Size:</h3>
            <div className="flex gap-3 justify-center">
              {["S", "M", "L", "XL"].map((size) => (
                <motion.button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-medium transition-all duration-300 ${
                    selectedSize === size
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white ring-2 ring-offset-2 ring-purple-500"
                      : "bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 hover:border-purple-400"
                  }`}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -5, 5, -5, 0],
                    transition: {
                      rotate: {
                        duration: 0.4,
                        ease: "easeInOut"
                      }
                    }
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: selectedSize === size ? 1.05 : 1
                  }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300
                  }}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            className="relative w-full overflow-hidden bg-black text-white py-5 rounded-xl font-medium text-lg shadow-xl group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              type: "spring",
              stiffness: 500,
              damping: 25
            }}
            onClick={handleAddToCart}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600"
              initial={{ x: "100%", opacity: 0.5 }}
              whileHover={{ 
                x: "-100%",
                opacity: 1,
              }}
              transition={{
                x: {
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "linear"
                },
                opacity: {
                  duration: 0.2
                }
              }}
            />
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-20"
              style={{
                background: "radial-gradient(circle at center, white 0%, transparent 100%)"
              }}
              animate={{
                scale: [1, 1.5],
                opacity: [0, 0.2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            <motion.span 
              className="relative z-10 flex items-center justify-center gap-3 font-semibold tracking-wide"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Add to Cart
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </motion.svg>
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
