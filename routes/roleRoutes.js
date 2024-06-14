const router = require('express').Router();
const { Role } = require('../../models');

// POST /api/roles - Create a new role
router.post('/', async (req, res) => {
    try {
        const newRole = await Role.create(req.body);
        res.status(201).json(newRole);
    } catch (error) {
        res.status(400).json(error);
    }
});

// GET /api/roles - Retrieve all roles
router.get('/', async (req, res) => {
    try {
        const roles = await Role.findAll();
        res.json(roles);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET /api/roles/:id - Retrieve a single role by its ID
router.get('/:id', async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) {
            res.status(404).json({ message: 'No role found with this id!' });
            return;
        }
        res.json(role);
    } catch (error) {
        res.status(500).json(error);
    }
});

// PUT /api/roles/:id - Update a role by its ID
router.put('/:id', async (req, res) => {
    try {
        const [affectedRows] = await Role.update(req.body, {
            where: { id: req.params.id },
        });
        if (affectedRows > 0) {
            res.status(200).json({ message: 'Role updated successfully!' });
        } else {
            res.status(404).json({ message: 'Role not found!' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// DELETE /api/roles/:id - Delete a role by its ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Role.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(200).json({ message: 'Role deleted!' });
        } else {
            res.status(404).json({ message: 'Role not found!' });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;