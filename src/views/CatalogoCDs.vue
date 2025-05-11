<template>
  <div>
    <InicioSlider />
    <FeaturedCollections />
    <NuevosIngresos :products="products" />
    <section id="cds">
    <BuscarGenero />
    </section>
    <section id="merca">
    <MercaSlider />
    </section>
    <TestimonialsSection />
    <section id="vinilos">
    <VinilCollection />
    </section>
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

export default {
  components: {
    InicioSlider,
    FeaturedCollections,
    NuevosIngresos,
    BuscarGenero,
    TestimonialsSection,
    VinilCollection,
    MercaSlider,
  },
  data() {
    return {
      products: [
        { id: 1, name: 'Kerplunk', price: '$10', image: '/images/nuevos/cd-1.webp' },
        { id: 2, name: 'Firestorm', price: '$12', image: '/images/nuevos/cd-2.webp' },
        { id: 3, name: 'No Control', price: '$12', image: '/images/nuevos/cd-3.webp' },
        { id: 4, name: 'The Action is Go', price: '$12', image: '/images/nuevos/cd-4.webp' },
        { id: 5, name: 'Born to Expire', price: '$12', image: '/images/nuevos/cd-5.webp' },
        { id: 6, name: 'Unfun', price: '$12', image: '/images/nuevos/cd-6.webp' },
        { id: 7, name: 'Dillinger Four Vs God', price: '$12', image: '/images/nuevos/cd-7.webp' },
        { id: 8, name: 'State of the World Address', price: '$12', image: '/images/nuevos/cd-8.webp' },
        { id: 9, name: 'El Chico con Rayos X en los Ojos', price: '$12', image: '/images/nuevos/cd-9.webp' },
        { id: 10, name: 'Fundamental', price: '$12', image: '/images/nuevos/cd-10.webp' },
        { id: 11, name: 'Mi Vida Loca', price: '$12', image: '/images/nuevos/cd-11.webp' },
        { id: 12, name: 'Cypress Hill III: Temples of Boom', price: '$12', image: '/images/nuevos/cd-12.webp' },
        { id: 13, name: 'The Chronic', price: '$12', image: '/images/nuevos/cd-13.webp' },
        { id: 14, name: 'Punk in Drublic', price: '$12', image: '/images/nuevos/cd-14.webp' },
        { id: 15, name: '@#!*', price: '$12', image: '/images/nuevos/cd-15.webp' },
        { id: 16, name: 'Siamese Dream', price: '$12', image: '/images/nuevos/cd-16.webp' },
        { id: 17, name: 'Fyulaba', price: '$12', image: '/images/nuevos/cd-17.webp' },
        { id: 18, name: 'Without a Sound', price: '$12', image: '/images/nuevos/cd-18.webp' },
        // Add more products as needed
      ],
    };
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
