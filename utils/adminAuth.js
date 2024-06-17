const { User, Role } = require('../models');



const adminAuth = async (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {

    console.log ("I'm logged in as an admin")
    try {
      const user = await User.findByPk(req.session.user_id, {
        include: [{ model: Role }],
      });

      const role = await Role.findByPk(role.user_id, {
        include: [{ model: Role }],
      });

      console.log("User")
      console.log(user);

      console.log("User Role")
      console.log(role)

      if (role.user_id === user.id && role.role_name == 'admin') {
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