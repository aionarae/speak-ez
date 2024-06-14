require('dotenv').config();
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 5432;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Import the service routes
const serviceRoutes = require('./routes/serviceRoutes');

// Mount the service routes
app.use('/services', serviceRoutes);

app.use(routes);

// Import models
const { Service, User, Role } = require('./models');

// Call the associate method on each model to set up associations
User.associate({ Service, Role });
Service.associate({ User });
Role.associate({ User });

// Sync the models with the database
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced successfully!');
    // Start the server after successful sync
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
  })
  .catch((err) => console.error('Error syncing database:', err));