const router = require('express').Router();
const { User } = require('../../models');

// POST /api/users - Register a new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create({
            // Assuming your User model has these fields
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        // Set up session variables here if needed
        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).json(error);
    }
});

// POST /api/users/login - Login a user
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (!user) {
            res.status(400).json({ message: 'Login failed! Check login credentials!' });
            return;
        }
        // Add password check logic here
        // Set up session variables here
        res.json({ user: user, message: 'You are now logged in!' });
    } catch (error) {
        res.status(500).json(error);
    }
});

// POST or GET /api/users/logout - Logout a user
router.post('/logout', (req, res) => {
    // Destroy the session here
    res.json({ message: 'You have been logged out!' });
});

module.exports = router;