module.exports = app => {
  const { router, controller, middlewares } = app;
  router.get('/',controller.home.index);
  require('./router/nav')(app);
  require('./router/navType')(app);
};
