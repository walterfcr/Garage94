<template>
  <div class="contenido-wrap">
    <h1>Colección de Vinilos</h1>

    <div class="product-list" data-aos="zoom-in">
      <div v-for="product in paginatedProducts" :key="product.id" class="product-card">
        <router-link 
          :to="{ name: 'cd-details', params: { id: product.id }, query: { from: $route.fullPath } }"
          @click="saveScrollPosition"
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

  mounted() {
    const saved = sessionStorage.getItem('scrollTopBeforeModal');
    if (saved !== null) {
      this.$nextTick(() => {
        window.scrollTo(0, parseInt(saved, 10));
        sessionStorage.removeItem('scrollTopBeforeModal');
      });
    }
  },

  created() {
    const page = parseInt(this.$route.query.page, 10);
    this.currentPage = !isNaN(page) && page > 0 ? page : 1;
    
    this.cdProducts = products
      .filter(item => item.type === 'Vinil')
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
        this.$nextTick(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' }); // scroll to top smoothly
        });
      }
    },
    saveScrollPosition() {
      sessionStorage.setItem('scrollTopBeforeModal', window.scrollY);
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
  color:var(----color-text-dark);
}

h3 {
  font-size: 0.8rem;
}

.contenido-wrap {
  margin:0;
  padding: 50px 0 100px; 

}


</style>
