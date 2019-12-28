import Vue from 'vue';
import ElementUI from 'element-ui';
import Menu from 'ant-design-vue/lib/menu';
import Button from 'ant-design-vue/lib/button';
import Icon from 'ant-design-vue/lib/icon';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import 'element-ui/lib/theme-chalk/index.css';
import './reset.css';
import 'ant-design-vue/dist/antd.css';
import 'ant-design-vue/lib/menu/style/css';
import 'ant-design-vue/lib/button/style/css';
import 'ant-design-vue/lib/icon/style/css';

Vue.config.productionTip = false;
Vue.use(Menu);
Vue.use(Button);
Vue.use(Icon);
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
