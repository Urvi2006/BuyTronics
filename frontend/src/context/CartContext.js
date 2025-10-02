import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext();
const LS_KEY = 'cart_v1';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems(prev => {
      const idx = prev.findIndex(p => p.product_id === product.product_id);
      if (idx > -1) {
        const copy = [...prev];
        copy[idx].quantity += quantity;
        return copy;
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (product_id) => {
    setItems(prev => prev.filter(p => p.product_id !== product_id));
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((sum, p) => sum + (p.price || 0) * (p.quantity || 1), 0),
    [items]
  );

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
