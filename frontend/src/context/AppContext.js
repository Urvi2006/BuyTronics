import React, { createContext, useContext, useEffect, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  cart: [],
  wishlist: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const item = action.payload;
      const idx = state.cart.findIndex(i => i.product_id === item.product_id);
      let cart;
      if (idx > -1) {
        cart = state.cart.map((i, k) => k === idx ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i);
      } else {
        cart = [...state.cart, { ...item, quantity: item.quantity || 1 }];
      }
      return { ...state, cart };
    }
    case 'ADD_TO_WISHLIST': {
      const item = action.payload;
      if (state.wishlist.some(i => i.product_id === item.product_id)) return state;
      return { ...state, wishlist: [...state.wishlist, item] };
    }
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(i => i.product_id !== action.payload) };
    case 'REMOVE_FROM_WISHLIST':
      return { ...state, wishlist: state.wishlist.filter(i => i.product_id !== action.payload) };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'HYDRATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const LS_KEY = 'app_state_v1';

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'HYDRATE', payload: parsed });
      }
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
