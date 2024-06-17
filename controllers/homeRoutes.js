const router = require('express').Router();
const { User, Role, Service } = require('../models');
const withAuth = require('../utils/auth');
const serviceData = require('../seeds/serviceData.json');

// Render the homepage
router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/admin', withAuth, async (req, res) => {

// Render the admin page
  try {
    if (req.session.logged_in) {
      const user = await User.findAll({
        where: {
          id: req.session.user_id,
        },
      
      });

      const role = await Role.findAll({
        where: {
          user_id: req.session.user_id,
        },
      });
      

      if (role.user_id === user.id && role[0].role_name == 'admin') {
        res.render('admin_page'); 
      } else {
        res.redirect('/login');
      }
    }
    

  } catch (error) {
    res.status(500).json(error);
  }
});

// Render the signup page
router.get('/signup', async (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the login page or redirect if already logged in
router.get('/login', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      res.redirect('/services');
      return;
    }
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Display all services
router.get('/services', withAuth, async (req, res) => {
  try {
    res.render('services_list', {
      services: serviceData,
      loggedIn: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Schedule a service
router.post('/schedule', withAuth, async (req, res) => {
  try {
    const { service, time } = req.body;

    // Parse the selected time
    const selectedTime = new Date(time);

    // Find the service by name
    const serviceData = await Service.findOne({ where: { name: service } });

    if (!serviceData) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }

    // Create a new scheduled service associated with the user
    await Service.create({
      name: serviceData.name,
      description: serviceData.description,
      price: serviceData.price,
      duration: serviceData.duration,
      date: selectedTime.toISOString().split('T')[0], // Extract the date portion
      time: selectedTime.toISOString().split('T')[1].slice(0, 8), // Extract the time portion
      status: 'pending',
      user_id: req.session.user_id,
    });

    res.redirect('/user-services');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Fetch and display all services scheduled by the user
router.get('/user-services', withAuth, async (req, res) => {
  try {
    const userServices = await Service.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    res.render('user_services_list', {
      userServices: userServices.map((service) => service.get({ plain: true })),
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
