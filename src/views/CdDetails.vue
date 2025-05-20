<template>
  <div v-if="product">
    <!-- Modal Overlay -->
    <div class="modal-overlay" @click.self="closeModal">
      <!-- Modal Content -->
      <div class="modal-content" data-aos="zoom-in"> 
        <div class="product-details">
          <div class="column">
            <img :src="product.image" :alt="product.name" />
          </div>

          <div class="column">
            <h2>Album: {{ product.name }}</h2>
            <p><strong>Artista:</strong> {{ product.band }}</p>
            <p><strong>Género:</strong> {{ product.genreDescription }}</p>
            <p><strong>Disquera:</strong> {{ product.label }}</p>
            <p><strong>Numero de discos:</strong> {{ product.numDiscs }}</p>
            <p><strong>Fecha de Lanzamiento:</strong> {{ product.releaseDate }}</p>
            <p><strong>Tipo de Producto:</strong> {{ product.type }}</p>
            <p><strong>Item #:</strong> {{ product.itemNumber }}</p>
          </div>

          <div class="column">
            <h3>Descripción del álbum</h3>
            <p>{{ product.description }}</p>
          </div>
        </div>

        <button class="close-button" @click="closeModal">Cerrar</button>
      </div>
    </div>
  </div>

  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import { products } from '@/data/products.js';

export default {
  data() {
    return {
      product: null,
      previousRoute: '/', // NEW: Save where user came from
    };
  },
  created() {
    const productId = this.$route.params.id;
    this.loadProduct(productId);

    // Save previous page from route query if available
    this.previousRoute = this.$route.query.from || '/';
  },
  
  methods: {
    loadProduct(id) {
      this.product = products.find(product => product.id === parseInt(id));
    },
    closeModal() {
      this.$router.push(this.previousRoute); // Go back where you came from!
    },
  },
};

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85); /* Darker overlay for better contrast */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #1f1f1f;
  color: #f5f5f5 !important;
  padding: 30px;
  width: 90%;
  max-width: 1000px;
  border-radius: 10px;
  position: relative;
  border: 1px solid #444;
  box-shadow: 0 0 20px rgba(255, 0, 85, 0.4); /* Optional glow effect */
}

.close-button {
  position: absolute;
  top: 15px;
  right: 20px;
  background: #ff0055;
  color: white;
  border: none; 
  padding: 8px 12px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.close-button:hover {
  background: #e6004c;
}

.product-details {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.column {
  flex: 1;
  background-color: #2a2a2a;
  padding: 20px;
  border-radius: 8px;
  color: #f5f5f5;
}

.column img {
  max-width: 100%;
  margin: 0 auto;
  display: block;
  border-radius: 8px;
}

.column h2,
.column h3 {
  color: #ff0055;
  margin-bottom: 10px; 
}

.column p {
  margin-bottom: 10px;
  line-height: 1.4;
}

.column p strong {
  color: #ff0055;
}

@media (max-width: 768px) {
  .product-details {
    flex-direction: column;
  }

  .column img {
  border-radius: 8px;
}

  .modal-overlay {
  position: relative;
}
}

</style>


