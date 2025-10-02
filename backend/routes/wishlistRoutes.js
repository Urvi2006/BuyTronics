// routes/wishlistRoutes.js
const express = require('express');
const { requireAuth } = require('../utils/auth');
const ctrl = require('../controllers/wishlistController');
const router = express.Router();

router.use(requireAuth);
router.get('/', ctrl.getWishlist);
router.post('/add', ctrl.add);
router.post('/remove', ctrl.remove);

module.exports = router;
