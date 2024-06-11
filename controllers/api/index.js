const router = require('express').Router();
const userRoutes = require('./userRoutes');
const roleRoutes = require('./roleRoutes');
const serviceRoutes = require('./serviceRoutes');

router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/services', serviceRoutes);