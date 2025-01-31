"use client";
import React, { useEffect, useState } from "react";
import { Product, CartItem } from "../../../types/products";
import { getCartItems, removeFromCart, updateCartQuantity } from "../actions/actions";
import Swal from "sweetalert2";
import Image from "next/image";
import { urlForImage } from '../../../sanity/lib/image';
import { useRouter } from 'next/navigation';

const getImageUrl = (item: Product) => {
  if (item.imageUrl) return item.imageUrl;
  if (item.image?.asset?._ref) {
    try {
      return urlForImage(item.image).url();
    } catch (error) {
      console.error('Error generating Sanity image URL:', error);
    }
  }
  return '/placeholder-product.jpg';
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!"
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        setCartItems(getCartItems());
        Swal.fire("Removed!", "Your item has been removed.", "success");
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return;
    updateCartQuantity(id, quantity);
    setCartItems(getCartItems());
  };

  const handleIncrement = (id: string) => {
    const item = cartItems.find((item) => item._id === id);
    if (item) {
      handleQuantityChange(id, (item.quantity || 1) + 1);
    }
  };

  const handleDecrement = (id: string) => {
    const item = cartItems.find((item) => item._id === id);
    if (item && item.quantity > 1) {
      handleQuantityChange(id, item.quantity - 1);
    }
  };

  const calculatedTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = typeof item.price === 'number' ? item.price : 0;
      const quantity = typeof item.quantity === 'number' ? item.quantity : 1;
      return total + (price * quantity);
    }, 0);
  };

  const handledProceed = () => {
    if (cartItems.length === 0) {
      Swal.fire({
        title: "Cart is empty",
        text: "Please add items to your cart before proceeding to checkout.",
        icon: "warning",
      });
      return;
    }

    Swal.fire({
      title: "Proceed to checkout?",
      text: "Please review your cart before checking out.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!"
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/checkout');
      }
    });
  };

  return (
    <div className="min-h-screen bg-[url('/texture-bg.png')] bg-repeat">
      <style jsx global>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .checkout-btn {
          position: relative;
          overflow: hidden;
          background-size: 200% 200%;
          animation: gradientShift 5s ease infinite;
        }
        .checkout-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to right,
            transparent 0%,
            rgba(255, 255, 255, 0.2) 50%,
            transparent 100%
          );
          animation: shine 3s infinite;
        }
      `}</style>
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-white bg-opacity-90 rounded-2xl shadow-lg">
            <p className="text-gray-500 text-2xl">Your cart is empty</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-grow space-y-6">
              {cartItems.map((item) => (
                <div 
                  key={item._id} 
                  className="flex flex-col md:flex-row items-center p-6 bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 transition-transform hover:scale-[1.02]"
                >
                  <div className="relative w-40 h-40 bg-gray-50 rounded-xl">
                    <Image
                      src={getImageUrl(item)}
                      alt={item.productName}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain p-2"
                      priority
                    />
                  </div>
                  <div className="flex-1 md:ml-8 w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-2xl font-semibold mb-2 text-gray-900">{item.productName}</h3>
                        <p className="text-xl font-medium text-gray-700">${item.price.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex items-center space-x-6 w-full md:w-auto">
                        <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                          <button
                            onClick={() => handleDecrement(item._id)}
                            className="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            -
                          </button>
                          <span className="px-6 py-2 font-medium text-lg bg-white">{item.quantity}</span>
                          <button
                            onClick={() => handleIncrement(item._id)}
                            className="px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemove(item._id)}
                          className="text-gray-500 hover:text-red-600 transition-colors flex items-center group"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-2 group-hover:scale-110 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:w-[380px] shrink-0">
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-100 sticky top-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">${calculatedTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg text-green-600">
                    <span>Discount (3%)</span>
                    <span className="font-medium">-${(calculatedTotal() * 0.03).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-gray-900">Free</span>
                  </div>
                  <div className="h-px bg-gray-200 my-4"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <div className="text-right">
                      <span className="block text-2xl font-bold text-gray-900">
                        ${(calculatedTotal() * 0.97).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handledProceed}
                    className="checkout-btn w-full mt-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 text-white py-4 px-6 rounded-xl font-medium text-lg hover:from-gray-800 hover:via-gray-600 hover:to-gray-800 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-lg active:scale-95"
                  >
                    Continue to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;