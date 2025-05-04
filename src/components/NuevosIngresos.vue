<template>
  <div class="Nuevos-container">
    <h1>Nuevos Ingresos</h1>
    <div class="product-list" data-aos="zoom-in">
      <div v-for="product in products" :key="product.id" class="product-card">
        <router-link :to="'/cd/' + product.id">
          <img :src="product.image" :alt="product.name" />
          <h3>{{ product.name }}</h3>
          <p>{{ product.price }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NuevosIngresos',
  props: {
    products: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-size: 2.2rem;
  margin: 3rem 0 1rem;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 2px;
  color: #ff0055;
}

.Nuevos-container{
  margin:10rem 0;
}

</style>
