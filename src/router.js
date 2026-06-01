import { createRouter, createWebHistory } from 'vue-router'
import PaginaPrincipal from './views/PaginaPrincipal.vue'
import CatalogoCds from '@/views/CatalogoCds.vue'
import CatalogoRopa from '@/views/CatalogoRopa.vue'
import VinilCollection from './components/VinilCollection.vue'
import CatalogoMercancia from '@/views/CatalogoMercancia.vue'
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
  {
    path: '/ropa/:categoria',
    name: 'CatalogoRopa',
    component: CatalogoRopa,
  },

  {
    path: '/mercancia/:tipo',
    name: 'CatalogoMercancia',
    component: CatalogoMercancia,
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
