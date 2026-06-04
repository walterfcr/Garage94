<template>
  <!-- Only rendered when product is not null -->
  <div class="modal-overlay" @click.self="emitClose">
    <div class="modal-content" data-aos="fade-in">
      <div class="product-details">
        <!-- column 1 -->
        <div class="column">
          <img :src="product.image" :alt="product.name" />
        </div>

        <!-- column 2 -->
        <div class="column">
          <h2>Álbum: {{ product.name }}</h2>
          <p><strong>Artista:</strong> {{ product.band }}</p>
          <p><strong>Género:</strong> {{ product.genre_description }}</p>
          <p><strong>Disquera:</strong> {{ product.label }}</p>
          <p><strong>N.º de discos:</strong> {{ product.num_discs }}</p>
          <p><strong>Lanzamiento:</strong> {{ product.release_date }}</p>
          <p><strong>Tipo:</strong> {{ product.type }}</p>
          <p><strong>Item #:</strong> {{ product.item_number }}</p>
        </div>

        <!-- column 3 -->
        <div class="column">
          <h3>Descripción del álbum</h3>
          <p>{{ product.description }}</p>
        </div>
      </div>

      <button class="close-button" @click="emitClose">Cerrar</button>
      <button class="add-button" @click="addToCart">Agregar al carrito</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CdModal',
  props: { product: Object },
  emits: ['close', 'add-to-cart'],
  mounted() {
    /* lock background scroll */
    document.body.classList.add('no-scroll')
  },
  unmounted() {
    /* unlock background scroll */
    document.body.classList.remove('no-scroll')
  },
  methods: {
    emitClose() {
      this.$emit('close')
    },
    addToCart() {
      this.$emit('add-to-cart', {
        product: this.product,
        selectedSize: null,
        type: this.product.type,
      })
      this.emitClose()
    },
  },
}
</script>

<style scoped>
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
@media (max-width: 768px) {
  .product-details {
    flex-direction: column;
  }
  /* Remove vertical centering but keep horizontal centering */
  .modal-overlay {
    align-items: flex-start;
  }
}
</style>
