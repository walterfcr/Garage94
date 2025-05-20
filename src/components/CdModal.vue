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
.modal-overlay{
  position:fixed; inset:0;
  background:rgba(0,0,0,.85);
  display:flex; align-items:center; justify-content:center;
  z-index:1000;
}
.modal-content{
  background:#1f1f1f; color:#f5f5f5;
  padding:30px; width:90%; max-width:1000px;
  border:1px solid #444; border-radius:10px;
  box-shadow:0 0 20px rgba(255,0,85,.4);
  position:relative;
}
.close-button{
  position:absolute; top:15px; right:20px;
  background:#ff0055; color:#fff; border:none;
  padding:8px 12px; border-radius:5px; cursor:pointer;
}
.product-details{display:flex;flex-wrap:wrap;gap:20px;}
.column{flex:1;background:#2a2a2a;padding:20px;border-radius:8px;}
.column img{max-width:100%;border-radius:8px;display:block;margin:auto;}
.column h2,.column h3{color:#ff0055;margin-bottom:10px;}
.column p strong{color:#ff0055;}
@media(max-width:768px){.product-details{flex-direction:column;}}
/* background‑scroll lock helper */
:global(body.no-scroll){overflow:hidden;}
</style>
