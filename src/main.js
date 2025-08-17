import { createApp } from 'vue';
import App from './App.vue';
import './assets/global.css';
import router from './router';

// AOS imports
import AOS from 'aos';
import 'aos/dist/aos.css';

const app = createApp(App);

app.use(router);

// Mount first
app.mount('#app');

// Initialize AOS after the app is mounted
AOS.init({
  once: true,
  duration: 400, // faster animation
  easing: 'ease-out', // optional: snappy easing
});

router.afterEach(() => {
  setTimeout(() => {
    AOS.refreshHard();
  }, 50); // minimal delay
});
