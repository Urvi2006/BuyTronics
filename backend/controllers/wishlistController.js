// controllers/wishlistController.js
const Wishlist = require('../models/Wishlist');

exports.getWishlist = async (req, res) => {
  const email = req.user?.email || req.query.email;
  if (!email) return res.status(400).json({ success: false, error: 'email required' });
  const wishlist = await Wishlist.findOne({ user_email: email });
  return res.json({ success: true, wishlist: wishlist || { user_email: email, items: [] } });
};

exports.add = async (req, res) => {
  const email = req.user?.email || req.body.user_email;
  const { product_id, product_name, product_image, price } = req.body;
  if (!email || !product_id || !product_name || price == null)
    return res.status(400).json({ success: false, error: 'missing fields' });

  let wishlist = await Wishlist.findOne({ user_email: email });
  if (!wishlist) wishlist = await Wishlist.create({ user_email: email, items: [] });

  const exists = wishlist.items.some(i => i.product_id === product_id);
  if (!exists) wishlist.items.push({ product_id, product_name, product_image, price });
  await wishlist.save();

  return res.json({ success: true, wishlist });
};

exports.remove = async (req, res) => {
  const email = req.user?.email || req.body.user_email;
  const { product_id } = req.body;
  if (!email || !product_id)
    return res.status(400).json({ success: false, error: 'missing fields' });

  const wishlist = await Wishlist.findOneAndUpdate(
    { user_email: email },
    { $pull: { items: { product_id } } },
    { new: true }
  );
  return res.json({ success: true, wishlist: wishlist || { user_email: email, items: [] } });
};
