import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

// Importando o arquivo CSS do Tailwind
import './assets/main.css';


createApp(App).use(router).mount('#app')
