// backend/routes/orderRoutes.js
const express = require('express');
const { requireAuth } = require('../utils/auth');
const ctrl = require('../controllers/orderController');

const router = express.Router();

// Public lookup by order number (optional)
router.get('/:orderNumber', ctrl.getOrderByNumber);

// Protected routes
router.use(requireAuth);
router.post('/', ctrl.createOrder);
router.get('/user/:email', ctrl.getMyOrdersByEmail);
router.patch('/:orderNumber/status', ctrl.updateOrderStatus);

module.exports = router;
