'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../../../types/products';
import { getCartItems } from '../actions/actions';

interface CartContextType {
  cartCount: number;
  showCartPopup: boolean;
  setShowCartPopup: (show: boolean) => void;
  lastAddedItem: Product | null;
  updateCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  showCartPopup: false,
  setShowCartPopup: () => {},
  lastAddedItem: null,
  updateCart: () => {},
});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartCount, setCartCount] = useState(0);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<Product | null>(null);

  const updateCart = () => {
    const items = getCartItems();
    setCartCount(items.length);
    if (items.length > 0) {
      setLastAddedItem(items[items.length - 1]);
      setShowCartPopup(true);
      // Auto-hide popup after 3 seconds
      setTimeout(() => {
        setShowCartPopup(false);
      }, 3000);
    }
  };

  useEffect(() => {
    updateCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, showCartPopup, setShowCartPopup, lastAddedItem, updateCart }}>
      {children}
    </CartContext.Provider>
  );
}
