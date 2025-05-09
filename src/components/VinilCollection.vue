<template>
  <div class="contenido-wrap">
    <h1>Colección de Vinilos</h1>

    <div class="product-list" data-aos="zoom-in">
      <div v-for="product in paginatedProducts" :key="product.id" class="product-card">
        <router-link 
          :to="{ name: 'cd-details', params: { id: product.id }, query: { from: $route.fullPath } }"
        >
          <img :src="product.image" :alt="product.name" />
          <h3>{{ product.name }}</h3>
          <p>{{ product.vinilPrice }}</p>
        </router-link>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Anterior</button>

      <span>Página {{ currentPage }} de {{ totalPages }}</span>

      <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Siguiente</button>
    </div>
  </div>
  
</template> 

<script>
import { products } from '@/data/products.js'; // Ajusta la ruta si es necesario



export default {
  name: 'CatalogoHipHop',
  data() {
    return {
      cdProducts: [],
      currentPage: 1,
      itemsPerPage: 18,
    };
  },
  created() {
    const page = parseInt(this.$route.query.page, 10);
    this.currentPage = !isNaN(page) && page > 0 ? page : 1;
    
    this.cdProducts = products
      .filter(item => item.type === 'Vinil') // solo vinilos
      .map(item => ({
        id: item.id,
        name: item.name,
        vinilPrice: item.vinilPrice,
        image: item.image,
      }));
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
    }
  },
    beforeRouteLeave(to, from, next) {
    if (to.name === 'cd-details') {
      sessionStorage.setItem('scrollTopBeforeModal', window.scrollY);
    }
    next();
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}

h3 {
  font-size: 0.8rem;
}


</style>
