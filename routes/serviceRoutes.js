// routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} = require('../controllers/serviceController');

// Create a new service
router.post('/', createService);

// Get all services
router.get('/', getAllServices);

// Get a single service by ID
router.get('/:id', getServiceById);

// Update a service
router.put('/:id', updateService);

// Delete a service
router.delete('/:id', deleteService);

module.exports = router;