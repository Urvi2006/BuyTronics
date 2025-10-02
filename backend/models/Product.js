const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true }, // must match frontend id
  name: { type: String, required: true },
  price: { type: Number, required: true },
  mrp: { type: Number, default: function() { return this.price; } },
  image: { type: String, default: '' }
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model('Product', productSchema);
