import { createRouter, createWebHistory } from 'vue-router';
import CatalogoCDs from './views/CatalogoCDs.vue';
import CatalogoRopa from './views/CatalogoRopa.vue';
import CatalogoAccesorios from './views/CatalogoAccesorios.vue';
import PunkRock from './components/PunkRock.vue';
import HardCore from './components/HardCore.vue';
import MetalMusic from './components/MetalMusic.vue';
import SkaMusic from './components/SkaMusic.vue';
import HipHop from './components/HipHop.vue';
import GrungeMusic from './components/GrungeMusic.vue';
import RockAlternativo from './components/RockAlternativo.vue';
import RockProgresivo from './components/RockProgresivo.vue';
import ReggaeMusic from './components/ReggaeMusic.vue';

const routes = [
  { path: '/', name: 'home', component: CatalogoCDs },
  { path: '/ropa', name: 'ropa', component: CatalogoRopa },
  { path: '/accesorios', name: 'accesorios', component: CatalogoAccesorios },
  { path: '/punk-rock', name: 'punk-rock', component: PunkRock },
  { path: '/hard-core', name: 'hard-core', component: HardCore },
  { path: '/metal-music', name: 'metal-music', component: MetalMusic },
  { path: '/ska-music', name: 'ska-music', component: SkaMusic },
  { path: '/hip-hop', name: 'hip-hop', component: HipHop },
  { path: '/grunge-music', name: 'grunge-music', component: GrungeMusic },
  { path: '/rock-alternativo', name: 'rock-alternativo', component: RockAlternativo },
  { path: '/rock-progresivo', name: 'rock-progresivo', component: RockProgresivo },
  { path: '/reggae-music', name: 'reggae-music', component: ReggaeMusic },
  { path: '/cd/:id', name: 'cd-details', component: () => import('./views/CdDetails.vue') },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,

  // ✅ Scroll to top on route change
  /* eslint-disable */
  scrollBehavior(/*_to, _from, _savedPosition*/) {
    return { top: 0 };
  },
});

export default router;
