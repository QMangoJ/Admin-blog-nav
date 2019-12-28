module.exports = app => {
  const { router, controller } = app;
  const con = controller.navTypeController;
  router.get('/navTypeList', con.list);
  router.get('/navTypeAdd', con.add);
  router.get('/navTypeEdit', con.edit);
  router.get('/navTypeDelete', con.delete);
};
