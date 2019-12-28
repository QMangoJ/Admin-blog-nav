exports.list = async ctx => {
  ctx.set('Content-Type', 'application/json');
  const params = ctx.query;
  console.log(params);
  const db = (await ctx.service.navService.findNavList(params)) || {};
  ctx.body = {
    errNo: 0,
    errStr: 'success',
    data: db,
  };
};
// 添加
exports.add = async ctx => {
  const params = ctx.query;
  const result = await ctx.service.navService.addNav(params);
  ctx.body = {
    errNo: result ? 0 : 1,
    errStr: result ? 'success' : 'error',
    data: result ? '添加成功！' : '添加失败',
  };
};
// 编辑
exports.edit = async ctx => {
  const params = ctx.query;
  const result = await ctx.service.navService.editNav(params);
  ctx.body = {
    errNo: result ? 0 : 1,
    errStr: result ? 'success' : 'error',
    data: result ? '编辑成功！' : '编辑失败',
  };
};
// 删除
exports.delete = async ctx => {
  const id = ctx.query.navId;
  const result = await ctx.service.navService.deleteNav(id);
  ctx.body = {
    errNo: result ? 0 : 1,
    errStr: result ? 'success' : 'error',
    data: result ? '删除成功！' : '删除失败',
  };
};