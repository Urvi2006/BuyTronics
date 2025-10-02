// controllers/cartController.js
const Cart = require('../models/Cart');

exports.getCart = async (req, res) => {
  const email = req.user?.email || req.query.email;
  if (!email) return res.status(400).json({ success: false, error: 'email required' });
  const cart = await Cart.findOne({ user_email: email });
  return res.json({ success: true, cart: cart || { user_email: email, items: [] } });
};

exports.addItem = async (req, res) => {
  const email = req.user?.email || req.body.user_email;
  const { product_id, product_name, product_image, price, quantity = 1 } = req.body;
  if (!email || !product_id || !product_name || price == null)
    return res.status(400).json({ success: false, error: 'missing fields' });

  let cart = await Cart.findOne({ user_email: email });
  if (!cart) cart = await Cart.create({ user_email: email, items: [] });

  const idx = cart.items.findIndex(i => i.product_id === product_id);
  if (idx > -1) {
    cart.items[idx].quantity += Number(quantity || 1);
  } else {
    cart.items.push({ product_id, product_name, product_image, price, quantity });
  }
  await cart.save();
  return res.status(200).json({ success: true, cart });
};

exports.removeItem = async (req, res) => {
  const email = req.user?.email || req.body.user_email;
  const { product_id } = req.body;
  if (!email || !product_id)
    return res.status(400).json({ success: false, error: 'missing fields' });

  const cart = await Cart.findOneAndUpdate(
    { user_email: email },
    { $pull: { items: { product_id } } },
    { new: true }
  );
  return res.json({ success: true, cart: cart || { user_email: email, items: [] } });
};
