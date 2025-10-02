// routes/cartRoutes.js
const express = require('express');
const { requireAuth } = require('../utils/auth');
const ctrl = require('../controllers/cartController');
const router = express.Router();

router.use(requireAuth);
router.get('/', ctrl.getCart);
router.post('/add', ctrl.addItem);
router.post('/remove', ctrl.removeItem);

module.exports = router;
