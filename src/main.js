import Vue from 'vue'
import App from './App'
import axios from 'axios';
import router from './router';


Vue.config.productionTip = false;




// Initialize Axios globally
Vue.prototype.$http = axios;



new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app');
