import Vue from 'vue'
import App from './App'
import router from './router'
import global from './js/global'

Vue.prototype.$global_msg = global

var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8088/api'
axios.defaults.withCredentials = true//每次请求携带相同session
Vue.prototype.$axios = axios
Vue.config.productionTip = false

/*router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
      if (global.username != '') {
        next()
      } else {
        next({path: '/login'})
      }
    } else {
      next()
    }
  }
)*/


/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  components: {App},
  template: '<App/>'
})


