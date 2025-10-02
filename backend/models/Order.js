// backend/models/Order.js
const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema(
  {
    product_id: { type: String, required: true },
    product_name: { type: String, required: true },
    product_image: { type: String },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const ShippingAddressSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address_line1: { type: String, required: true },
    address_line2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postal_code: { type: String, required: true },
    phone: { type: String, required: true }
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    user_email: { type: String, required: true, index: true },
    items: { type: [OrderItemSchema], required: true, validate: v => v.length > 0 },
    subtotal: { type: Number, default: 0, min: 0 },
    shipping_cost: { type: Number, default: 0, min: 0 },
    total_amount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    },
    shipping_address: { type: ShippingAddressSchema, required: true },
    payment_method: {
      type: String,
      enum: ['credit_card', 'debit_card', 'upi', 'net_banking', 'cash_on_delivery']
    },
    order_number: { type: String, unique: true, index: true }
  },
  { timestamps: true }
);

// Auto-generate order_number if not provided
OrderSchema.pre('save', function (next) {
  if (!this.order_number) {
    const date = new Date();
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
    this.order_number = `ORD-${y}${m}${d}-${rand}`;
  }
  next();
});

module.exports = mongoose.model('Order', OrderSchema);
