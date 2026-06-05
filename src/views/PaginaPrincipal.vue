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
        <CatalogoCds genreFromProp="vinyl" />
      </section>
      <TestimonialsSection />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AOS from 'aos'
import InicioSlider from '@/components/InicioSlider.vue'
import CatalogoCds from '@/views/CatalogoCds.vue'
import FeaturedCollections from '@/components/FeaturedCollections.vue'
import NuevosIngresos from '@/components/NuevosIngresos.vue'
import BuscarGenero from '@/components/BuscarGenero.vue'
import TestimonialsSection from '@/components/TestimonialsSection.vue'
import MercaSlider from '@/components/MercaSlider.vue'
import EdicionesEspeciales from '@/components/EdicionesEspeciales.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
  components: {
    InicioSlider,
    FeaturedCollections,
    NuevosIngresos,
    BuscarGenero,
    TestimonialsSection,
    CatalogoCds,
    MercaSlider,
    EdicionesEspeciales,
    AppFooter,
  },

  mounted() {
    AOS.init()

    setTimeout(() => {
      AOS.refresh()
    }, 300)
  },
}
</script>

<style scoped></style>
