const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.requireAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select('_id name email role');
    if (!user) return res.status(401).json({ message: 'Unauthorized' });

    req.user = { id: user._id.toString(), email: user.email, role: user.role, name: user.name };
    next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
