// controllers/serviceController.js
const db = require('../models');

exports.getAllServices = async (req, res) => {
  try {
    const services = await db.Service.findAll();
    res.json({ services });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};
