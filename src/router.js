import { createRouter, createWebHistory } from 'vue-router';  // Use Vue 3's router API
import CatalogoCDs from './views/CatalogoCDs.vue';  // Import your components
import CatalogoRopa from './views/CatalogoRopa.vue';
import CatalogoAccesorios from './views/CatalogoAccesorios.vue';
import PunkRock from './components/PunkRock.vue'; // Import the PunkRock component
import HardCore from './components/HardCore.vue';
import MetalMusic from './components/MetalMusic.vue';
import SkaMusic from './components/SkaMusic.vue';
import HipHop from './components/HipHop.vue';
import GrungeMusic from './components/GrungeMusic.vue';
import RockAlternativo from './components/RockAlternativo.vue';
import RockProgresivo from './components/RockProgresivo.vue';
import ReggaeMusic from './components/ReggaeMusic.vue';

// Define the routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: CatalogoCDs,
  },
  {
    path: '/ropa',
    name: 'ropa',
    component: CatalogoRopa,
  },
  {
    path: '/accesorios',
    name: 'accesorios',
    component: CatalogoAccesorios,
  },
  {
    path: '/punk-rock', // New route for PunkRock component
    name: 'punk-rock',
    component: PunkRock,
  },
  {
  path: '/hard-core', // New route for PunkRock component
  name: 'hard-core',
  component: HardCore,
  },
  {
    path: '/metal-music', // New route for PunkRock component
    name: 'metal-music',
    component: MetalMusic,
  },
  {
    path: '/ska-music', // New route for PunkRock component
    name: 'ska-music',
    component: SkaMusic,
  },
  {
    path: '/hip-hop', // New route for PunkRock component
    name: 'hip-hop',
    component: HipHop,
  },
  {
    path: '/grunge-music', // New route for PunkRock component
    name: 'grunge-music',
    component: GrungeMusic,
  },
  {
    path: '/rock-alternativo', // New route for PunkRock component
    name: 'rock-alternativo',
    component: RockAlternativo,
  },
  {
    path: '/rock-progresivo', // New route for PunkRock component
    name: 'rock-progresivo',
    component: RockProgresivo,
  },
  {
    path: '/reggae-music', // New route for PunkRock component
    name: 'reggae-music',
    component: ReggaeMusic,
  },
  {
    path: '/cd/:id',
    name: 'cd-details',
    component: () => import('./views/CdDetails.vue'),
  }
];

// Create and export the router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),  // Use the browser history mode
  routes,  // Pass in the routes
});

export default router;

