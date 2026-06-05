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
      v-if="
        isModalOpen &&
        (selectedProduct.type === 'CD' || selectedProduct.type === 'vinyl')
      "
      :product="selectedProduct"
      @close="closeModal"
      @add-to-cart="manejarAgregarCarrito"
    />

    <RopaModal
      v-if="isModalOpen && selectedProduct.type === 'Clothing'"
      :product="selectedProduct"
      @close="closeModal"
      @add-to-cart="manejarAgregarCarrito"
    />

    <AccesoriosModal
      v-if="
        isModalOpen &&
        (selectedProduct.type === 'Accesorio' ||
          selectedProduct.type === 'Coleccionables')
      "
      :product="selectedProduct"
      @close="closeModal"
      @add-to-cart="manejarAgregarCarrito"
    />
  </div>
</template>

<script>
import { supabase } from '@/services/supabase.js'
import { formatPrice } from '@/utils/formatPrice.js'
import { cartService } from '@/services/cartService.js'
import CdModal from '@/components/CdModal.vue'
import RopaModal from '@/components/RopaModal.vue'
import AccesoriosModal from '@/components/AccesoriosModal.vue'

export default {
  name: 'ResultadosBusqueda',
  components: {
    CdModal,
    RopaModal,
    AccesoriosModal,
  },

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
      return this.$route.query.q || ''
    },
  },

  watch: {
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
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .or(`name.ilike.%${text}%,band.ilike.%${text}%`)
          .limit(40)

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
    manejarAgregarCarrito(item) {
      cartService.addToCart(item.product, item.selectedSize)
      console.log('¡Guardado en LocalStorage respetando las columnas de la DB!')
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
  color: var(--color-text-main);
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
