<template>
  <div class="contenido-wrap">
    <h1>Catálogo de CDs Rock Progresivo</h1>

    <!-- product grid -->
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

    <!-- pagination -->
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

    <!-- SHARED MODAL -->
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
import { products } from '@/data/products.js';
import CdModal       from '@/components/CdModal.vue';
import BuscarGenero  from '@/components/BuscarGenero.vue';
import AppFooter     from '@/components/AppFooter.vue';

export default {
  name: 'CatalogoProgresivo',
  components: { CdModal, BuscarGenero, AppFooter },

  data() {
    return {
      cdProducts: [],
      currentPage: 1,
      itemsPerPage: 18,
      selectedProduct: null,
      isModalOpen: false,
    };
  },

  created() {
    /* page param */
    const page = parseInt(this.$route.query.page, 10);
    this.currentPage = !isNaN(page) && page > 0 ? page : 1;

    /* filter only Progresivo CDs */
    this.cdProducts = products
      .filter(p => p.genre === 'Rock Progresivo' && p.type !== 'Vinil')
      .map(({ id, name, price, image, ...rest }) => ({ id, name, price, image, ...rest }));
  },

  mounted() {
    /* responsive entries per page */
    this.setItemsPerPage();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },

  computed: {
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.cdProducts.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.cdProducts.length / this.itemsPerPage);
    },
  },

  methods: {
    /* modal */
    openModal(product) {
      this.selectedProduct = product;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedProduct = null;
    },

    /* pagination */
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$router.replace({ query: { ...this.$route.query, page } });
        this.currentPage = page;
        this.$nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
      }
    },

    /* responsive items per page */
    setItemsPerPage() {
      const w = window.innerWidth;
      if      (w >= 1800) this.itemsPerPage = 27;
      else if (w >= 1680) this.itemsPerPage = 24;
      else if (w >= 1400) this.itemsPerPage = 28;
      else if (w >= 1280) this.itemsPerPage = 24;
      else if (w >= 950 ) this.itemsPerPage = 20;
      else                this.itemsPerPage = 18;
    },
    handleResize() { this.setItemsPerPage(); },
  },

  watch: {
    itemsPerPage() { this.goToPage(1); },
  },
};
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
  opacity: 0.5; pointer-events: none; 
}
.contenido-wrap { 
  margin: 0; 
  padding: 50px 0 0; 
}
</style>
