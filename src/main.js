import Vue from 'vue'
import App from './docs/App.vue'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
