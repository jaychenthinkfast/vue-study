import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element3 from 'element3'
import 'element3/lib/theme-chalk/index.css'

const app = createApp(App)
app.use(store)
.use(router)
.use(Element3)

app.mount('#app')


