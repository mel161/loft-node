const express = require(`express`);
const path = require('path');
const session = require('express-session');

const router = require(`./router`);

const app = express();

app.use(session({
  secret: 'loftschool',
  key: 'key',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: null
  },
  saveUninitialized: false,
  resave: false
}));

app.use(express.static(`server/static`));

app.set('views', 'client/template/pages');
app.set('view engine', 'pug');

app.use(`/`, router);

app.get(`*`, (_, res) => {
  res.status(404);
  return res.render(`error`, {title: 404, message: 'Страница не найдена'});
});

const HOSTNAME = process.env.SERVER_HOST || `127.0.0.1`;
const PORT = process.env.SERVER_PORT || 3000;
const SERVER_INFO_MESSAGE = `Server running at http://${HOSTNAME}:${PORT}/`;

module.exports = {
  run() {
    app.listen(PORT, HOSTNAME, () => {
      console.log(SERVER_INFO_MESSAGE);
    });
  },
  app
};
