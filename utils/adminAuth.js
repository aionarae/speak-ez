const { User, Role } = require('../models');

const adminAuth = async (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    try {
      const user = await User.findByPk(req.session.user_id, {
        include: [{ model: Role }],
      });

      if (user.role.role_name === 'admin') {
        next();
      } else {
        res.redirect('/');
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

module.exports = adminAuth;