const router = require('express').Router();
const { Service } = require('../../models');

// POST /api/services - Create a new service
router.post('/', async (req, res) => {
    try {
        const newService = await Service.create(req.body);
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json(error);
    }
});

// GET /api/services - Retrieve all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.findAll();
        res.json(services);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET /api/services/:id - Retrieve a single service by its ID
router.get('/:id', async (req, res) => {
    try {
        const service = await Service.findByPk(req.params.id);
        if (!service) {
            res.status(404).json({ message: 'No service found with this id!' });
            return;
        }
        res.json(service);
    } catch (error) {
        res.status(500).json(error);
    }
});

// PUT /api/services/:id - Update a service by its ID
router.put('/:id', async (req, res) => {
    try {
        const [affectedRows] = await Service.update(req.body, {
            where: { id: req.params.id },
        });
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Service updated successfully!' });
        } else {
            res.status(404).json({ message: 'Service not found!' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE /api/services/:id - Delete a service by its ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Service.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(200).json({ message: 'Service deleted!' });
        } else {
            res.status(404).json({ message: 'Service not found!' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;