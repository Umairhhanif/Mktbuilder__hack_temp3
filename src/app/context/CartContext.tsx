'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../../../types/products';
import { getCartItems } from '../actions/actions';

interface CartContextType {
  cartCount: number;
  cartItems: CartItem[];
  showCartPopup: boolean;
  setShowCartPopup: (show: boolean) => void;
  lastAddedItem: Product | null;
  updateCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  cartItems: [],
  showCartPopup: false,
  setShowCartPopup: () => {},
  lastAddedItem: null,
  updateCart: () => {},
});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<Product | null>(null);

  const updateCart = () => {
    const items = getCartItems();
    setCartItems(items);
    // Update cart count based on total quantity of items
    const totalQuantity = items.reduce((total, item) => total + (item.quantity || 0), 0);
    setCartCount(totalQuantity);
    
    if (items.length > 0) {
      setLastAddedItem(items[items.length - 1]);
      setShowCartPopup(true);
      setTimeout(() => {
        setShowCartPopup(false);
      }, 3000);
    }
  };

  useEffect(() => {
    updateCart();
  }, []);

  return (
    <CartContext.Provider value={{ 
      cartCount, 
      cartItems,
      showCartPopup, 
      setShowCartPopup, 
      lastAddedItem, 
      updateCart 
    }}>
      {children}
    </CartContext.Provider>
  );
}
