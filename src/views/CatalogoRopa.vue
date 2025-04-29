<template>
  <div>
    <h1>Catálogo de Ropa</h1>
    
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
    
    <div v-for="ropa in productosFiltrados" :key="ropa.id" class="producto">
      <img :src="ropa.image" alt="Imagen de Ropa" />
      <h3>{{ ropa.name }}</h3>
      <p>{{ ropa.description }}</p>
      <p>Precio: ${{ ropa.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categorias: ['Camisetas', 'Pantalones', 'Chaquetas', 'Accesorios', 'Zapatillas'],
      categoriaSeleccionada: null,
      productos: [
        { id: 1, name: 'Camiseta de Rock', description: 'Camiseta de algodón con diseño de banda.', price: 20, image: 'https://via.placeholder.com/150', categoria: 'Camisetas' },
        { id: 2, name: 'Pantalón de Jeans', description: 'Pantalón de mezclilla, cómodo y moderno.', price: 40, image: 'https://via.placeholder.com/150', categoria: 'Pantalones' },
        { id: 3, name: 'Chaqueta de Cuero', description: 'Chaqueta de cuero para un estilo rockero.', price: 80, image: 'https://via.placeholder.com/150', categoria: 'Chaquetas' },
        { id: 4, name: 'Zapatillas Deportivas', description: 'Zapatillas cómodas para todo tipo de actividades.', price: 50, image: 'https://via.placeholder.com/150', categoria: 'Zapatillas' },
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
