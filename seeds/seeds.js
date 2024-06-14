const sequelize = require('../config/connection');
const { User, Role, Service } = require('../models');
const bcrypt = require('bcrypt');

const userData = require('./userData.json');
const roleData = require('./roleData.json');
const serviceData = require('./serviceData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const saltRounds = 10;
    const hashedUserData = await Promise.all(
      userData.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        return { ...user, password: hashedPassword };
      })
    );

    const users = await User.bulkCreate(hashedUserData, {
      individualHooks: true,
      returning: true,
    });

    for (const serviceData of serviceData) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      await Service.create({ ...serviceData, user_id: randomUser.id });
    }

    for (const roleData of roleData) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      await Role.create({ ...roleData, user_id: randomUser.id });
    }

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDatabase();