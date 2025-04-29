<template>
  <div id="app">
    <AppHeader /> <!-- Updated component name -->
    <router-view /> <!-- This will render the component based on the current route -->
    <!-- Optionally add a link to the Punk Rock catalog -->
    <router-link to="/punk-rock"></router-link>
    <router-link to="/hard-core"></router-link>
    <router-link to="/metal-music"></router-link>
    <router-link to="/ska-music"></router-link>
    <router-link to="/reggae-music"></router-link>
    <router-link to="/hip-hop"></router-link>
    <router-link to="/grunge-music"></router-link>
    <router-link to="/rock-alternativo"></router-link>
    <router-link to="/rock-progresivo"></router-link>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'; // Corrected import

export default {
  components: {
    AppHeader, // Corrected component name
  },
};
</script>
