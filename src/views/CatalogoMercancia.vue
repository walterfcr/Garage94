<template>
  <div class="contenido-wrap">
    <h1>Catálogo de {{ formatTitle($route.params.tipo) }}</h1>

    <div class="product-list" data-aos="fade-in">
      <div
        v-for="product in paginatedProducts"
        :key="product.id"
        class="product-card"
        @click="openModal(product)"
      >
        <img :src="product.image" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p>{{ formatPrice(product.price) }}</p>
      </div>
    </div>

    <div class="pagination">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
        Anterior
      </button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        Siguiente
      </button>
    </div>

    <AccesoriosModal
      v-if="isModalOpen"
      :product="selectedProduct"
      @close="closeModal"
      @add-to-cart="manejarAgregarCarrito"
    />

    <MercaSlider />
    <AppFooter />
  </div>
</template>

<script>
import { supabase } from '@/services/supabase.js'
import AccesoriosModal from '@/components/AccesoriosModal.vue'
import MercaSlider from '@/components/MercaSlider.vue'
import AppFooter from '@/components/AppFooter.vue'
import { formatPrice } from '@/utils/formatPrice.js'
import { cartService } from '@/services/cartService.js'

export default {
  name: 'CatalogoMercancia',
  components: { AccesoriosModal, MercaSlider, AppFooter },

  data() {
    return {
      accessoryProducts: [],
      currentPage: 1,
      itemsPerPage: 18,
      selectedProduct: null,
      isModalOpen: false,
    }
  },

  computed: {
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      return this.accessoryProducts.slice(start, start + this.itemsPerPage)
    },
    totalPages() {
      return Math.ceil(this.accessoryProducts.length / this.itemsPerPage)
    },
  },

  watch: {
    // Listens to URL shifts (e.g. switching tabs from Accessories to Collectibles)
    '$route.params.tipo': {
      immediate: true,
      async handler(nuevoTipo) {
        await this.cargarMercancia(nuevoTipo)
        this.goToPage(1)
      },
    },
    itemsPerPage() {
      this.goToPage(1)
    },
  },

  mounted() {
    this.setItemsPerPage()
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },

  methods: {
    formatPrice,
    async cargarMercancia(tipo) {
      // Formats parameters to match DB entries ("accesorios" -> "Accesorio", "coleccionables" -> "Coleccionables")
      let tipoBaseDatos = 'Accesorio'
      if (tipo.toLowerCase().includes('colec')) {
        tipoBaseDatos = 'Coleccionables'
      }

      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('type', tipoBaseDatos)

        if (error) throw error
        this.accessoryProducts = data || []
      } catch (error) {
        console.error('Error fetching merchandise:', error.message)
      }
    },
    formatTitle(tipo) {
      if (!tipo) return ''
      return tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase()
    },
    openModal(product) {
      this.selectedProduct = product
      this.isModalOpen = true
    },
    closeModal() {
      this.selectedProduct = null
      this.isModalOpen = false
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$router.replace({ query: { ...this.$route.query, page } })
        this.currentPage = page
        this.$nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
      }
    },

    manejarAgregarCarrito(item) {
      cartService.addToCart(item.product, item.selectedSize)
      console.log('¡Guardado en LocalStorage respetando las columnas de la DB!')
    },
    setItemsPerPage() {
      const w = window.innerWidth

      if (w >= 1800) {
        this.itemsPerPage = 24
      } else if (w >= 1680) {
        this.itemsPerPage = 28
      } else if (w >= 1440) {
        this.itemsPerPage = 24
      } else if (w >= 1366) {
        this.itemsPerPage = 24
      } else if (w >= 1280) {
        this.itemsPerPage = 20
      } else if (w >= 900) {
        this.itemsPerPage = 20
      } else if (w >= 600) {
        this.itemsPerPage = 24
      } else {
        this.itemsPerPage = 12
      }
    },
    handleResize() {
      this.setItemsPerPage()
    },
  },
}
</script>

<style scoped>
h1 {
  padding-top: 50px;
  text-align: center;
  color: var(--color-text-main) !important;
}
.product-card img {
  object-fit: cover;
}
</style>
