<template>
<div class="contacto-wrap">
  <div class="contact-form" data-aos="fade-up">
    <h2>Contacto</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" id="name" v-model="form.name" required />
      </div>

      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>

      <div class="form-group">
        <label for="message">Mensaje</label>
        <textarea id="message" v-model="form.message" rows="5" required></textarea>
      </div>

      <button type="submit" class="submit-button">Enviar</button>
    </form>

    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </div>
  <AppFooter />
</div>  
</template>

<script>
import AppFooter from '@/components/AppFooter.vue';

export default {
    components: {
    AppFooter,
    },
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
      successMessage: '',
    };
  },
  methods: {
    handleSubmit() {
      // Simulate form submission
      this.successMessage = '¡Gracias por tu mensaje!';
      this.form.name = '';
      this.form.email = '';
      this.form.message = '';
    },
  },
};
</script>

<style scoped>
.contacto-wrap{
    margin:100px 0 0;
}

.contact-form {
  background-color: var(--color-surface);
  padding: 30px;
  border-radius: 10px;
  color: var(--color-text-light);
  max-width: 600px;
  margin: 0 auto 100px;
  border: 1px solid var(--color-border-light);
  box-shadow: 0 0 15px rgba(255, 0, 85, 0.2);
}

@media (max-width:768px){
.contact-form{
    width:90%;
  }
}

.contact-form h2 {
  font-family: 'Nova Square', sans-serif;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  color: var(--color-text-muted);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  background-color: var(--color-background-dark);
  border: 1px solid var(--color-border-light);
  border-radius: 6px;
  color: var(--color-text-light);
  font-size: 16px;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 5px rgba(255, 0, 85, 0.4);
}

.submit-button {
  background-color: var(--color-button-bg);
  color: var(--color-text-light);
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: var(--color-button-hover);
}

.success-message {
  margin-top: 15px;
  color: var(--color-accent-alt);
  text-align: center;
}
</style>
