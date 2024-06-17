// routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new service
// router.post('/', createService);

// Get all services
// router.get('/', getAllServices) ;
router.get('/', withAuth, async (req, res) => {
  try {
    const serviceData = await Service.findAll();
    res.status(200).json(serviceData);
  } catch (error) {
    res.status(500).json(error);
  }
});


// Get a single service by ID
// router.get('/:id', getServiceById);

// Update a service
// router.put('/:id', updateService);

// Delete a service
// router.delete('/:id', deleteService);

module.exports = router;