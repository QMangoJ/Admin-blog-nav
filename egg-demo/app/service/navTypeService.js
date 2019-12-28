const { Service } = require('egg');
const { ctx } = this;
class navService extends Service {
  async findNavType() {
    let list = await this.app.mysql.select('navType');
    return list;
  }
  // edit
  async editType(params) {
    const row = {
      navTypeName: params.navTypeName,
    };
    const options = {
      where: {
        navTypeId: params.navTypeId,
      },
    };
    const result = await this.app.mysql.update('navType', row, options);
    return result.affectedRows === 1;
  }
  // 添加
  async addType(params) {
    const result = await this.app.mysql.insert('navType', params);
    return result.affectedRows === 1;
  }
  // 删除
  async deleteType(id) {
    const result = await this.app.mysql.delete('navType', { navTypeId: id });
    return result.affectedRows === 1;
  }
}
module.exports = navService;
