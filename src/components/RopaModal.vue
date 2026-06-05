<template>
  <div class="modal-overlay" @click.self="emitClose">
    <div class="modal-content" data-aos="fade-in">
      <div class="product-details">
        <div class="column">
          <img :src="product.image" :alt="product.name" />
        </div>

        <div class="column">
          <h2>{{ product.name }}</h2>

          <label for="size-select"><strong>Talla:</strong></label>
          <select id="size-select" v-model="selectedSize">
            <option disabled value="">Selecciona una talla</option>
            <option v-for="size in product.sizes" :key="size" :value="size">
              {{ size }}
            </option>
          </select>

          <p><strong>Color:</strong> {{ product.color }}</p>
          <p><strong>Precio:</strong> {{ product.price }}</p>
          <p><strong>Item #:</strong> {{ product.item_number }}</p>
        </div>

        <div class="column">
          <h3>Descripción</h3>
          <p>{{ product.description }}</p>
        </div>
      </div>

      <button class="add-button" :disabled="!selectedSize" @click="addToCart">
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
    product: Object,
  },
  emits: ['close', 'add-to-cart'],
  data() {
    return {
      selectedSize: '',
    }
  },
  mounted() {
    document.body.classList.add('no-scroll')
  },
  unmounted() {
    document.body.classList.remove('no-scroll')
  },
  methods: {
    emitClose() {
      this.$emit('close')
    },
    addToCart() {
      this.$emit('add-to-cart', {
        product: this.product,
        selectedSize: this.selectedSize,
        type: this.product.type,
      })

      this.emitClose()
    },
  },
}
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

.add-button {
  margin-top: 1rem;
  background-color: var(--color-button-bg);
  color: var(--color-text-light);
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  margin-right: 0.5rem;
}

.add-button:hover {
  background-color: var(--color-button-hover);
}

.close-button {
  margin-top: 1rem;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  color: var(--color-text-muted);
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  cursor: pointer;
}

.close-button:hover {
  background-color: var(--color-background-dark);
}

.add-button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
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
