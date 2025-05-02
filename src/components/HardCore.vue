<template>
  <div>
    <h1>Catálogo de Hardcore</h1>

    <div class="product-list">
      <div v-for="product in paginatedProducts" :key="product.id" class="product-card">
        <router-link 
          :to="{ name: 'cd-details', params: { id: product.id }, query: { from: $route.fullPath } }"
        >
          <img :src="product.image" :alt="product.name" />
          <h3>{{ product.name }}</h3>
          <p>{{ product.price }}</p>
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
  name: 'CatalogoHardcore',
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
      .filter(item => item.genre === 'Hardcore') // Solo los de Hardcore
      .map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
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

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  width: 80%;
  margin: 0 auto;
  padding: 20px 0;
}

.product-card {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  background: white;
  transition: transform 0.3s;
}

.product-card img {
  max-width: 100%;
  height: auto;
}

.product-card a {
  text-decoration: none;
  color: inherit;
}

.product-card:hover {
  transform: scale(1.05);
}


</style>
