// controllers/serviceController.js
const { Service } = require('../models/service');

// Enhanced createService with better error logging and input validation placeholder
exports.createService = async (req, res) => {
  try {
    // Placeholder for input validation and sanitization
    // validateServiceInput(req.body);

    const newService = await Service.create(req.body);
    res.status(201).json(newService);
  } catch (error) {
    console.error('Failed to create service:', error.message); // Log the error message
    console.error(error.stack); // Log the stack trace for more detailed debugging information
    res.status(500).json({ error: 'Failed to create service', details: error.message });
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve services' });
  }
};

// Get a single service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ error: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve service' });
  }
};

// Update a service
exports.updateService = async (req, res) => {
  try {
    const [updatedRowsCount] = await Service.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedRowsCount === 1) {
      res.status(200).json({ message: 'Service updated successfully' });
    } else {
      res.status(404).json({ error: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update service' });
  }
};

// Delete a service
exports.deleteService = async (req, res) => {
  try {
    const deletedRowsCount = await Service.destroy({
      where: { id: req.params.id },
    });
    if (deletedRowsCount === 1) {
      res.status(200).json({ message: 'Service deleted successfully' });
    } else {
      res.status(404).json({ error: 'Service not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
};