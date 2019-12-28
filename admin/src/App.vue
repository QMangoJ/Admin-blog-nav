<template>
  <div id="app">
    <v-head class="vHead" v-show="showHead" />
    <div class="content">
      <transition name="slide-fade">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import vHead from '@/components/header.vue';

export default {
  components: {
    vHead,
  },
  data() {
    return {
      showHead: true,
    };
  },
  methods: {
    handleScroll() {
      const top = document.scrollingElement.scrollTop;
      if (top > 50) {
        this.showHead = false;
      } else {
        this.showHead = true;
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll);
    });
  },
};
</script>


<style lang="scss" scoped>
#app {
  min-height: 100vh;
  width: 100%;
  color: #333333;
  .vHead {
    background-color: #fff;
    box-shadow: 0 1px 4px #ccc;
  }
  .content {
    padding-top: 60px;
    min-height: 100vh;
    width: 100%;
    background-color: rgb(20, 20, 20);
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
