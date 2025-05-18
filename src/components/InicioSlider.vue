<template>
  <div
    class="inicio"
    :style="{ backgroundImage: `url('/images/${currentSlide}')` }"
  >
  <div class="texto-slider">
      <h1>TU TIENDA. TU PLAYLIST. TU IDENTIDAD</h1>
      <p>CDs, vinilos y ropa de culto para quienes crecieron al margen.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InicioSlider',
  data() {
    return {
      slides: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
      currentSlideIndex: 0,
    };
  },
  computed: {
    currentSlide() {
      return this.slides[this.currentSlideIndex];
    }
  },
  mounted() {
    this.startSlideShow();
  },
  methods: {
    startSlideShow() {
      setInterval(() => {
        this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
      }, 5000); // Change every 5 seconds
    }
  }
};
</script>

<style>
.inicio {
  height: 700px;
  width: 100%;
  /*box-shadow: inset 0 0 0 1000px rgba(11, 18, 46, 0.6);*/
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 1s ease-in-out;
}

.texto-slider {
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  font-family: 'Courier New', monospace;
  padding: 2rem;
  max-width: 600px;
  border-left: 4px solid #ff0055;
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  box-shadow: 0 0 30px rgba(255, 0, 85, 0.4);
}

.texto-slider h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.texto-slider p {
  font-size: 1.1rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .texto-slider {
    position: static;
    transform: none;
    padding: 1.5rem;
    margin: 0 auto;
    background: rgba(0, 0, 0, 0.6);
    text-align: center;
    max-width: 100%;
    border-left: none;
    border-radius: 0;
  }

  .texto-slider h1 {
    font-size: 1.8rem;
  }

  .texto-slider p {
    font-size: 1rem;
  }
}

</style>
