<template>
  <div class="login-container">
    <div class="login-card" data-aos="fade-up">
      <h2 class="login-title">Iniciar Sesión</h2>
      <p class="login-subtitle">Ingresa a Garage94</p>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="input-group">
          <label for="email">Correo Electrónico</label>
          <input
            v-model="email"
            type="email"
            id="email"
            placeholder="correo@ejemplo.com"
            required
          />
        </div>

        <div class="input-group">
          <label for="password">Contraseña</label>
          <input
            v-model="password"
            type="password"
            id="password"
            placeholder="••••••••"
            required
          />
        </div>

        <div v-if="errorMessage" class="error-badge">⚠️ {{ errorMessage }}</div>

        <button type="submit" :disabled="loading" class="btn-login">
          {{ loading ? 'Cargando...' : 'Entrar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/services/supabase.js'

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      errorMessage: null,
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      this.errorMessage = null

      try {
        // 🔐 Intentamos iniciar sesión en Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
          email: this.email,
          password: this.password,
        })

        if (error) throw error

        // 🎉 Si el login es exitoso, redirigimos al Home o vista principal
        alert('¡Bienvenido de vuelta a Garage94!')
        this.$router.push('/')
      } catch (error) {
        // Manejo de errores amigables en español
        if (error.message === 'Invalid login credentials') {
          this.errorMessage =
            'Credenciales inválidas. Verifica tu correo o contraseña.'
        } else {
          this.errorMessage = error.message
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background: var(--color-background);
  padding: 20px;
}

.login-card {
  background: var(--color-surface);
  border: 2px solid var(--color-border-glow);
  border-radius: 12px;
  padding: 2.5rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  text-align: center;
}

.login-title {
  font-family: 'Nova Square', sans-serif;
  color: var(--color-text-main);
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.login-subtitle {
  color: var(--color-text-muted);
  font-size: 1rem;
  margin-bottom: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-group {
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  color: var(--color-text-main);
  font-size: 0.9rem;
  font-weight: bold;
}

.input-group input {
  background: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 12px;
  color: var(--color-text-main);
  font-size: 1rem;
  transition: border-color 0.3s;
}

.input-group input:focus {
  outline: none;
  border-color: var(--color-accent);
}

.error-badge {
  background: rgba(255, 0, 85, 0.1);
  border: 1px solid var(--color-accent);
  color: var(--color-text-main);
  padding: 10px;
  border-radius: 6px;
  font-size: 0.9rem;
}

.btn-login {
  background: var(--color-button-bg);
  color: var(--color-text-main);
  border: none;
  border-radius: 6px;
  padding: 14px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition:
    background 0.3s,
    transform 0.1s;
}

.btn-login:hover:not(:disabled) {
  background: var(--color-button-hover);
  transform: translateY(-2px);
}

.btn-login:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
