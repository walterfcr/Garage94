import { createRouter, createWebHistory } from 'vue-router'
import PaginaPrincipal from './views/PaginaPrincipal.vue'
import CatalogoCds from '@/views/CatalogoCds.vue'
import VinilCollection from './components/VinilCollection.vue'
import RopaPunk from './components/RopaPunk.vue'
import RopaMetal from './components/RopaMetal.vue'
import RopaGrunge from './components/RopaGrunge.vue'
import RopaMujer from './components/RopaMujer.vue'
import CatalogoAccesorios from './components/CatalogoAccesorios.vue'
import CatalogoColeccionables from './components/CatalogoColeccionables.vue'
import ContactForm from './components/ContactForm.vue'
import AppNosotros from '@/components/AppNosotros.vue'

const routes = [
  { path: '/', name: 'home', component: PaginaPrincipal },
  { path: '/nosotros', name: 'Nosotros', component: AppNosotros },
  {
    path: '/catalogo/:genre',
    name: 'CatalogoGeneros',
    component: CatalogoCds,
    props: true,
  },

  {
    path: '/vinil-collection',
    name: 'vinil-collection',
    component: VinilCollection,
  },
  { path: '/ropa-punk', name: 'ropa-punk', component: RopaPunk },
  { path: '/ropa-metal', name: 'ropa-metal', component: RopaMetal },
  { path: '/ropa-grunge', name: 'ropa-grunge', component: RopaGrunge },
  { path: '/ropa-mujer', name: 'ropa-mujer', component: RopaMujer },
  {
    path: '/catalogo-accesorios',
    name: 'catalogo-accesorios',
    component: CatalogoAccesorios,
  },
  {
    path: '/articulos-coleccionables',
    name: 'articulos-coleccionables',
    component: CatalogoColeccionables,
  },
  {
    path: '/ediciones-especiales',
    name: 'ediciones-especiales',
    component: VinilCollection,
  },
  { path: '/contacto', name: 'Contacto', component: ContactForm },
  {
    path: '/cd/:id',
    name: 'cd-details',
    component: () => import('./views/CdDetails.vue'),
  },
]

const router = createRouter({
  // FIX: Swap process.env for Vite's import.meta.env
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    if (
      from.name === 'cd-details' &&
      sessionStorage.getItem('scrollTopBeforeModal')
    ) {
      return false // Prevent scroll, let component restore manually
    }

    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }

    return { top: 0 }
  },
})

export default router
