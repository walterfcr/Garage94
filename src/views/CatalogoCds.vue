<template>
  <div class="contenido-wrap">
    <h1>Catálogo de CDs {{ currentGenreDisplay }}</h1>

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
    />

    <BuscarGenero />
    <AppFooter />
  </div>
</template>

<script>
import { supabase } from '@/services/supabase.js'
import CdModal from '@/components/CdModal.vue'
import BuscarGenero from '@/components/BuscarGenero.vue'
import AppFooter from '@/components/AppFooter.vue'
import { formatPrice } from '@/utils/formatPrice.js'

export default {
  name: 'CatalogoCds',
  components: { CdModal, BuscarGenero, AppFooter },

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
    // Detects genre from URL path parameter
    currentGenreDisplay() {
      return this.$route.params.genre || 'Música'
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
    // Read page parameter from query URL
    const page = parseInt(this.$route.query.page, 10)
    this.currentPage = !isNaN(page) && page > 0 ? page : 1

    // Fetch data from Supabase
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
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('genre', this.currentGenreDisplay) // Restoring the genre check
          .neq('type', 'Vinil')

        if (error) throw error
        console.log('Client Target URL:', supabase.supabaseUrl)
        // 1. Check if the database is giving your app ANY records at all
        console.log('1. Total rows in database table:', data)

        // 2. See what the URL parameter currently evaluates to
        console.log(
          '2. The current genre your URL is looking for:',
          this.currentGenreDisplay,
        )

        // Filter down to match your route
        const filtered = data.filter(
          (p) => p.genre === this.currentGenreDisplay && p.type !== 'Vinil',
        )
        console.log('3. Rows matching after filtering:', filtered)

        console.log('Supabase filtered data:', data)
        this.cdProducts = data.map((p) => ({
          id: p.id,
          name: p.name,
          band: p.band,
          genre: p.genre,
          genreDescription: p.genre_description, // mapped
          label: p.label,
          numDiscs: p.num_discs, // mapped
          releaseDate: p.release_date, // mapped
          type: p.type,
          itemNumber: p.item_number, // mapped
          image: p.image,
          description: p.description,
          price: p.price,
        }))
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

    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$router.replace({ query: { ...this.$route.query, page } })
        this.currentPage = page
        this.$nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
      }
    },

    setItemsPerPage() {
      const w = window.innerWidth
      if (w >= 1800) this.itemsPerPage = 27
      else if (w >= 1680) this.itemsPerPage = 24
      else if (w >= 1400) this.itemsPerPage = 28
      else if (w >= 1280) this.itemsPerPage = 24
      else if (w >= 950) this.itemsPerPage = 20
      else this.itemsPerPage = 18
    },
    handleResize() {
      this.setItemsPerPage()
    },
  },

  watch: {
    // CRITICAL: If the user navigates from Punk to Hardcore,
    // fetch new data without refreshing the page!
    '$route.params.genre': {
      async handler() {
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
  color: var(--color-text-dark);
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
.loading-state,
.empty-state {
  text-align: center;
  padding: 40px;
  color: var(--color-text-muted);
}
</style>
