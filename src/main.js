import { createApp } from 'vue';  // Importa createApp desde Vue
import App from './App.vue'; // El componente principal
import './assets/global.css';
import router from './router'; // Si estás utilizando Vue Router

// Usamos createApp para crear la aplicación y luego montarla
createApp(App)
  .use(router)  // Si estás usando Vue Router, puedes usar .use(router) para integrarlo
  .mount('#app');