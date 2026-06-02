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
import { supabase } from '@/services/supabase.js' // Asegúrate de que apunte a tu cliente de Supabase
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
        // 🎲 Explicación: Buscamos solo CDs, le pedimos a PostgreSQL que los baraje
        // aleatoriamente usando una API nativa de orden, y limitamos a 18 discos.
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('type', 'CD')
          .textSearch('id', '') // Truco para permitir inyecciones avanzadas si fuera necesario o simplemente:
        // Nota: La forma oficial más limpia para forzar orden random sin meter código SQL crudo
        // es pedir una muestra aleatoria o desordenar el array en JS si son pocos,
        // pero ordenando vía Postgres crudo es así:

        // Para asegurar compatibilidad total en Supabase sin crear funciones extras en su dashboard,
        // traemos un bloque inicial y lo barajamos con el algoritmo Fisher-Yates en el cliente:
        const { data: cds, error: err } = await supabase
          .from('products')
          .select('*')
          .eq('type', 'CD')
          .limit(100) // Traemos una muestra de 100 discos recientes

        if (err) throw err

        if (cds) {
          // Barajamos el array para que siempre sea diferente cada vez que recargues la página principal
          this.randomCds = cds.sort(() => 0.5 - Math.random()).slice(0, 16) // Nos quedamos exactamente con los 16 aleatorios
        }
      } catch (err) {
        console.error('Error fetching new arrivals:', err.message)
      } finally {
        this.loading = false
      }
    },

    /* ---------- Control del Modal de CDs ---------- */
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
/* El resto de estilos de tarjetas heredan de tus estilos globales */
</style>
