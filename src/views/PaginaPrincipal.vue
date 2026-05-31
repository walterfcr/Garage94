<template>
  <div>
    <InicioSlider />
    <main>
    <FeaturedCollections />
    <NuevosIngresos />
    <section id="cds">
    <BuscarGenero />
    </section>
    <section id="merca">
    <MercaSlider />
    </section>
    <section id="especiales">
    <EdicionesEspeciales />
    </section>
    <section id="vinilos">
    <VinilCollection />
    </section>
    <TestimonialsSection />
    </main>
    <AppFooter />
    
  </div>
</template>

<script>
import AOS from 'aos'; // Import the AOS library
import InicioSlider from '@/components/InicioSlider.vue';
import FeaturedCollections from '@/components/FeaturedCollections.vue';
import NuevosIngresos from '@/components/NuevosIngresos.vue';
import BuscarGenero from '@/components/BuscarGenero.vue';
import TestimonialsSection from '@/components/TestimonialsSection.vue';
import VinilCollection from '@/components/VinilCollection.vue';
import MercaSlider from '@/components/MercaSlider.vue';
import EdicionesEspeciales from '@/components/EdicionesEspeciales.vue';
import AppFooter from '@/components/AppFooter.vue';

export default {
  components: {
    InicioSlider,
    FeaturedCollections,
    NuevosIngresos,
    BuscarGenero,
    TestimonialsSection,
    VinilCollection,
    MercaSlider,
    EdicionesEspeciales,
    AppFooter,
  },
  
  mounted() {
    // Initialize AOS when the page is loaded
    AOS.init();

    // Refresh AOS animations after component is mounted
    setTimeout(() => {
      AOS.refresh(); // Ensure animations are refreshed
    }, 300);
  },
};
</script>

<style scoped>
/* Add any global or page-specific styles here */
</style>
