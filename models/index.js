const Role = require("./Role");
const Service = require("./Service");
const User = require("./User");

// Role belongs to User
Role.belongsTo(User, {
  foreignKey: "role_id",
});

// User has many Roles 
User.hasMany(Role, {
  foreignKey: "user_id",
});

// Service belongs Users
Service.belongsTo(User, {
  foreignKey: "service_id",
});

// // User has many Services
// User.hasMany(Service, {
//   foreignKey: "user_id",
// });

module.exports = { Role, Service, User };