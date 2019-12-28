<template>
  <div class="navlist">
    <el-card class="box-card">
      <div slot="header" class="card-head">导航列表</div>
      <div class="add">
        <el-button type="primary" size="small" @click="toAdd()">添加</el-button>
      </div>
      <el-radio-group v-model="navTypeId" @change="change" style="marginBottom:20px">
        <el-radio-button :label="-1">全部</el-radio-button>
        <el-radio-button
          v-for="(item,index) in typeList"
          :key="index"
          :label="item.navTypeId"
        >{{item.navTypeName}}</el-radio-button>
      </el-radio-group>
      <el-table
        :data="tableData"
        style="width: 100%;borderTop:1px solid #EBEEF5"
        class="list-table"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="navId" label="导航Id" width="80"></el-table-column>
        <el-table-column prop="navName" label="导航名称" width="120"></el-table-column>
        <el-table-column prop="navUrl" label="Url" width="180"></el-table-column>
        <el-table-column label="头像" width="100">
          <template slot-scope="scope">
            <img :src="scope.row.imgUrl" width="100%" />
          </template>
        </el-table-column>
        <el-table-column prop="navDesc" label="导航描述"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="toEdit(scope.row)" type="text">编辑</el-button>
            <el-button @click="del(scope.row)" type="text" style="color:#f56c6c">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- dialog -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="40%">
      <el-form :model="formData" ref="formData" size="mini" label-width="100px">
        <el-form-item label="导航名称" prop="navName">
          <el-input type="text" v-model="formData.navName"></el-input>
        </el-form-item>
        <el-form-item label="Url" prop="navUrl">
          <el-input type="text" v-model="formData.navUrl"></el-input>
        </el-form-item>
        <el-form-item label="书签类型">
          <el-select v-model="formData.navTypeId" placeholder="请选择书签类型">
            <el-option
              :label="item.navTypeName"
              :value="item.navTypeId"
              v-for="(item,index) in typeList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="头像">
          <el-upload
            ref="imgUpload"
            class="avatar-uploader"
            action="/post"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="导航描述" prop="navDesc">
          <el-input type="textarea" v-model="formData.navDesc"></el-input>
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
  name: 'navList',
  data() {
    return {
      radio1: '上海',
      tableData: [],
      typeList: [],
      navTypeId: -1,
      formData: {
        imgUrl: '',
        navDesc: '',
        navName: '',
        navUrl: '',
        navTypeId: 0,
      },
      imageUrl: '',
      dialogVisible: false,
      postData: {
        name: '',
      },
      navId: 0,
      title: '添加',
    };
  },
  methods: {
    change() {
      this.getData();
    },
    handleAvatarSuccess(res, file) {
      this.formData.imgUrl = res.data.imgUrl;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isLt2M;
    },
    toChange() {
      if (this.title === '添加') {
        this.add();
      } else {
        this.edit();
      }
    },
    toEdit(row) {
      this.dialogVisible = true;
      this.title = '编辑';
      this.navId = row.navId;
      this.imageUrl = row.imgUrl || '';
      this.formData = Object.assign({}, this.formData, row);
    },
    toAdd() {
      this.formData = {
        imgUrl: '',
        navDesc: '',
        navName: '',
        navUrl: '',
        navTypeId: 0,
      };
      this.imageUrl = '';
      this.dialogVisible = true;
      this.title = '添加';
    },
    edit() {
      this.$axios({
        method: 'get',
        url: '/navEdit',
        params: this.formData,
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
        url: '/navAdd',
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
    cancel() {
      this.dialogVisible = false;
      this.$refs.formData.resetFields();
      this.$refs.imgUpload.clearFiles();
      this.imageUrl = '';
    },
    del(row) {
      // 删除
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$axios({
            method: 'get',
            url: '/navDelete',
            params: { navId: row.navId },
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
    getData() {
      this.$axios({
        methods: 'get',
        url: '/navList',
        params: {
          navTypeId: this.navTypeId,
        },
      })
        .then((res) => {
          this.tableData = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // message
    msg(message, type) {
      this.$message({
        message,
        type,
      });
    },
  },
  mounted() {
    this.getData();
    this.$axios.get('/navTypeList').then((res1) => {
      this.typeList = res1.data.data;
    });
  },
};
</script>
<style lang="scss">
.navlist {
  .card-head {
    text-align: start;
  }
  .add {
    width: 60px;
    margin-bottom: 10px;
  }
  .list-table {
    border-radius: 6px;
    overflow: hidden;
    background-color: #fff;
    .ant-table {
      font-size: 12px;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
