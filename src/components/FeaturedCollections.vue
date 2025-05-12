

<template>
  <section class="collections-section">
    <div class="collection-Contenido">
    <h2 class="title" data-aos="fade-up">Colecciones Destacadas</h2>
    <div class="grid">
      <div
        v-for="(collection, index) in collections"
        :key="collection.title"
        class="card"
        :data-aos="'fade-up'"
        :data-aos-delay="index * 100"
      >
          <router-link :to="{ path: '/', hash: collection.hash }">
            <img :src="collection.image" :alt="collection.title" />
            <h3>{{ collection.title }}</h3>
          </router-link>


      </div>
    </div>
    </div>
  </section>
</template>

<script>
import collections from '../data/collections';

export default {
  name: 'FeaturedCollections',
  data() {
    return {
      collections,
    };
  },
};
</script>

<style scoped>
.collections-section {
  padding: 50px 0 100px; 
  background-color: #121212;
  color: #f5f5f5;
  text-align: center;

}

.collection-Contenido{
  width: 70%;
  margin: 0 auto;
}

.title {
  font-size: 2.2rem;
  margin-bottom: 2.5rem;
  font-family: 'Nova Square', sans-serif;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--color-accent);
}

.grid {
  display: grid;
  gap: 2.5rem;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  padding: 0 1rem;
}

.card {
  background: #1f1f1f;
  border: 2px solid #ff005580;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px #ff0055aa;
}

.card img {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 50%;
  filter: grayscale(30%);
  transition: filter 0.3s, transform 0.3s;
  margin: 30px 0 0;
  border: 6px solid var(--color-border);
}

.card:hover img {
  filter: grayscale(0%);
  transform: scale(1.05); /* Aumenta el tamaño de la imagen en un 5% */
  border: 6px solid var(--color-border-light);
}

.card h3 {
  padding: 0.8rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
}
</style>