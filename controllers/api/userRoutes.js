const router = require('express').Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
        });
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
}
);

// POST /api/users - Register a new user
router.post('/users', async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            res.status(200).json(newUser);
            
        });
        // Set up session variables here if needed
    } catch (error) {
        res.status(400).json(error);
    }
});

// POST users/login - Login a user
router.post('/login', async (req, res) => {

    console.log("this is the req.body")
    console.log(req.body)

    const { username, password } = req.body;

    try {
        const userData = await User.findOne({
            where: {
                username: username,
            },
        });

        console.log("this is the userData")
        console.log(userData)

        if (!userData) {
            res.status(400).json({ message: 'Login failed! Incorrect username or passwword!'});
            return;
        }
        // Add password check logic here
        const validPassword = password === userData.password;
        //const validPassword = userData.checkPassword(password);

        console.log("this is the validPassword")
        console.log(validPassword)

        if (!validPassword) {
            res.status(400).json({ message: 'Login failed! Incorrect password!' });
            return
        }

        // Set up session variables here
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
        res.json({ user: userData, message: 'You are now logged in!' });

        }
        );
    } catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
});

// POST or GET /api/users/logout - Logout a user
router.post('/logout', (req, res) => {
    // Destroy the session here
    res.json({ message: 'You have been logged out!' });
});

module.exports = router;