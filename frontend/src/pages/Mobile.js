// src/pages/Mobile.js
import React from 'react';
import ProductList from '../components/ProductList';
import { SummaryApi } from '../api/SummaryApi';// correct explicit import
import image1 from '../components/products/mobile/realme 9 Pro 5G (Midnight Black, 128 GB) (6 GB RAM) 1.webp';
import image2 from '../components/products/mobile/SAMSUNG Galaxy A03 (Black, 32 GB) (3 GB RAM) 3.webp';
import image3 from '../components/products/mobile/realme X7 Pro 5G (Fantasy, 128 GB) (8 GB RAM) 2.webp';
import image4 from '../components/products/mobile/SAMSUNG Galaxy M53 5G (Mystique Green, 128 GB) (8 GB RAM) 2.webp';

const mobileProducts = [
  { id: 'm-1', name: 'realme 9 Pro 5G ', price: 149900, mrp: 159900, rating: 4.8, offer: 'Save ₹10,000', image: image1 },
  { id: 'm-2', name: 'Samsung Galaxy S24 Ultra', price: 129999, mrp: 139999, rating: 4.6, offer: '₹8,000 OFF', image: image4 },
  { id: 'm-3', name: 'realme X7 Pro 5G',        price:  69999, mrp:  74999, rating: 4.5, offer: '₹5,000 OFF', image:image3},
   { id: 'm-4', name: 'SAMSUNG Galaxy A03 ',        price:  69999, mrp:  74999, rating: 4.5, offer: '₹5,000 OFF', image:image2},
];

export default function Mobile() {
  return (
    <ProductList
      title="Mobile Phones"
      products={mobileProducts}
      onAddToCart={(id) => SummaryApi.addToCart(id, 1)}
      onAddToWishlist={(id) => SummaryApi.addToWishlist ? SummaryApi.addToWishlist(id) : Promise.resolve()}
    />
  );
}
