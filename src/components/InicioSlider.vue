<template>
  <div
    class="inicio"
    :style="{ backgroundImage: `url('/images/${currentSlide}')` }"
  >
  </div>
</template>

<script>
export default {
  name: 'InicioSlider',
  data() {
    return {
      slides: ['slide1.webp', 'slide2.webp', 'slide3.webp', 'slide4.webp'],
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
  height: 650px;
  width: 100%;
  box-shadow: inset 0 0 0 1000px rgba(11, 18, 46, 0.6);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 1s ease-in-out;
}
</style>
