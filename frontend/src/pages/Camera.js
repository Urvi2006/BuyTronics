import React from 'react';
import ProductList from '../components/ProductList';


import canonEosR7 from '../components/products/camera/Canon EOS 1500D 24.1 Digital SLR Camera (Black) with EF S18-55 is II Lens 2.jpg';
import sonyA7IV from '../components/products/camera/GoPro HERO10 Action Camera with Free Swivel Clip, Digital, Battery & Shorty Tripod 2.jpg';
import fujiXT5 from '../components/products/camera/Sony Alpha ILCE-6400 24.2MP Mirrorless Digital SLR Camera Body (APS-C Sensor, Real-Time Eye Auto Focus, 4K Vlogging Camera, Tiltable LCD) - Black 1.jpg';

const cameraProducts = [
  { id: 'cam-1', name: 'Canon EOS R7', 
     price: 129990, mrp: 139990, rating: 4.6,
      offer: '₹10,000 OFF',
       image: canonEosR7 },
  { id: 'cam-2', name: 'Sony A7 IV',    price: 199990, mrp: 214990, rating: 4.7, offer: '₹15,000 OFF', image: sonyA7IV },
  { id: 'cam-3', name: 'Fujifilm X-T5', price: 149990, mrp: 159990, rating: 4.6, offer: '₹10,000 OFF', image: fujiXT5 },
  { id: 'cam-5', name: 'GoPro Hero10', price: 149990, mrp: 159990, rating: 4.6, offer: '₹10,000 OFF', image: fujiXT5 },

];

export default function Camera() {
  return <ProductList title="Cameras" products={cameraProducts} />;
}
