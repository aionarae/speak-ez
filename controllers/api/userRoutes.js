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
});

router.post('/signup', async (req, res) => {
    try {
        const { first_name, last_name, email, username, password } = req.body;
        const newUser = await User.create({
            first_name,
            last_name,
            email,
            username,
            password: await bcrypt.hash(password, 10),
        });

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.logged_in = true;
            res.redirect('/services');
        });
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const userData = await User.findOne({
            where: {
                username: username,
            },
        });

        if (!userData) {
            res.status(400).json({ message: 'Login failed! Incorrect username or password!' });
            return;
        }

        const validPassword = await bcrypt.compare(password, userData.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Login failed! Incorrect password!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.redirect('/services'); // Redirect to the services list page
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;