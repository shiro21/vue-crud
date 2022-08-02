import { createApp } from 'vue'
import App from './App.vue'
import dayjs from '@/assets/js/dayjs'


const app = createApp(App)

app.config.globalProperties.$dayjs = dayjs

app.mount('#app')
