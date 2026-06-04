<template>
  <div class="contenido-wrap">
    <h1>Camisetas {{ formatTitle($route.params.categoria) }}</h1>

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

    <MercaSlider variant="dark" />
    <AppFooter />

    <RopaModal
      v-if="isModalOpen"
      :product="selectedProduct"
      @close="closeModal"
      @add-to-cart="manejarAgregarCarrito"
    />
  </div>
</template>

<script>
import { supabase } from '@/services/supabase.js'
import MercaSlider from '@/components/MercaSlider.vue'
import AppFooter from '@/components/AppFooter.vue'
import RopaModal from '@/components/RopaModal.vue'
import { formatPrice } from '@/utils/formatPrice.js'
import { cartService } from '@/services/cartService.js'

export default {
  name: 'CatalogoRopa',
  components: {
    MercaSlider,
    AppFooter,
    RopaModal,
  },
  data() {
    return {
      ropaProducts: [],
      currentPage: 1,
      itemsPerPage: 18,
      selectedProduct: null,
      isModalOpen: false,
    }
  },
  computed: {
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.ropaProducts.slice(start, end)
    },
    totalPages() {
      return Math.ceil(this.ropaProducts.length / this.itemsPerPage)
    },
  },
  watch: {
    '$route.params.categoria': {
      immediate: true,
      async handler(nuevaCategoria) {
        await this.filtrarProductos(nuevaCategoria)
        this.goToPage(1) // Reinicia a la página 1 después de que carguen los productos nuevos
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
    async filtrarProductos(categoria) {
      // Normaliza el parámetro de la URL (ej. "grunge" -> "Grunge")
      const catFormateada =
        categoria.charAt(0).toUpperCase() + categoria.slice(1).toLowerCase()

      try {
        // 📊 Hacemos la consulta en tiempo real a Supabase
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('type', 'Clothing')
          .eq('category', catFormateada)

        if (error) throw error

        // Guardamos las camisetas que vinieron de la base de datos
        this.ropaProducts = data || []
      } catch (error) {
        console.error('Error al traer la ropa de Supabase:', error.message)
      }
    },
    formatTitle(text) {
      if (!text) return ''
      return text.charAt(0).toUpperCase() + text.slice(1)
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$router.replace({ query: { ...this.$route.query, page } })
        this.currentPage = page
      }
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
    openModal(product) {
      this.selectedProduct = product
      this.isModalOpen = true
    },
    closeModal() {
      this.selectedProduct = null
      this.isModalOpen = false
    },
    manejarAgregarCarrito(item) {
      cartService.addToCart(item.product, item.selectedSize)
      console.log('¡Guardado en LocalStorage respetando las columnas de la DB!')
    },
  },
}
</script>

<style scoped>
/* Keeping your exact styles */
h1 {
  text-align: center;
  color: var(--color-text-main) !important;
}
h3 {
  font-size: 0.8rem;
  margin: 0.5rem 0 0;
}
button[disabled] {
  opacity: 0.5;
  pointer-events: none;
}
.contenido-wrap {
  margin: 0;
  padding: 50px 0 0;
}
.product-card {
  cursor: pointer;
  transition: transform 0.2s ease;
}
.product-card:hover {
  transform: scale(1.03);
}
</style>
