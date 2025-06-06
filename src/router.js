import { createRouter, createWebHistory } from 'vue-router';
import CatalogoCDs from './views/CatalogoCDs.vue';
import PunkRock from './components/PunkRock.vue';
import HardCore from './components/HardCore.vue';
import MetalMusic from './components/MetalMusic.vue';
import SkaMusic from './components/SkaMusic.vue';
import HipHop from './components/HipHop.vue';
import GrungeMusic from './components/GrungeMusic.vue';
import RockAlternativo from './components/RockAlternativo.vue';
import RockProgresivo from './components/RockProgresivo.vue';
import VinilCollection from './components/VinilCollection.vue';
import RopaPunk from './components/RopaPunk.vue';
import RopaMetal from './components/RopaMetal.vue';
import RopaGrunge from './components/RopaGrunge.vue';
import RopaMujer from './components/RopaMujer.vue';
import CatalogoAccesorios from './components/CatalogoAccesorios.vue';
import CatalogoColeccionables from './components/CatalogoColeccionables.vue';
import ContactForm from './components/ContactForm.vue';
import AppNosotros from '@/components/AppNosotros.vue';

const routes = [
  { path: '/', name: 'home', component: CatalogoCDs },
  { path: '/nosotros', name: 'Nosotros', component: AppNosotros,}, 
  { path: '/punk-rock', name: 'punk-rock', component: PunkRock },
  { path: '/hard-core', name: 'hard-core', component: HardCore },
  { path: '/metal-music', name: 'metal-music', component: MetalMusic },
  { path: '/ska-music', name: 'ska-music', component: SkaMusic },
  { path: '/hip-hop', name: 'hip-hop', component: HipHop },
  { path: '/grunge-music', name: 'grunge-music', component: GrungeMusic },
  { path: '/rock-alternativo', name: 'rock-alternativo', component: RockAlternativo },
  { path: '/rock-progresivo', name: 'rock-progresivo', component: RockProgresivo },
  { path: '/vinil-collection', name: 'vinil-collection', component: VinilCollection },
  { path: '/ropa-punk', name: 'ropa-punk', component: RopaPunk },
  { path: '/ropa-metal', name: 'ropa-metal', component: RopaMetal },
  { path: '/ropa-grunge', name: 'ropa-grunge', component: RopaGrunge },
  { path: '/ropa-mujer', name: 'ropa-mujer', component: RopaMujer },
  { path: '/catalogo-accesorios', name: 'catalogo-accesorios', component: CatalogoAccesorios },
  { path: '/articulos-coleccionables', name: 'articulos-coleccionables', component: CatalogoColeccionables },
  { path: '/ediciones-especiales', name: 'ediciones-especiales', component: VinilCollection },
  { path: '/contacto', name: 'Contacto', component: ContactForm },
  { path: '/cd/:id', name: 'cd-details', component: () => import('./views/CdDetails.vue') },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,

  // ✅ Scroll to top on route change
  /* eslint-disable */
scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
      return savedPosition;
    }

    if (from.name === 'cd-details' && sessionStorage.getItem('scrollTopBeforeModal')) {
      return false; // Prevent scroll, let component restore manually
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }

    return { top: 0 };
},
});

export default router;
