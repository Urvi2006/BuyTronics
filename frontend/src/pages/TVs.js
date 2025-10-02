import React from 'react';
import ProductList from '../components/ProductList';


import img2 from '../components/products/tv/tv2.webp';
import img3 from  '../components/products/tv/Mi 5A 100 cm (40 inch) Full HD LED Smart Android TV with Dolby Audio (2022 Model) 1.webp';
import img4 from '../components/products/tv/SAMSUNG Q Series 163 cm (65 inch) QLED Ultra HD (4K) Smart Tizen TV (65Q7FN) 1.webp';
import img6 from '../components/products/tv/Sansui 127 cm (50 inch) Ultra HD (4K) LED Smart Android TV with Dolby Audio and DTS (Mystique Black) (2021 Model) (JSW50ASUHD) 4.webp';
const tvProducts = [

  { id: 'tv-1', name: 'LG 65" OLED 4K',      price: 129990, mrp: 159990, rating: 4.7, offer: '18% OFF', image: img2 },
  { id: 'tv-2', name: 'Samsung 55" QLED 4K', price: 74990, mrp: 99990, rating: 4.5, offer: '25% OFF', image:  img4 },
  { id: 'tv-3', name: 'Mi 5A 100 cm (40 inch) Full HD LED',     price: 56990, mrp: 69990, rating: 4.3, offer: '19% OFF', image: img3 },
   { id: 'tv-4', name: 'Sansui 127 cm (50 inch) Ultra HD (4K)',      price: 129990, mrp: 159990, rating: 4.7, offer: '18% OFF', image: img6},
];

export default function TVs() {
  return <ProductList title="Televisions" products={tvProducts} />;
}
