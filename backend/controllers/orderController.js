// backend/controllers/orderController.js
const Order = require('../models/Orderr');

exports.createOrder = async (req, res) => {
  try {
    const payload = req.body;

    // Compute totals if missing
    if (!payload.subtotal && Array.isArray(payload.items)) {
      payload.subtotal = payload.items.reduce(
        (sum, it) => sum + (it.total ?? (Number(it.quantity || 0) * Number(it.price || 0))),
        0
      );
    }
    if (payload.shipping_cost == null) payload.shipping_cost = 0;
    if (!payload.total_amount) {
      payload.total_amount = Number(payload.subtotal || 0) + Number(payload.shipping_cost || 0);
    }

    const order = await Order.create(payload);
    return res.status(201).json({ success: true, order });
  } catch (err) {
    return res.status(400).json({ success: false, error: err.message });
  }
};

exports.getMyOrdersByEmail = async (req, res) => {
  try {
    const email = req.params.email || req.query.email;
    if (!email) return res.status(400).json({ success: false, error: 'email is required' });

    const orders = await Order.find({ user_email: email }).sort({ createdAt: -1 });
    return res.json({ success: true, orders });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.getOrderByNumber = async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const order = await Order.findOne({ order_number: orderNumber });
    if (!order) return res.status(404).json({ success: false, error: 'Order not found' });
    return res.json({ success: true, order });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const { status } = req.body;

    const allowed = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    const order = await Order.findOneAndUpdate(
      { order_number: orderNumber },
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ success: false, error: 'Order not found' });

    return res.json({ success: true, order });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
