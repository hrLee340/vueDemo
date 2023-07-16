import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import * as ElIcons from  '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)
for (const name in ElIcons) {
  app.component(name, (ElIcons)[name])
}

app.use(ElementPlus)
app.use(createPinia())
app.use(router)


app.mount('#app')
