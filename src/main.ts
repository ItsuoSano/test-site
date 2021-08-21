import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { store, key } from './vuex/index'
import 'balm-ui/dist/balm-ui.css'
// @ts-ignore
import BalmUi from 'balm-ui'
// @ts-ignore
import BalmUIPlus from 'balm-ui/dist/balm-ui-plus'

createApp(App)
  .use(router)
  .use(store, key)
  .use(BalmUi)
  .use(BalmUIPlus)
  .mount('#app')
