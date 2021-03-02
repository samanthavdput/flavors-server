require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require('cors');

const session       = require('express-session');
const passport      = require('passport');

require('./configs/passport');

mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: [process.env.CORS_ALLOWED], // <== this will be the URL of our React app (it will be running on port 3000)
  })
);

app.use('/', (req, res, next) => {
  console.log(process.env.CORS_ALLOWED);
  next();
});

// Express View engine setup

// app.use(require('node-sass-middleware')({
//   src:  path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   sourceMap: true
// }));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


// ADD SESSION SETTINGS HERE:
app.use(session({
  secret:"ironducks jumping through the mountains",
  resave: true,
  saveUninitialized: true,
  cookie: {
    sameSite: 'none',
    httpOnly: true,
    maxAge: 60000
  }
}));


// USE passport.initialize() and passport.session() HERE:
app.use(passport.initialize());
app.use(passport.session());


// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


// ROUTES MIDDLEWARE STARTS HERE:
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/auth-routes'));
app.use('/api', require('./routes/flavorlist-routes'));
app.use('/api', require('./routes/cupcake-routes'));
app.use('/api', require('./routes/file-upload-routes'));

module.exports = app;
