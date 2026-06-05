<template>
  <div class="wrap-especiales">
    <h1>Ediciones Especiales</h1>

    <div v-if="loading" class="loading-state">
      Cargando ediciones de colección...
    </div>

    <div v-else class="product-list">
      <div
        v-for="(product, index) in especiales"
        :key="product.id"
        class="product-card"
        data-aos="fade-in"
        :data-aos-delay="index * 100"
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
  name: 'EdicionesEspeciales',
  components: { CdModal },

  data() {
    return {
      especiales: [],
      loading: true,
      isModalOpen: false,
      selectedProduct: null,
    }
  },

  async created() {
    await this.fetchEspeciales()
  },

  methods: {
    formatPrice,

    async fetchEspeciales() {
      this.loading = true
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('type', 'Box-Set')
          .order('id', { ascending: true })

        if (error) throw error
        this.especiales = data || []
      } catch (err) {
        console.error('Error fetching especiales:', err.message)
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
  font-size: 2.2rem;
  margin-bottom: 2.5rem;
  font-family: 'Nova Square', sans-serif;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-text-main);
}
h3 {
  font-size: 0.8rem;
}
.wrap-especiales {
  background: var(--color-background-darker);
  margin: 0;
  padding: 50px 0 100px;
}
.loading-state {
  text-align: center;
  padding: 40px;
  color: var(--color-text-muted);
}
</style>
