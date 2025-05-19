<template>
  <section class="testimonials">
    <h2>Lo que dicen nuestros Clientes</h2>

    <div class="testimonial-grid" data-aos="fade-up">
      <div
        v-for="(testimonial, index) in testimonials"
        :key="index"
        class="testimonial-card"
      >
        <img
          :src="testimonial.photo"
          :alt="testimonial.name"
          class="testimonial-photo"
        />
        <div class="testimonial-info" >
          <p class="testimonial-text">“{{ testimonial.text }}”</p>
          <p class="testimonial-name">{{ testimonial.name }}</p>
          <p class="testimonial-album">
            Álbum favorito: <em>{{ testimonial.album }}</em>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    name: 'Carla Mendoza',
    text: '¡El mejor sitio para encontrar mis discos favoritos! Envío rápido y excelente atención.',
    album: 'Paranoid - Black Sabbath',
    photo: '/images/clientes/fan1.webp',
  },
  {
    name: 'Luis Torres',
    text: 'Pedí un vinilo y llegó en perfectas condiciones. ¡Repetiré sin duda!',
    album: 'Nevermind - Nirvana',
    photo: '/images/clientes/fan2.webp',
  },
  {
    name: 'Ana Velázquez',
    text: 'Gran catálogo y precios justos. Ideal para los que amamos el rock clásico.',
    album: 'The Wall - Pink Floyd',
    photo: '/images/clientes/fan3.webp',
  },
  {
    name: 'José Ramírez',
    text: '¡Amé la presentación del vinilo que compré! Cuidan cada detalle.',
    album: 'Ten - Pearl Jam',
    photo: '/images/clientes/fan4.webp',
  },
];
</script>

<style scoped>
  h2 {
    color: var(--color-accent);
    font-size: 2.2rem;
    font-family: 'Nova Square', sans-serif;
    text-transform: uppercase;
  }


.testimonials {
  background-color: var(--color-background-dark);
  color: var(--color-text-light);
  padding: 50px 20px 100px; 
  text-align: center;
}

.testimonials h2 {
  color: var(--color-accent);
  margin-bottom: 40px;
  font-size: 2rem;
}

.testimonial-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .testimonial-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.testimonial-card {
  background-color: var(--color-card-bg); 
  border: 1px solid var(--color-border-light);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 15px;
  align-items: center;
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.testimonial-photo {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-accent);
}

.testimonial-info {
  flex: 1;
}
 
.testimonial-text {
  font-style: italic;
  color: var(--color-text-muted);
  margin-bottom: 8px;
}

.testimonial-name {
  font-weight: bold;
  color: var(--color-text-light);
}

.testimonial-album {
  color: var(--color-accent-alt);
  font-size: 0.9rem;
}
</style>

