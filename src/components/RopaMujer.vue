<template>
  <div class="contenido-wrap">
    <h1>Ropa para Mujer</h1>

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

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Anterior</button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Siguiente</button>
    </div>

    <MercaSlider />
    <AppFooter />

    <!-- Ropa Modal -->
    <RopaModal
      v-if="isModalOpen"
      :product="selectedProduct"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { products } from '@/data/products.js';
import MercaSlider from '@/components/MercaSlider.vue';
import AppFooter from '@/components/AppFooter.vue';
import RopaModal from '@/components/RopaModal.vue'; // ← Import your modal

export default {
  name: 'RopaGrunge',
  components: {
    MercaSlider,
    AppFooter,
    RopaModal,
  },
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
    const page = parseInt(this.$route.query.page, 10);
    this.currentPage = !isNaN(page) && page > 0 ? page : 1;

    // Load all product data for modal use
    this.cdProducts = products
      .filter(item => item.category === 'Mujer')
      .map(item => ({
        ...item // Keep all fields for modal (name, price, image, size, color, etc.)
      }));
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
      const end = start + this.itemsPerPage;
      return this.cdProducts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.cdProducts.length / this.itemsPerPage);
    }
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$router.replace({ query: { ...this.$route.query, page } });
        this.currentPage = page;
      }
    },
    setItemsPerPage() {
      const width = window.innerWidth;

      if (width >= 1800) {
        this.itemsPerPage = 27;
      } else if (width >= 1680) {
        this.itemsPerPage = 24;
      } else if (width >= 1400) {
        this.itemsPerPage = 28;
      } else if (width >= 1280) {
        this.itemsPerPage = 24;
      } else if (width >= 950) {
        this.itemsPerPage = 20;
      } else {
        this.itemsPerPage = 18;
      }
    },
    handleResize() {
      this.setItemsPerPage();
    },
    openModal(product) {
      this.selectedProduct = product;
      this.isModalOpen = true;
    },
    closeModal() {
      this.selectedProduct = null;
      this.isModalOpen = false;
    }
  },
  watch: {
    itemsPerPage() {
      this.goToPage(1);
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  color: var(----color-text-dark);
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

.product-card {
  cursor: pointer;
  transition: transform 0.2s ease;
}
.product-card:hover {
  transform: scale(1.03);
}
</style>
