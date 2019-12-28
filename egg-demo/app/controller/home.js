exports.index = async ctx => {
  ctx.set('Content-Type', 'application/json');
  ctx.body = {
    errNo: 0,
    errStr: 'success',
    data: {
      name: '我是home',
    },
  };
  ctx.status = 200;
};
//  do for testing