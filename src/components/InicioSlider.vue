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
</style>
