<template>
  <div class="wrap">
    <el-card class="box-card">
      <div slot="header" class="card-head">导航列表</div>
      <div class="add">
        <el-button type="primary" size="small" @click="toAdd()">添加</el-button>
      </div>
      <el-table :data="typeData" style="width: 100%;borderTop:1px solid #EBEEF5" class="list-table">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="navTypeId" label="ID"></el-table-column>
        <el-table-column prop="navTypeName" label="导航类型名称"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="toEdit(scope.row)" type="text">编辑</el-button>
            <el-button @click="del(scope.row)" type="text" style="color:#f56c6c">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
      <el-form :model="formData" ref="formData" size="mini" label-width="100px">
        <el-form-item label="导航类型名称" prop="navTypeName">
          <el-input type="text" v-model="formData.navTypeName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" size="small" @click="cancel()">取 消</el-button>
          <el-button type="primary" size="small" @click="toChange()">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'typeManage',
  data() {
    return {
      typeData: [],
      dialogVisible: false,
      title: '添加',
      formData: {
        navTypeName: '',
      },
      navTypeId: 0,
    };
  },
  methods: {
    toAdd() {
      this.formData.navTypeName = '';
      this.dialogVisible = true;
      this.title = '添加';
    },
    toEdit(row) {
      this.dialogVisible = true;
      this.title = '编辑';
      this.navTypeId = row.navTypeId;
      this.formData.navTypeName = row.navTypeName;
    },
    edit() {
      this.$axios({
        method: 'get',
        url: '/navTypeEdit',
        params: {
          navTypeName: this.formData.navTypeName,
          navTypeId: this.navTypeId,
        },
      })
        .then(({ data }) => {
          this.getData();
          this.dialogVisible = false;
          this.msg(data.data, data.errStr);
          this.$refs.formData.resetFields();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    add() {
      // 添加
      this.$axios({
        method: 'get',
        url: '/navTypeAdd',
        params: this.formData,
      })
        .then(({ data }) => {
          console.log(data);
          this.getData();
          this.dialogVisible = false;
          this.msg(data.data, data.errStr);
          this.$refs.formData.resetFields();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    del(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$axios({
            method: 'get',
            url: '/navTypeDelete',
            params: { navTypeId: row.navTypeId },
          })
            .then(({ data }) => {
              this.msg(data.data, data.errStr);
              this.getData();
            })
            .catch((err) => {
              this.msg(err, 'warning');
            });
        })
        .catch(() => {
          this.msg('已取消删除', 'warning');
        });
    },
    cancel() {
      this.dialogVisible = false;
      this.$refs.formData.resetFields();
    },
    toChange() {
      if (this.title === '添加') {
        this.add();
      } else {
        this.edit();
      }
    },
    getData() {
      this.$axios.get('/navTypeList').then((res1) => {
        console.log(res1);
        this.typeData = res1.data.data;
      });
    },
    msg(message, type) {
      this.$message({
        message,
        type,
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  .add {
    margin-bottom: 20px;
  }
}
</style>
