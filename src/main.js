import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index.js'
import moment from 'moment'
import 'moment/locale/id.js'
import store from '@/store/index.js'

const app = createApp(App)
moment.locale('id')
app.config.globalProperties.$moment = moment
app.use(router)
app.use(store)
app.mount('#app')
