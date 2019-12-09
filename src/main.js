import Vue from 'vue'
import App from './docs/App.vue'
import plugin from './plugin'

Vue.config.productionTip = false

Vue.use(plugin)

new Vue({
  render: (h) => h(App)
}).$mount('#app')
