<template>
  <div>
    <!-- Hero Section with Rotating Text and Background -->
    <section class="nosotros-hero" :style="{ backgroundImage: `url('/images/nosotros.jpg')` }">
      <div class="hero-text">
        <h1>{{ currentPhrase }}</h1>
        <p>Es un refugio para quienes crecieron entre gritos, guitarras y rebeldía.</p>
      </div>
    </section>

    

    <TestimonialsSection />
    <AppFooter />
  </div>
</template>

<script>
import TestimonialsSection from '@/components/TestimonialsSection.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
  name: 'AppNosotros',
  components: {
    TestimonialsSection,
    AppFooter,
  },
  data() {
    return {
      phrases: [
        'Esto no es solo una tienda.',
        'Es un refugio de rebeldía sonora.',
        'Aquí se escuchan los gritos que formaron generaciones.',
        'Vinilos. Gritos. Historia. Todo en un solo lugar.',
      ],
      currentIndex: 0,
      intervalId: null,
    };
  },
  computed: {
    currentPhrase() {
      return this.phrases[this.currentIndex];
    },
  },
  mounted() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.phrases.length;
    }, 4000);
  },
  beforeUnmount() {
    clearInterval(this.intervalId);
  },
};
</script>

<style scoped>
/* Hero Section */
.nosotros-hero {
  height: 70vh;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.hero-text {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 2rem;
  color: #fff;
  max-width: 700px;
  box-shadow: 0 0 30px rgba(255, 0, 85, 0.4);
  border-left: 4px solid #ff0055;
  transition: all 0.5s ease-in-out;
}

.hero-text h1 {
  font-size: 2.5rem;
  font-family: 'Nova Square', sans-serif;
  text-transform: uppercase;
  color: var(--color-accent);
  transition: opacity 0.5s ease-in-out;
}

.hero-text p {
  font-size: 1.2rem;
  margin-top: 1rem;
  color: var(--color-text-light);
}

@media (max-width: 768px) {
  .hero-text h1 {
    font-size: 1.8rem;
  }

  .hero-text p {
    font-size: 1rem;
  }
}

/* Content Section */
.nosotros-wrap {
  margin: 100px 0 0;
}

.nosotros-content {
  background-color: var(--color-surface);
  padding: 40px;
  border-radius: 12px;
  color: var(--color-text-light);
  max-width: 900px;
  margin: 0 auto 100px;
  border: 1px solid var(--color-border-light);
  box-shadow: 0 0 20px rgba(255, 0, 85, 0.25);
}

@media (max-width: 768px) {
  .nosotros-content {
    width: 90%;
  }
}

.nosotros-content h2 {
  font-family: 'Nova Square', sans-serif;
  text-transform: uppercase;
  color: var(--color-accent);
  text-align: center;
  font-size: 32px;
  margin-bottom: 30px;
  position: relative;
}

.nosotros-content h2 .icon {
  font-size: 28px;
  vertical-align: middle;
  margin-right: 8px;
}

.intro {
  text-align: center;
  font-size: 18px;
  margin-bottom: 30px;
  font-style: italic;
  color: var(--color-text-muted);
}

.section {
  margin-bottom: 30px;
}

.section h3 {
  color: var(--color-accent);
  font-size: 20px;
  margin-bottom: 10px;
}

.section p {
  line-height: 1.7;
  font-size: 16px;
}

.highlight {
  color: var(--color-accent);
  font-weight: bold;
}
</style>
