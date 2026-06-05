<template>
  <section class="collections-section">
    <div class="generoContenido">
      <h2 class="title">Buscar CD'S por Género</h2>
      <div class="grid">
        <router-link to="/catalogo/Hardcore" class="card" data-aos="fade-in">
          <img src="/icons/icon-1.png" alt="Metal Icon" class="genre-icon" />
          <h3>Hardcore</h3>
        </router-link>

        <router-link to="/catalogo/Punk Rock" class="card" data-aos="fade-in">
          <img src="/icons/icon-2.png" alt="Metal Icon" class="genre-icon" />
          <h3>Punk Rock</h3>
        </router-link>

        <router-link to="/catalogo/Ska" class="card" data-aos="fade-in">
          <img src="/icons/icon-3.png" alt="Metal Icon" class="genre-icon" />
          <h3>Ska</h3>
        </router-link>

        <router-link
          to="/catalogo/Alternativo"
          class="card"
          data-aos="fade-int"
        >
          <img src="/icons/icon-4.png" alt="Metal Icon" class="genre-icon" />
          <h3>Alternativo</h3>
        </router-link>

        <router-link to="/catalogo/Grunge" class="card" data-aos="fade-in">
          <img src="/icons/icon-5.png" alt="Metal Icon" class="genre-icon" />
          <h3>Grunge</h3>
        </router-link>

        <router-link to="/catalogo/Metal" class="card" data-aos="fade-in">
          <img src="/icons/icon-6.png" alt="Metal Icon" class="genre-icon" />
          <h3>Metal</h3>
        </router-link>

        <router-link to="/catalogo/Hip Hop" class="card" data-aos="fade-in">
          <img src="/icons/icon-7.png" alt="Metal Icon" class="genre-icon" />
          <h3>Hip Hop</h3>
        </router-link>

        <router-link
          to="/catalogo/Rock Progresivo"
          class="card"
          data-aos="fade-in"
        >
          <img src="/icons/icon-8.png" alt="Metal Icon" class="genre-icon" />
          <h3>Progresivo</h3>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted } from 'vue'
import AOS from 'aos'

export default {
  name: 'BuscarGenero',
  mounted() {
    onMounted(() => {
      AOS.init()
    })
  },
}
</script>

<style scoped>
h2 {
  color: var(--color-text-main) !important;
}

.collections-section {
  margin: 0 auto;
  padding: 50px 0 100px;
  background-color: var(--color-background-darker);
  color: #f5f5f5;
  text-align: center;
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
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  padding: 0 1rem;
}

.card {
  background: #1f1f1f;
  border: 2px solid #ff005580;
  border-radius: 12px;
  overflow: hidden;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
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
  margin-top: 2rem;
  width: 100%;
  height: 140px;
  object-fit: cover;
  filter: grayscale(30%);
  transition: filter 0.3s;
}

.card:hover img {
  animation: pulse 0.5s ease;
  filter: grayscale(0%);
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
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

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .generoContenido {
    width: 90%;
  }
}
</style>
