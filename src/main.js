import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io';


Vue.config.productionTip = false;

Vue.use(new VueSocketIO({
  connection: 'http://192.168.1.39:5000'
}));

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
