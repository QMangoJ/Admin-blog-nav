const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

exports.index = async ctx => {
  ctx.set('Content-Type', 'application/json');
  const stream = await ctx.getFileStream();
  const filename = Math.random().toString(36).substr(2) + new Date().getTime() + path.basename(stream.filename).toLocaleLowerCase();
  const target = path.join(ctx.app.baseDir, '/app/public/img/', filename);
  // 生成图片资源地址存入数据库
  const url =
    'http://' + ctx.request.header.host + path.join('/public/img', filename);
  const writeStream = fs.createWriteStream(target);
  try {
    // 异步把文件流 写入
    await awaitWriteStream(stream.pipe(writeStream));
  } catch (err) {
    // 如果出现错误，关闭管道
    await sendToWormhole(stream);
    throw err;
  }
  console.log(url);
  ctx.body = {
    errNo: 0,
    errStr: 'success',
    data: {
      imgUrl: url,
    },
  };
};
