<template>
  <div v-if="product">
    <div class="modal-overlay" @click.self="closeModal">
      <div class="modal-content" data-aos="zoom-in">
        <div class="product-details">
          <div class="column">
            <img :src="product.image" :alt="product.name" />
          </div>

          <div class="column">
            <h2>Producto: {{ product.name }}</h2>
            <p><strong>Talla:</strong> {{ product.size }}</p>
            <p><strong>Color:</strong> {{ product.color }}</p>
            <p><strong>Precio:</strong> {{ product.price }}</p>
            <p><strong>Item #:</strong> {{ product.itemNumber }}</p>
          </div>

          <div class="column">
            <h3>Descripción</h3>
            <p>{{ product.description }}</p> 
          </div>
        </div>

        <button class="close-button" @click="closeModal">Cerrar</button>
      </div>
    </div>
  </div>
  <div v-else><p>Loading...</p></div>
</template>

<script>
import { products } from '@/data/products.js';

export default {
  data() {
    return {
      product: null,
      previousRoute: '/',
    };
  },
  created() {
    const productId = this.$route.params.id;
    this.product = products.find(p => p.id === parseInt(productId) && p.type === 'Clothing');
    this.previousRoute = this.$route.query.from || '/';
  },
  methods: {
    closeModal() {
      this.$router.push(this.previousRoute);
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
