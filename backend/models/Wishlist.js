// models/Wishlist.js
const mongoose = require('mongoose');

const WishlistItemSchema = new mongoose.Schema(
  {
    product_id: { type: String, required: true, unique: false },
    product_name: { type: String, required: true },
    product_image: String,
    price: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const WishlistSchema = new mongoose.Schema(
  {
    user_email: { type: String, required: true, unique: true, index: true },
    items: { type: [WishlistItemSchema], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Wishlist', WishlistSchema);
