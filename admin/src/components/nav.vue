<template>
  <div class="nav-wrap">
    <a-button
      type="primary"
      block
      @click="toggleCollapsed"
      style="margin-bottom:0px;background:transparent;border:none"
    >
      <a-icon :type="collapsed ? 'right' : 'left'" />
    </a-button>
    <a-menu
      class="a-menu"
      :defaultSelectedKeys="['1']"
      :defaultOpenKeys="['sub1']"
      mode="inline"
      theme="dark"
      :inlineCollapsed="collapsed"
    >
      <a-sub-menu key="sub1">
        <span slot="title">
          <a-icon type="appstore" />
          <span>导航管理</span>
        </span>
        <a-menu-item key="1">
          <router-link to="/navAdmin/navList">导航列表</router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/navAdmin/typeList">导航书签类型管理</router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: 'vNav',
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
  },
};
</script>

<style lang="scss">
.nav-wrap {
  margin-top: 10px;
  .a-menu {
    background: transparent;
    & > li > .ant-menu-sub {
      background: transparent;
      box-shadow: none;
      font-size: 12px;
    }
    & > li > ul > .ant-menu-item-selected {
      border-radius: 6px;
    }
  }
  .font {
    font-size: 24px;
    color: rgb(255, 255, 255);
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
