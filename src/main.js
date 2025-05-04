import { createApp } from 'vue';  
import App from './App.vue'; 
import './assets/global.css';
import router from './router'; 
//import '@flaticon/flaticon-uicons/css/uicons-regular-chubby.css';

// AOS imports
import AOS from 'aos';
import 'aos/dist/aos.css';

// Create the Vue app
const app = createApp(App);

// Initialize AOS after mounting
app.use(router);
app.mount('#app');

// Start AOS animations
AOS.init();

// Optional: Refresh AOS on every route change
router.afterEach(() => {
  AOS.refresh();
});
