<template>
  <div class="contenido-wrap">
    <h1>Catálogo de Ska</h1>

    <div class="product-list" data-aos="zoom-in">
      <div
        v-for="product in paginatedProducts"
        :key="product.id"
        class="product-card"
      >
        <router-link
          :to="{ 
            name: 'cd-details',
            params: { id: product.id },
            query: { from: $route.fullPath },
          }"
        >
          <img :src="product.image" :alt="product.name" />
          <h3>{{ product.name }}</h3>
          <p>{{ product.price }}</p>
        </router-link>
      </div>
    </div>

    <!-- Pagination Controls -->
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

    <BuscarGenero />
    <AppFooter />
  </div>
</template>

<script>
import { products } from '@/data/products.js';
import BuscarGenero from '@/components/BuscarGenero.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
  name: 'CatalogoSka',
  components: {
    BuscarGenero,
    AppFooter,
  },
  data() {
    return {
      cdProducts: [],
      currentPage: 1,
      itemsPerPage: 27,
    };
  },
  created() {
    const page = parseInt(this.$route.query.page, 10);
    this.currentPage = !isNaN(page) && page > 0 ? page : 1;

    this.cdProducts = products
      .filter(item => item.genre === 'Ska' && item.type !== 'Vinil')
      .map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
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
    },
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
  color:var(----color-text-dark);
}

h3 {
  font-size: 0.8rem;
  margin: 0.5rem 0 0;
}

.contenido-wrap {
  margin:0;
  padding: 50px 0 0; 
}

</style>
