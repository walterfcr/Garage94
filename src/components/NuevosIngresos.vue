<template>
  <div class="contenido-wrap">
    <h1>Nuevos Ingresos</h1>

    <div v-if="loading" class="loading-state">Descubriendo novedades...</div>

    <div v-else class="product-list" data-aos="fade-in">
      <div
        v-for="product in randomCds"
        :key="product.id"
        class="product-card"
        @click="openModal(product)"
      >
        <img :src="product.image" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p>{{ formatPrice(product.price) }}</p>
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
  name: 'NuevosIngresos',
  components: { CdModal },

  data() {
    return {
      randomCds: [],
      loading: true,
      selectedProduct: null,
      isModalOpen: false,
    }
  },

  async created() {
    await this.fetchRandomNewArrivals()
  },

  methods: {
    formatPrice,

    async fetchRandomNewArrivals() {
      this.loading = true
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('type', 'CD')
          .textSearch('id', '')

        const { data: cds, error: err } = await supabase
          .from('products')
          .select('*')
          .eq('type', 'CD')
          .limit(100)

        if (err) throw err
        if (cds) {
          this.randomCds = cds.sort(() => 0.5 - Math.random()).slice(0, 16)
        }
      } catch (err) {
        console.error('Error fetching new arrivals:', err.message)
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
h1 {
  text-align: center;
  color: var(--color-text-main);
}
h3 {
  font-size: 0.8rem;
  margin: 0.5rem 0 0;
}
.contenido-wrap {
  margin: 0;
  padding: 60px 0 100px;
  background: var(--color-surface);
}
.loading-state {
  text-align: center;
  padding: 40px;
  color: var(--color-text-muted);
}
</style>
