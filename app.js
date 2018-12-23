const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const cors = require('cors');

const authRouter = require('./routes/api/auth');
const newsRouter = require('./routes/api/news');
const permissionRouter = require('./routes/api/permission');
const userRouter = require('./routes/api/user');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

app.use(
  session({
    secret: 'loftschool-node',
    key: 'superkey',
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: null,
    },
    saveUninitialized: false,
    resave: false,
  })
);

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(authRouter(router));
app.use(newsRouter(router));
app.use(permissionRouter(router));
app.use(userRouter(router));

// Base Route
app.get('*', (req, res) => {
  res.status(200).sendFile('index.html', {root: path.join(__dirname, 'public')});
});

module.exports = app;
