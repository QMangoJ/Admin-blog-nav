import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/home/index.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('./views/login/index.vue'),
    },
    {
      path: '/navFront',
      name: 'navFront',
      component: () => import('./views/navFront/index.vue'),
    },
    {
      path: '/navAdmin',
      name: 'navAdmin',
      component: () => import('./views/navAdmin/index.vue'),
      children: [
        {
          path: 'navList',
          name: 'navList',
          component: () => import('./views/navAdmin/navManage/navList.vue'),
        },
        {
          path: 'typeList',
          name: 'typeList',
          component: () => import('./views/navAdmin/navManage/typeList.vue'),
        },
        {
          path: 'other',
          name: 'other',
          component: () => import('./views/navAdmin/navOther/index.vue'),
        },
      ],
    },
  ],
});
