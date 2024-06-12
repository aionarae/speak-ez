const router = require('express').Router();
const { User, Role, Service } = require('../models');
const withAuth = require('../utils/auth');

//add routes here

router.get('/', async (req, res) => {
  try {
    // Add any logic you need here

    res.render('homepage', {
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    // If user is logged in, rediret to 
    if (req.session.loggedIn) {
      res.redirect('/services');
      return;
    }

    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;