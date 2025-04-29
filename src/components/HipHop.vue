<template>
  <div>
    <h1>Catálogo de Hip Hop</h1>

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
  name: 'CatalogoHipHop',
  data() {
    return {
      cdProducts: [],
      currentPage: 1,
      itemsPerPage: 27,
    };
  },
  created() {
    this.cdProducts = products
      .filter(item => item.genre === 'Hip Hop') // Solo los de Hip Hop
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

/* Paginación */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  gap: 10px;
}

.pagination button {
  background-color: #333;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 5px;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
