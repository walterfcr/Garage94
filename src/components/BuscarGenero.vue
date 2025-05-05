<template>
  <section class="collections-section">
    <div class="generoContenido">
      <h2 class="title">Buscar por Género</h2>
      <div class="grid">
        <router-link to="/hard-core" class="card" data-aos="flip-left">
          <img src="/icons/icon-1.png" alt="Metal Icon" class="genre-icon" />
          <h3>Hardcore</h3>
        </router-link>

        <router-link to="/punk-rock" class="card" data-aos="flip-right">
          <img src="/icons/icon-2.png" alt="Metal Icon" class="genre-icon" />
          <h3>Punk Rock</h3>
        </router-link>

        <router-link to="/ska-music" class="card" data-aos="flip-left">
          <img src="/icons/icon-3.png" alt="Metal Icon" class="genre-icon" />
          <h3>Ska</h3>
        </router-link>

        <router-link to="/rock-alternativo" class="card" data-aos="flip-right">
          <img src="/icons/icon-4.png" alt="Metal Icon" class="genre-icon" />
          <h3>Alternativo</h3>
        </router-link>

        <router-link to="/grunge-music" class="card" data-aos="flip-left">
          <img src="/icons/icon-5.png" alt="Metal Icon" class="genre-icon" />
          <h3>Grunge</h3>
        </router-link>

        <router-link to="/metal-music" class="card" data-aos="flip-right">
          <img src="/icons/icon-6.png" alt="Metal Icon" class="genre-icon" />
          <h3>Metal</h3>
        </router-link>

        <router-link to="/hip-hop" class="card" data-aos="flip-left">
          <img src="/icons/icon-7.png" alt="Metal Icon" class="genre-icon" />
          <h3>Hip Hop</h3>
        </router-link>

        <router-link to="/rock-progresivo" class="card" data-aos="flip-right">
          <img src="/icons/icon-8.png" alt="Metal Icon" class="genre-icon" />
          <h3>Progresivo</h3>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted } from 'vue';
import AOS from 'aos'; // Import AOS

export default {
  name: 'BuscarGenero',
  mounted() {
    onMounted(() => {
      AOS.init(); // Initialize AOS on component mount
    });
  },
};
</script>

<style scoped>

.collections-section {
  padding: 3rem 2rem;
  margin-top: 2rem;
  background-color: #121212;
  color: #f5f5f5;
  text-align: center;
}

.title {
  font-size: 2.2rem;
  margin-bottom: 2.5rem;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #ff0055;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  padding: 0 1rem;
}

.card {
  background: #1f1f1f;
  border: 2px solid #ff005580;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  text-align: center;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px #ff0055aa;
}

.card img {
  margin-top:2rem;
  width: 100%;
  height: 140px;
  object-fit: cover;
  filter: grayscale(30%);
  transition: filter 0.3s;
}

.card:hover img {
  filter: grayscale(0%);
}

.card h3 {
  padding: 0.8rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
}

.generoContenido {
  width: 70%;
  margin: 0 auto;
}

.generoContenido img {
    max-width: 30%;
    height: auto;
}

@media (max-width:768px) {
  .grid {
  grid-template-columns: repeat(2, 1fr);
}

.generoContenido {
  width: 90%;
}

}
</style>
