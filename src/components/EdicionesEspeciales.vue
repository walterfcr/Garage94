<template>
  <div class="wrap-especiales">
    <h1>Ediciones Especiales</h1>

    <div class="product-list">
      <div
        v-for="(product, index) in paginatedProducts"
        :key="product.id"
        class="product-card"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
        @click="openModal(product)"
      >
        <img :src="product.image" :alt="product.name" />
        <h3>{{ product.name }}</h3>
        <p>{{ product.vinilPrice }}</p>
      </div>
    </div>

    <!-- Modal -->
    <CdModal v-if="isModalOpen" :product="selectedProduct" @close="closeModal" />
  </div>
</template>

<script>
import { products } from '@/data/products.js';
import CdModal from '@/components/CdModal.vue';

export default {
  name: 'EdicionesEspeciales',
  components: { CdModal },
  data() {
    return {
      cdProducts: [],
      currentPage: 1,
      itemsPerPage: 18,
      isModalOpen: false,
      selectedProduct: null,
    };
  },
  created() {
    const page = parseInt(this.$route.query.page, 10);
    this.currentPage = !isNaN(page) && page > 0 ? page : 1;

    this.cdProducts = products
      .filter(item => item.type === 'Box-Set')
      .map(({ id, name, vinilPrice, image, ...rest }) => ({ id, name, vinilPrice, image, ...rest }));
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
      return this.cdProducts.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.cdProducts.length / this.itemsPerPage);
    },
  },
  methods: {
    openModal(product) {
      this.selectedProduct = product;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.selectedProduct = null;
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
      if (w >= 1800) this.itemsPerPage = 27;
      else if (w >= 1680) this.itemsPerPage = 24;
      else if (w >= 1400) this.itemsPerPage = 28;
      else if (w >= 1280) this.itemsPerPage = 24;
      else if (w >= 950) this.itemsPerPage = 20;
      else this.itemsPerPage = 18;
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
h1 {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 2.5rem;
  font-family: 'Nova Square', sans-serif;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-accent);
}
h3 {
  font-size: 0.8rem;
}
.wrap-especiales {
  background: var(--color-surface);
  margin: 0;
  padding: 50px 0 100px;
}
/* use your global .product-list and .product-card styles */
</style>
