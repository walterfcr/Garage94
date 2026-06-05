<template>
  <div class="contenido-wrap">
    <h1>Catálogo de {{ currentGenreDisplay }}</h1>

    <div v-if="loading" class="loading-state">Cargando productos...</div>

    <div v-else class="product-list" data-aos="fade-in">
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

    <div v-if="!loading && cdProducts.length === 0" class="empty-state">
      No se encontraron discos para este género.
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

    <CdModal
      v-if="isModalOpen"
      :product="selectedProduct"
      @close="closeModal"
      @add-to-cart="manejarAgregarCarrito"
    />

    <BuscarGenero v-if="!genreFromProp" />
    <AppFooter v-if="!genreFromProp" />
  </div>
</template>

<script>
import { supabase } from '@/services/supabase.js'
import CdModal from '@/components/CdModal.vue'
import BuscarGenero from '@/components/BuscarGenero.vue'
import AppFooter from '@/components/AppFooter.vue'
import { formatPrice } from '@/utils/formatPrice.js'
import { cartService } from '@/services/cartService.js'

export default {
  name: 'CatalogoCds',
  components: { CdModal, BuscarGenero, AppFooter },

  props: {
    genreFromProp: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      cdProducts: [],
      loading: true,
      currentPage: 1,
      itemsPerPage: 18,
      selectedProduct: null,
      isModalOpen: false,
    }
  },

  computed: {
    currentGenreDisplay() {
      const slug = this.genreFromProp || this.$route.params.genre || 'Música'
      if (slug.toLowerCase() === 'vinyl' || slug.toLowerCase() === 'vinilos') {
        return 'Vinilos'
      }
      return slug
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      return this.cdProducts.slice(start, start + this.itemsPerPage)
    },
    totalPages() {
      return Math.ceil(this.cdProducts.length / this.itemsPerPage)
    },
  },

  async created() {
    const page = parseInt(this.$route.query.page, 10)
    this.currentPage = !isNaN(page) && page > 0 ? page : 1

    await this.fetchProductsByGenre()
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

    async fetchProductsByGenre() {
      this.loading = true
      try {
        const categoriaUrl =
          this.genreFromProp || this.$route.params.genre || ''

        let query = supabase.from('products').select('*')

        if (
          categoriaUrl.toLowerCase() === 'vinyl' ||
          categoriaUrl.toLowerCase() === 'vinilos'
        ) {
          query = query.eq('type', 'vinyl')
        } else {
          const generoFormateado = categoriaUrl
            .split(' ')
            .map(
              (palabra) =>
                palabra.charAt(0).toUpperCase() +
                palabra.slice(1).toLowerCase(),
            )
            .join(' ')

          query = query.eq('genre', generoFormateado).eq('type', 'CD')
        }

        const { data, error } = await query
        if (error) throw error

        this.cdProducts = data || []
      } catch (err) {
        console.error('Error fetching data from Supabase:', err.message)
      } finally {
        this.loading = false
      }
    },
    openModal(product) {
      this.selectedProduct = product
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
      this.selectedProduct = null
    },

    manejarAgregarCarrito(item) {
      cartService.addToCart(item.product, item.selectedSize)
      console.log('¡Guardado en LocalStorage respetando las columnas de la DB!')
    },

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$router.replace({ query: { ...this.$route.query, page } })
        this.currentPage = page
        this.$nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
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
  },

  watch: {
    '$route.params.genre': {
      async handler() {
        if (this.genreFromProp) return

        this.currentPage = 1
        await this.fetchProductsByGenre()
      },
    },
    itemsPerPage() {
      this.goToPage(1)
    },
  },
}
</script>

<style scoped>
h1 {
  text-align: center;
  color: var(--color-text-main);
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
  background: var(--color-surface);
}
.loading-state,
.empty-state {
  text-align: center;
  padding: 40px;
  color: var(--color-text-muted);
}
</style>
