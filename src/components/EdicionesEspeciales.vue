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
      >
        <router-link 
          :to="{ name: 'cd-details', params: { id: product.id }, query: { from: $route.fullPath } }"
        >
          <img :src="product.image" :alt="product.name" />
          <h3>{{ product.name }}</h3>
          <p>{{ product.vinilPrice }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { products } from '@/data/products.js';

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
      .filter(item => item.type === 'Box-Set')
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
  margin:0 ;
  padding: 50px 0 100px; 
}


</style>
