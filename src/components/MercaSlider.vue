<!-- src/components/MerchSlider.vue -->
<template>
  <section id="merch-slider">
    <div class="merch-wrap">
    <h2 class="section-title">Mercadería Oficial</h2>
    <Swiper
    :modules="modules"
    :slides-per-view="2"
    :space-between="20"
    :loop="true"
    :autoplay="{ delay: 2500, disableOnInteraction: false }"
    :breakpoints="{
        480: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 }
    }"
    >
<SwiperSlide v-for="item in merch" :key="item.id">
  <div class="merch-card-wrapper">
  <component
    :is="item.link ? 'router-link' : 'div'"
    :to="item.link"
    class="merch-card"
    data-aos="fade-up"
  >
    <img :src="item.image" :alt="item.name" />
    <h3>{{ item.name }}</h3>
  </component>
  </div>
</SwiperSlide>
    </Swiper>
    </div> 
  </section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

export default {
  components: { Swiper, SwiperSlide },
  data() {
    return {
      merch: [
        { id: 1, name: 'Camisetas Punk / Hardcore / Ska', image: '/images/merca/merch-1.jpg', link: '/ropa-punk' },
        { id: 2, name: 'Camisetas Metal / Progresivo', image: '/images/merca/merch-2.jpg', link: '/ropa-metal' }, 
        { id: 3, name: 'Accesorios', image: '/images/merca/merch-5.jpg', link: '/catalogo-accesorios'  },
        { id: 4, name: 'Camisetas Grunge / Alternativo', image: '/images/merca/merch-3.jpg', link: '/ropa-grunge' },
        { id: 5, name: 'Ropa de Mujer', image: '/images/merca/merch-4.jpg', link: '/ropa-mujer'},
        { id: 6, name: 'Artículos Coleccionables', image: '/images/merca/merch-6.jpg', link: '/articulos-coleccionables' },
      ]
    };
  },
  setup() {
    return {
      modules: [Autoplay],
    };
  },
};
</script>

<style scoped>

.section-title {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 2.5rem;
  font-family: 'Nova Square', sans-serif;
  letter-spacing: 2px;
  text-transform: uppercase;
  color:var(----color-text-dark);
}

.merch-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  flex-grow: 1;
  background: #1f1f1f;
  border: 2px solid #ff005580;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  padding: 1rem;
  margin: 20px 15px;
  text-align: center;
}

.merch-card:hover {
  transform: scale(1.05);
  box-shadow: 0 0 15px #ff0055aa;
}

.merch-card img { 
  max-width: 100%;
  object-fit: cover;
  filter: grayscale(30%);
  transition: filter 0.3s, transform 0.3s;
  margin: 30px 20px 0;
  border: 6px solid var(--color-border);

}

.merch-card:hover img {
  filter: grayscale(0%);
  transform: scale(1.05);
  border: 6px solid var(--color-border-light);
}

.merch-card h3 {
  padding: 0.8rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: #fff;
  min-height: 3rem;

}


.merch-card p {
  color: #ff0055;
  margin-bottom: 1rem;
}

.merch-wrap {
  margin:0 auto;
  padding: 50px 0 100px; 
  width: 90%;
}

::v-deep(.swiper-wrapper) {
  display: flex;
}
::v-deep(.swiper-slide) {
  display: flex;
  height: auto;
}

.merch-card-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
}


</style>