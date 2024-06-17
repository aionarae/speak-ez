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
router.get('/:id', withAuth, async (req, res) => {
  try {
    const serviceData = await Service.findByPk(req.params.id);
    if (!serviceData) {
      res.status(404).json({ message: 'No service found with that id!' });
      return;
    }
    res.status(200).json(serviceData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update a service
// router.put('/:id', updateService);
router.put('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Service.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a service
// router.delete('/:id', deleteService);
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const serviceData = await Service.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!serviceData) {
      res.status(404).json({ message: 'No service found with that id!' });
      return;
    }
    res.status(200).end();
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;