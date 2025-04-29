<template>
  <div>
    <h1>Catálogo de Accesorios</h1>
    
    <!-- Filtro de Categorías -->
    <div class="categorias">
      <button v-for="categoria in categorias" :key="categoria" @click="filtrarPorCategoria(categoria)">
        {{ categoria }}
      </button>
    </div>

    <!-- Mostrar productos filtrados por categoría -->
    <div v-if="categoriaSeleccionada">
      <h2>Categoría: {{ categoriaSeleccionada }}</h2>
    </div>
    
    <div v-for="accesorio in productosFiltrados" :key="accesorio.id" class="producto">
      <img :src="accesorio.image" alt="Imagen de Accesorio" />
      <h3>{{ accesorio.name }}</h3>
      <p>{{ accesorio.description }}</p>
      <p>Precio: ${{ accesorio.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categorias: ['Bolsos', 'Sombreros', 'Gafas', 'Relojes', 'Joyas'],
      categoriaSeleccionada: null,
      productos: [
        { id: 1, name: 'Bolso de Mano', description: 'Bolso de mano de cuero elegante.', price: 50, image: 'https://via.placeholder.com/150', categoria: 'Bolsos' },
        { id: 2, name: 'Sombrero de Verano', description: 'Sombrero ligero para el sol.', price: 30, image: 'https://via.placeholder.com/150', categoria: 'Sombreros' },
        { id: 3, name: 'Gafas de Sol', description: 'Gafas de sol con estilo moderno.', price: 40, image: 'https://via.placeholder.com/150', categoria: 'Gafas' },
        { id: 4, name: 'Reloj de Pulsera', description: 'Reloj clásico de pulsera de acero.', price: 120, image: 'https://via.placeholder.com/150', categoria: 'Relojes' },
      ],
    };
  },
  computed: {
    productosFiltrados() {
      if (this.categoriaSeleccionada) {
        return this.productos.filter(producto => producto.categoria === this.categoriaSeleccionada);
      }
      return this.productos;
    },
  },
  methods: {
    filtrarPorCategoria(categoria) {
      this.categoriaSeleccionada = categoria;
    },
  },
};
</script>

<style scoped>
.categorias {
  margin-bottom: 20px;
}

.categorias button {
  margin-right: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border: none;
  cursor: pointer;
}

.categorias button:hover {
  background-color: #ddd;
}

.producto {
  margin-bottom: 20px;
}

.producto img {
  max-width: 150px;
  margin-right: 20px;
}
</style>
