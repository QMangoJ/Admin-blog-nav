<template>
  <div class="admin">
    <v-nav class="vNav" />
    <div class="container">
      <transition name="slide-fade">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import vNav from '@/components/nav.vue';

export default {
  components: {
    vNav,
  },
};
</script>

<style lang="scss" scoped>
.admin {
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  background-color: rgb(41, 44, 53);
  .container {
    flex: auto;
    -webkit-box-flex: 1;
    padding: 10px;
    box-sizing: border-box;
    width: calc(100% - 176px);
  }
}
.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-leave-active {
  transition: all 0s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
