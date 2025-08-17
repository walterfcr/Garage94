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
  once: true, // animation happens only the first time
  duration: 1000, // optional: controls speed
});

// Refresh AOS on every route change so new components animate
router.afterEach(() => {
  setTimeout(() => {
    AOS.refreshHard();
  }, 500); // small delay lets Vue render before refreshing
});
