import React from 'react';
import ProductList from '../components/ProductList';

import image1 from '../components/products/watches/boAt TRebel Blaze 3.webp';
import image3 from '../components/products/watches/boAt Storm 1.webp';
import image4 from '../components/products/watches/boAt Storm Call 1.webp';
import image2 from '../components/products/watches/boAt Storm Call 4.webp';
import image5 from '../components/products/watches/boAt TRebel Blaze 4.webp';
import image6 from '../components/products/watches/boAt Storm Pro Call 2.webp';

const watchProducts = [
  { id: 'w-2', name: 'boAt Strom Watch6', price: 29990, mrp: 34990, rating: 4.4, offer: '₹5,000 OFF', image:image3 },
  { id: 'w-4', name: 'boAt Trivel Blaze', price: 18999, mrp: 22999, rating: 4.1, offer: 'Save ₹4,000', image: image2 },
   
  { id: 'w-1', name: 'Apple Watch Series 9', price: 41990, mrp: 45990, rating: 4.6, offer: '₹4,000 OFF', image: image1},
  { id: 'w-5', name: 'boAt latest edition', price: 35990, mrp: 40990, rating: 4.8, offer: '₹5,000 OFF', image:image5 },
  { id: 'w-3', name: 'Fitbit Versa 4', price: 18999, mrp: 22999, rating: 4.1, offer: 'Save ₹4,000', image: image4 },
   { id: 'w-6', name: 'boAt rokerz', price: 999, mrp: 1999, rating: 4.1, offer: 'Save ₹4,000', image: image6 },
   
];

export default function Watch() {
  return <ProductList title="Smart Watches" products={watchProducts} />;
}
