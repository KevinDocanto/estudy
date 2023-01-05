const express = require('express');
const expressSession = require('express-session');
const morgan = require('morgan');
const passport = require('./middlewares/authentication');
const path = require('path');
const db = require('./models');
const app = express();
const PORT = process.env.PORT || 8080;
const { io } = require('./utils/socket.js');
const swaggerFile = require('../swagger_output.json');
const swaggerUi = require('swagger-ui-express');

// this lets us parse 'application/json' content in http requests
app.use(express.json());

// setup passport and session cookies
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// add http request logging to help us debug and audit app use
const logFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(logFormat));

// this mounts controllers/index.js at the route `/api`
app.use('/api', require('./controllers'));

// this serves the documentation page at the route '/api-docs'
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// for production use, we serve the static react build folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  // all unknown routes should be handed to our react app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// update DB tables based on model updates. Does not handle renaming tables/columns
// NOTE: toggling this to true drops all tables (including data)
db.sequelize.sync({ force: false });
console.log('Starting server... before checking PORT');
// start up the server
if (PORT) {
  console.log('Starting server...');
  const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  io.attach(server, {
    cors: {
      origin: 'http://0.0.0.0:3000',
      methods: ['GET', 'POST'],
    },
  });
} else {
  console.log('===== ERROR ====\nCREATE A .env FILE!\n===== /ERROR ====');
}
