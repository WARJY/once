import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import once from '../once'
import '../once/style/index.css'

// import once from 'test-once'
// import 'test-once/style/index.css'

Vue.use(element)
Vue.use(once, {
  element: true
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
