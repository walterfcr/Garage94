<template>
  <div class="contenido-wrap search-results-page">
    <h1>Resultados para: "{{ searchQuery }}"</h1>

    <div v-if="loading" class="loading-state">
      Buscando en los pasillos de Garage94...
    </div>

    <div v-else-if="results.length === 0" class="no-results">
      <p>No encontramos coincidencias. ¡Intenta con otra banda o producto!</p>
    </div>

    <div v-else class="product-list" data-aos="fade-in">
      <div
        v-for="product in results"
        :key="product.id"
        class="product-card"
        @click="openModal(product)"
      >
        <span class="badge-tipo">{{ product.type }}</span>
        <div class="card-image-wrap">
          <img :src="product.image" :alt="product.name" />
        </div>
        <div class="card-info">
          <h3>{{ product.name }}</h3>
          <p>{{ formatPrice(product.price) }}</p>
        </div>
      </div>
    </div>

    <CdModal
      v-if="isModalOpen"
      :product="selectedProduct"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { supabase } from '@/services/supabase.js'
import CdModal from '@/components/CdModal.vue'
import { formatPrice } from '@/utils/formatPrice.js'

export default {
  name: 'ResultadosBusqueda',
  components: { CdModal },

  data() {
    return {
      results: [],
      loading: false,
      isModalOpen: false,
      selectedProduct: null,
    }
  },

  computed: {
    searchQuery() {
      // Captura el parámetro ?q= de la URL
      return this.$route.query.q || ''
    },
  },

  watch: {
    // Si el usuario escribe algo nuevo estando ya en la página de resultados,
    // el watch detecta el cambio en la URL y vuelve a buscar.
    searchQuery: {
      immediate: true,
      async handler(newQuery) {
        if (newQuery) {
          await this.performSearch(newQuery)
        }
      },
    },
  },

  methods: {
    formatPrice,

    async performSearch(text) {
      this.loading = true
      try {
        // 🔍 Buscamos coincidencias parciales en el nombre OR en la banda
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .or(`name.ilike.%${text}%,band.ilike.%${text}%`)
          .limit(40) // Limitamos a 40 para no saturar la pantalla

        if (error) throw error
        this.results = data || []
      } catch (err) {
        console.error('Error en la búsqueda:', err.message)
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
  },
}
</script>

<style scoped>
.search-results-page {
  padding: 50px 20px 100px;
  min-height: 60vh;
}
h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-text-dark);
}
.loading-state,
.no-results {
  text-align: center;
  padding: 60px;
  font-size: 1.2rem;
  color: var(--color-text-muted);
}
.badge-tipo {
  position: absolute;
  top: 12px;
  left: 12px;
  background: var(--color-accent);
  color: #ffffff;
  font-size: 0.65rem;
  font-family: 'Nova Square', sans-serif;
  text-transform: uppercase;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 6px;
  letter-spacing: 1px;
  z-index: 5;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}
</style>
