import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/services/supabase'
import PaginaPrincipal from './views/PaginaPrincipal.vue'
import CatalogoCds from '@/views/CatalogoCds.vue'
import CatalogoRopa from '@/views/CatalogoRopa.vue'
import EdicionesEspeciales from './components/EdicionesEspeciales.vue'
import CatalogoMercancia from '@/views/CatalogoMercancia.vue'
import LoginView from '@/views/LoginView.vue'
import AdminView from '@/views/AdminView.vue'
import ContactForm from './components/ContactForm.vue'
import AppNosotros from '@/components/AppNosotros.vue'
import ResultadosBusqueda from '@/views/ResultadosBusqueda.vue'

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
    component: EdicionesEspeciales,
  },
  { path: '/contacto', name: 'Contacto', component: ContactForm },
  {
    path: '/buscar',
    name: 'Buscar',
    component: ResultadosBusqueda,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/admin',
    component: AdminView,
    meta: { requiresAdmin: true },
  },
]

const router = createRouter({
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
      return false
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

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAdmin) {
    // 1. Verificamos la sesión activa
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      console.log('Guard: No hay usuario logueado')
      return next('/login')
    }

    // 2. Consultamos el perfil
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle() // 🌟 Cambiamos .single() por .maybeSingle() para evitar que un error rompa el flujo

    // 🔍 ESTOS LOGS TE VAN A DECIR EXACTAMENTE QUÉ PASA en la consola del navegador (F12)
    console.log('Guard - Usuario ID:', user.id)
    console.log('Guard - Perfil encontrado:', profile)
    if (error) console.error('Guard - Error de Supabase:', error)

    // 3. Validamos el rol seguro
    if (profile && profile.role === 'admin') {
      next() // Es admin, pasa
    } else {
      alert('Acceso denegado. Se requieren permisos de administrador.')
      next('/') // No es admin o no se encontró, al Home
    }
  } else {
    next()
  }
})

export default router
