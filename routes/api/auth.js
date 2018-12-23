module.exports = (router) => {
  const authController = require('../../controllers/auth');
  router.post('/api/saveNewUser', authController.Register);
  router.post('/api/login', authController.Login);
  router.post('/api/authFromToken', authController.AuthFromToken);
  return router;
};
