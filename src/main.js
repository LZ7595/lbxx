import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import router from "./router.js"
import { createPinia } from 'pinia'

const app =  createApp(App)
const pinia = createPinia()
app.use(router).use(pinia)
app.mount('#app')
