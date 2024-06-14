const sequelize = require('../config/connection');
const { User, Role, Service } = require('../models');

const userData = require('./userData.json');
const roleData = require('./roleData.json');
const serviceData = require('./serviceData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    let users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true
    });

    for (const service of serviceData) {
      await Service.create({
        ...service,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }

    for (const role of roleData) {
      await Role.create({
        ...role,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });
    }

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();