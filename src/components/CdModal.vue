<template>
  <!-- Only rendered when product is not null -->
  <div class="modal-overlay" @click.self="emitClose">
    <div class="modal-content" data-aos="zoom-in">
      <div class="product-details">
        <!-- column 1 -->
        <div class="column">
          <img :src="product.image" :alt="product.name" />
        </div>

        <!-- column 2 -->
        <div class="column">
          <h2>Álbum: {{ product.name }}</h2>
          <p><strong>Artista:</strong> {{ product.band }}</p>
          <p><strong>Género:</strong> {{ product.genreDescription }}</p>
          <p><strong>Disquera:</strong> {{ product.label }}</p>
          <p><strong>N.º de discos:</strong> {{ product.numDiscs }}</p>
          <p><strong>Lanzamiento:</strong> {{ product.releaseDate }}</p>
          <p><strong>Tipo:</strong> {{ product.type }}</p>
          <p><strong>Item #:</strong> {{ product.itemNumber }}</p>
        </div>

        <!-- column 3 -->
        <div class="column">
          <h3>Descripción del álbum</h3>
          <p>{{ product.description }}</p>
        </div>
      </div>

      <button class="close-button" @click="emitClose">Cerrar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CdModal',
  props: { product: Object },
  emits: ['close'],
  mounted() {
    /* lock background scroll */
    document.body.classList.add('no-scroll');
  },
  unmounted() {
    /* unlock background scroll */
    document.body.classList.remove('no-scroll');
  },
  methods: { emitClose() { this.$emit('close'); } }
};
</script>

<style scoped>

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
