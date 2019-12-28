<template>
  <div class="wrap">
    <h1>你的书签，我做主 ～ 😊😊</h1>
    <!-- <img src="../../assets/logo.png" /> -->
    <div class="login">
      <!-- <el-form
        :model="loginForm"
        ref="loginForm"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-container"
      >
        <h3 class="title">请登录</h3>
        <el-form-item>
          <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号" />
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            v-model="loginForm.checkPass"
            auto-complete="off"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button
            type="primary"
            style="width:100%;"
            @click.native.prevent="handleSubmit2"
            :loading="logining"
          >登录</el-button>
        </el-form-item>
      </el-form>-->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'login',
  data() {
    return {
      loginForm: {},
    };
  },
};
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  h1 {
    text-align: center;
    margin-top: 40px;
  }
  .login {
    width: 400px;
    margin: 0 auto;
    text-align: center;
  }
}
</style>
