// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './plugins/element.js'
import './plugins/VueQuillEditor.js'
import router from './router'
import store from "./store"
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'


Vue.use(VueCodeMirror)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
