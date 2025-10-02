// src/pages/Cart.js
import React, { useEffect, useState, useCallback } from 'react';
import { SummaryApi } from '../api/SummaryApi';
// If you have useCart context for count, keep it; else remove the import and related usage
import { useCart } from '../context/CartContext';

export default function Cart() {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({ items: [] });

  // If useCart is present, use refreshCartCount; otherwise no-op
  let refreshCartCount = async () => {};
  try {
    const hook = useCart?.();
    if (hook && typeof hook.refreshCartCount === 'function') {
      refreshCartCount = hook.refreshCartCount;
    }
  } catch {
    // ignore if context not available
  }

  // Normalize API items to a consistent UI shape
  const adaptItems = (arr = []) =>
    arr.map(i => {
      const name =
        i.product?.name ||
        i.name ||
        i.product_name ||
        i.title ||
        i.productId ||
        'Item';

      const qty = i.qty ?? i.quantity ?? i.count ?? 1;

      const price =
        i.product?.price ??
        i.price ??
        i.unitPrice ??
        0;

      return { name, qty, product: { name, price } };
    });

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await SummaryApi.getCart(); // raw JSON from your API
      // Accept { items: [...] } or { cart: { items: [...] } }
      const rawItems = data?.items || data?.cart?.items || [];
      setCart({ items: adaptItems(rawItems) });
      await refreshCartCount();
    } catch (e) {
      console.error(e);
      alert('Failed to load cart: ' + (e.message || 'Unknown error'));
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  }, [refreshCartCount]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <div className="container py-4">Loading cart...</div>;

  return (
    <div className="container py-4">
      <h2>Your Cart</h2>

      {(!cart.items || cart.items.length === 0) ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="list-group">
          {cart.items.map((it, idx) => (
            <div
              key={idx}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <div><strong>{it.product?.name || it.name}</strong></div>
                <div>Qty: {it.qty}</div>
                {typeof it.product?.price === 'number' && (
                  <div>Price: ₹{it.product.price}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
