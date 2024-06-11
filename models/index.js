const Role = require("./role");
const Service = require("./service");
const User = require("./user");

// Role belongs to User
Role.belongsTo(User, {
  foreignKey: "user_id",
});

// User has many Roles 
User.hasMany(Role, {
  foreignKey: "user_id",
});

// Service belongs Users
Service.belongsTo(User, {
  foreignKey: "user_id",
});

// // User has many Services
// User.hasMany(Service, {
//   foreignKey: "user_id",
// });

module.exports = { Role, Service, User };