<template>
  <div class="modal-overlay" @click.self="emitClose">
    <div class="modal-content" data-aos="zoom-in">
      <div class="product-details">
        <!-- Column 1: Image -->
        <div class="column">
          <img
            :src="product.image"
            :alt="product.name"
            @click="openLightbox"
            class="zoomable-image"
          />
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

    <!-- Lightbox Overlay -->
    <div v-if="isLightboxOpen" class="lightbox-overlay" @click.self="closeLightbox">
      <img :src="product.image" :alt="product.name" class="lightbox-img" />
      <button class="lightbox-close" @click="closeLightbox">×</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccesoriosModal',
  props: {
    product: { type: Object, required: true },
  },
  data() {
    return {
      isLightboxOpen: false,
    };
  },
  methods: {
    addToCart() {
      this.emitClose();
    },
    emitClose() {
      this.$emit('close');
    },
    openLightbox() {
      if (window.innerWidth >= 769) {
        this.isLightboxOpen = true;
        document.addEventListener('keydown', this.handleKeydown);
      }
    },
    closeLightbox() {
      this.isLightboxOpen = false;
      document.removeEventListener('keydown', this.handleKeydown);
    },
    handleKeydown(e) {
      if (e.key === 'Escape') {
        this.closeLightbox();
      }
    },
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  },
};
</script>

<style scoped>

.close-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: none;
  background: #ff0055;
  color: white;
  font-weight: bold;
  border-radius: 0.5rem;
  cursor: pointer;
}
.product-details {
  display: flex;
  gap: 1rem;
}
.column {
  flex: 1;
}
.description {
  white-space: pre-line;
}
.zoomable-image {
  cursor: zoom-in;
  max-width: 100%;
  border-radius: 8px;
  transition: transform 0.3s;
}
.zoomable-image:hover {
  transform: scale(1.02);
}

/* Lightbox styles */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2100;
}
.lightbox-img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 8px;
  box-shadow: 0 0 20px #000;
  cursor: zoom-out;
}
.lightbox-close {
  position: fixed;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
}

@keyframes zoomIn {
  from {
    scale: 0.9;
    opacity: 0;
  }
}

@media (max-width: 768px) {
  .product-details {
    flex-direction: column;
  }
  .modal-overlay {
    align-items: flex-start;
    padding-top: 2rem;
  }
  .zoomable-image {
    cursor: default;
    transform: none !important;
  }
}
</style>
