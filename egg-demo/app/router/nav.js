module.exports = app => {
  // navList navAdd?id=123 navEdit?id=123 navDelete?id=123
  const { router, controller } = app;
  const con = controller.navController;
  router.get('/navList', con.list);
  router.get('/navAdd', con.add);
  router.get('/navEdit', con.edit);
  router.get('/navDelete', con.delete);
  router.post('/post',controller.post.index);
};
