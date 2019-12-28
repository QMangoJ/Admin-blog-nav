const { Service } = require('egg');
const { ctx } = this;
class navService extends Service {
  // list
  async findNavList(params) {
    let { navTypeId } = params;
    let list;
    if (navTypeId >= 0) {
      list = await this.app.mysql.select('navList', { where: { navTypeId: navTypeId } });
    } else {
      list = await this.app.mysql.select('navList');
    }
    if (list.length > 1) {
      list.reverse();
    }
    return list;
  }
  // edit
  async editNav(params) {
    const { navName,
      navUrl,
      navDesc,
      imgUrl: img,
      navTypeId } = params;
    const row = {
      navName,
      navUrl,
      navDesc,
      imgUrl: img || '',
      navTypeId
    };
    const options = {
      where: {
        navId: params.navId,
      },
    };
    console.log(row);
    const result = await this.app.mysql.update('navList', row, options);
    return result.affectedRows === 1;
  }
  // 添加
  async addNav(params) {
    const result = await this.app.mysql.insert('navList', params);
    return result.affectedRows === 1;
  }
  // 删除
  async deleteNav(id) {
    const result = await this.app.mysql.delete('navList', { navId: id });
    return result.affectedRows === 1;
  }
}
module.exports = navService;
