<template>
  <div class="contenido-wrap">
    <h1>Catálogo de Accesorios</h1>

    <!-- lista de productos -->
    <div class="product-list" data-aos="zoom-in">
      <div
        v-for="product in paginatedProducts"
        :key="product.id"
        class="product-card"
        @click="openModal(product)"
      >
        <img :src="product.image" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }}</p>
      </div>
    </div>

    <!-- paginación -->
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

    <!-- MODAL ACCESORIOS -->
    <AccesoriosModal
      v-if="isModalOpen"
      :product="selectedProduct"
      @close="closeModal"
    />

    <MercaSlider />
    <AppFooter />
  </div>
</template>

<script>
import { products } from '@/data/products.js';
import AccesoriosModal from '@/components/AccesoriosModal.vue';
import MercaSlider from '@/components/MercaSlider.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
  name: 'CatalogoAccesorios',
  components: { AccesoriosModal, MercaSlider, AppFooter },

  data() {
    return {
      accessoryProducts: [],
      currentPage: 1,
      itemsPerPage: 18,
      selectedProduct: null,
      isModalOpen: false,
    };
  },

  created() {
    const page = parseInt(this.$route.query.page, 10);
    this.currentPage = !isNaN(page) && page > 0 ? page : 1;
    this.accessoryProducts = products.filter(p => p.type === 'Accesorio');
  },

  mounted() {
    this.setItemsPerPage();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },

  computed: {
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.accessoryProducts.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.accessoryProducts.length / this.itemsPerPage);
    },
  },

  methods: {
    openModal(product) {
      this.selectedProduct = product;
      this.isModalOpen = true;
    },
    closeModal() {
      this.selectedProduct = null;
      this.isModalOpen = false;
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$router.replace({ query: { ...this.$route.query, page } });
        this.currentPage = page;
        this.$nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
      }
    },
    setItemsPerPage() {
      const w = window.innerWidth;
      if      (w >= 1800) this.itemsPerPage = 27;
      else if (w >= 1680) this.itemsPerPage = 24;
      else if (w >= 1400) this.itemsPerPage = 28;
      else if (w >= 1280) this.itemsPerPage = 24;
      else if (w >= 950 ) this.itemsPerPage = 20;
      else                this.itemsPerPage = 18;
    },
    handleResize() {
      this.setItemsPerPage();
    },
  },

  watch: {
    itemsPerPage() {
      this.goToPage(1);
    },
  },
};
</script>


<style scoped>
/* reuse the same styles you already have */
h1 { text-align: center; color: var(--color-text-dark); }
.product-card img { object-fit: cover; }
</style>
