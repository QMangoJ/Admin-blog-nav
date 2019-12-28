<template>
  <div class="head">
    <div class="h2">
      <router-link to="/" class="logo">LOGO</router-link>
    </div>
    <div class="menu">
      <div class="menu-item">
        <router-link to="/navFront">导航前台</router-link>
      </div>
      <div class="menu-item">
        <router-link to="/navAdmin/navList">导航后台</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vHeader',
};
</script>

<style lang="scss" scoped>
.head {
  font-size: 20px;
  color: rgb(57, 130, 247);
  padding: 0 10px;
  position: fixed;
  width: 100%;
  height: 60px;
  line-height: 60px;
  z-index: 2000;
  .h2 {
    float: left;
    margin-left: 40px;
    .logo {
      color: #2077ff;
      font-size: 24px;
    }
  }
  .menu {
    float: right;
    display: flex;
    flex-direction: row;
    margin-right: 40px;
    .menu-item {
      margin: 0 10px;
      cursor: pointer;
      position: relative;
      & > a {
        transition: all 0.3s ease;
        display: inline-block;
        color: #3b3a3a;
        font-size: 14px;
        &::after {
          content: "";
          position: absolute;
          width: 0;
          bottom: 2px;
          left: 0px;
          height: 2px;
          transition: all 0.3s ease;
          background-color: #73b0ff;
        }
      }
      &:hover {
        a {
          color: #73b0ff;
          &::after {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
