
import React from 'react';
import ProductList from '../components/ProductList';

import imgF1 from '../components/products/fridge/Godrej 215 L Direct Cool Single Door 4 Star Refrigerator with Base Drawer (Aqua Blue, RD UNO 2154 PTDI AQ BL) 2.webp';
import imgF2 from '../components/products/fridge/SAMSUNG 189 L Direct Cool Single Door 5 Star Refrigerator with Base Drawer with Digital Inverter (Camellia Purple, RR21C2H25CR-HL) 3 (1).webp';
import imgF3 from '../components/products/fridge/Whirlpool 190 L Direct Cool Single Door 4 Star Refrigerator (Sapphire Abyss, 205 IMPC PRM 4S INV Sapphire Abyss) 2.webp';

const fridgeProducts = [
  { id: 'f-1', name: 'Godrej 215 L Direct Cool Single Door 4 Star Refrigerator',       price: 109990, mrp: 129990, rating: 4.4, offer: '15% OFF',   image: imgF1 },
  { id: 'f-2', name: 'SAMSUNG 189 L Direct Cool Single Door 5 Star Refrigerator',    price: 134990, mrp: 149990, rating: 4.6, offer: '10% OFF',   image: imgF2 },
  { id: 'f-3', name: 'Whirlpool 190 L Direct Cool Single Door 4 Star Refrigerator',      price:  32990, mrp:  39990, rating: 4.2, offer: '₹7,000 OFF', image: imgF3 },
];

export default function Fridge() {
  return <ProductList title="Refrigerators" products={fridgeProducts} />;
}
