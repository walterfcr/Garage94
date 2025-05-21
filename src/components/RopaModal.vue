<template>
  <div class="modal-overlay" @click.self="emitClose">
    <div class="modal-content" data-aos="zoom-in">
      <div class="product-details">
        <!-- Column 1: Image -->
        <div class="column">
          <img :src="product.image" :alt="product.name" />
        </div>

        <!-- Column 2: Clothing Info -->
        <div class="column">
          <h2>Producto: {{ product.name }}</h2>

          <!-- Size Dropdown -->
          <label for="size-select"><strong>Talla:</strong></label>
          <select id="size-select" v-model="selectedSize">
            <option disabled value="">Selecciona una talla</option>
            <option v-for="size in product.sizes" :key="size" :value="size">
              {{ size }}
            </option>
          </select>

          <p><strong>Color:</strong> {{ product.color }}</p>
          <p><strong>Precio:</strong> {{ product.price }}</p>
          <p><strong>Item #:</strong> {{ product.itemNumber }}</p>
        </div>

        <!-- Column 3: Description -->
        <div class="column">
          <h3>Descripción</h3>
          <p>{{ product.description }}</p>
        </div>
      </div>

      <button
        class="add-button"
        :disabled="!selectedSize"
        @click="addToCart"
      >
        Agregar al carrito
      </button>

      <button class="close-button" @click="emitClose">Cerrar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RopaModal',
  props: {
    product: Object
  },
  emits: ['close'],
  data() {
    return {
      selectedSize: ''
    };
  },
  mounted() {
    document.body.classList.add('no-scroll');
  },
  unmounted() {
    document.body.classList.remove('no-scroll');
  },
  methods: {
    emitClose() {
      this.$emit('close');
    },
    addToCart() {
      alert(`Añadido: ${this.product.name} - Talla: ${this.selectedSize}`);
      // You can emit an event to parent instead of alert
      this.emitClose();
    }
  }
};
</script>

<style scoped>

label {
  display: block;
  margin-top: 0.5rem;
  margin-bottom: 0.25rem;
}

select {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.add-button,
.close-button {
  margin-top: 1rem;
  background-color: #ff0055;
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
}

.add-button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.close-button:hover,
.add-button:hover {
  background-color: #e6004d;
}

@media (max-width: 768px) {
  .product-details {
    flex-direction: column;
  }
  .modal-overlay {
    align-items: flex-start;
    padding-top: 2rem;
  }
}
</style>
