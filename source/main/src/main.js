import Vue from 'vue'
import { registerMicroApps, start } from 'qiankun';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  mounted() {
    registerMicroApps([
      {
        name: 'demo1',
        entry: '/demo1/',
        container: '#subapp',
        activeRule: '/sub1',
      },
      {
        name: 'demo2',
        entry: '/demo2/',
        // entry: '//live.cc/demo2/index.html',
        container: '#subapp',
        activeRule: '/sub2',
      },
    ]);

    start();

  }
}).$mount('#app');