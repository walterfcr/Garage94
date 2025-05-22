<template>
  <div class="modal-overlay" @click.self="emitClose">
    <div class="modal-content" data-aos="zoom-in">
      <div class="product-details">
        <!-- Column 1: Image -->
        <div class="column">
          <img :src="product.image" :alt="product.name" />
        </div>

        <!-- Column 2: Product Info -->
        <div class="column">
          <h2>{{ product.name }}</h2>
          <p><strong>Precio:</strong> {{ product.price }}</p>
          <p><strong>Material:</strong> {{ product.material }}</p>
          <p><strong>Longitud:</strong> {{ product.longitud }}</p>
          <p><strong>Item #:</strong> {{ product.itemNumber }}</p>

        </div>

        <!-- Column 3: Description -->
        <div class="column">
          <h3>Descripción:</h3>
          <p class="description">{{ product.description }}</p>
        </div>
      </div>

      <button class="close-button" @click="emitClose">Cerrar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccesoriosModal',
  props: {
    product: { type: Object, required: true },
  },
  methods: {
    addToCart() {
      // cart logic here
      this.emitClose();
    },
    emitClose() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed; inset: 0;
  display: grid; place-items: center;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2000;
}
.modal-box {
  width: min(90vw, 420px);
  background: #fff; border-radius: 1rem;
  padding: 1.5rem; position: relative;
  animation: zoomIn 0.25s ease;
}
.close-btn {
  position: absolute; top: 0.5rem; right: 0.5rem;
  background: transparent; border: none;
  font-size: 1.5rem; cursor: pointer;
}

.add-btn {
  width: 100%; padding: 0.65rem 1rem;
  border: none; border-radius: 0.5rem;
  font-weight: 600; cursor: pointer;
  background: var(--accent, #ff0055); color: #fff;
}
@keyframes zoomIn { from { scale: 0.9; opacity: 0; } }

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
