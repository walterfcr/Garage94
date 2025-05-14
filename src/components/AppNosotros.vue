<template>
  <div class="nosotros-wrap" data-aos="fade-up">
    <div class="nosotros-content">
      <h2><span class="icon">🎸</span> Sobre Nosotros</h2>

      <p class="intro">
        Somos más que una tienda: somos una <strong>comunidad musical alternativa</strong>.
      </p>

      <div class="section">
        <h3>🎶 Nuestra música</h3>
        <p>
          Nos especializamos en <span class="highlight">punk</span>, <span class="highlight">grunge</span>, <span class="highlight">metal</span>, 
          <span class="highlight">ska</span>, <span class="highlight">hardcore</span>, <span class="highlight">hip hop</span> y más.
          En formatos físicos como <strong>vinilos</strong> y <strong>CDs</strong>.
        </p>
      </div>

      <div class="section">
        <h3>🛍️ Mucho más que música</h3>
        <p>
          Descubre <strong>ropa</strong>, <strong>coleccionables</strong> y <strong>merch oficial</strong> de tus bandas favoritas.
          Todo curado con pasión por la escena independiente.
        </p>
      </div>

      <div class="section">
        <h3>🔥 Nuestro objetivo</h3>
        <p>
          Apoyar artistas reales y mantener viva la esencia del <em>underground</em>. Aquí, cada producto tiene historia y actitud.
        </p>
      </div>

    <!-- <router-link to="/catalogo" class="cta-button">Explorar Catálogo</router-link> -->
    </div>
    <TestimonialsSection />
    <AppFooter />
  </div>
</template>

<script>
import TestimonialsSection from '@/components/TestimonialsSection.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
    components: {
    TestimonialsSection,
    AppFooter,
  },

  name: 'AppNosotros',
};
</script>

<style scoped>
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

@media (max-width:768px){
.nosotros-content {
    width:90%;
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

.cta-button {
  display: inline-block;
  margin-top: 30px;
  padding: 12px 24px;
  background-color: var(--color-button-bg);
  color: var(--color-text-light);
  border-radius: 6px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  text-align: center;
}

.cta-button:hover {
  background-color: var(--color-button-hover);
}
</style>
