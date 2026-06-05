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

      <div class="demo-section">
        <h3>Acceso para Reclutadores</h3>
        <p>
          Haz clic abajo para ingresar con las credenciales del Administrador de
          la base de datos sin tener que escribir.
        </p>
        <button @click="cargarAdminDemo" class="btn-demo">
          ⚡ Ingresar como Admin Demo
        </button>
      </div>
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
    // ⚡ Autocompleta los datos del administrador único que tienes en 'profiles'
    cargarAdminDemo() {
      // Reemplaza estos strings por el correo y clave reales que creaste en tu Supabase Auth
      this.email = 'admin@garage94.com'
      this.password = 'admin1234'
      this.handleLogin()
    },

    async handleLogin() {
      this.loading = true
      this.errorMessage = null

      try {
        // 1. 🔐 Intentamos iniciar sesión en Supabase Auth
        const { data: authData, error: authError } =
          await supabase.auth.signInWithPassword({
            email: this.email,
            password: this.password,
          })

        if (authError) throw authError

        const user = authData.user

        // 2. 🛡️ REVISIÓN DE ROL: Consultamos la tabla 'profiles' para validar si es Admin
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role') // Si tu columna de rol se llama distinto, cámbiala aquí
          .eq('id', user.id)
          .single()

        if (profileError) {
          console.error(
            'Error al consultar tabla profiles:',
            profileError.message,
          )
        }

        // 3. 🔀 Redirección inteligente basada en permisos reales
        if (profile && profile.role === 'admin') {
          alert('¡Bienvenido de vuelta, Administrador de Garage94!')
          this.$router.push('/admin') // Lo mandamos al panel de control de órdenes
        } else {
          alert('¡Bienvenido de vuelta a Garage94!')
          this.$router.push('/') // Un cliente común o usuario sin rol va al Home
        }

        // Emitimos evento global por si necesitas que la cabecera actualice botones en tiempo real
        window.dispatchEvent(new Event('auth-state-changed'))
      } catch (error) {
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
  background: var(--color-background-darker, #121212);
  padding: 20px;
}

.login-card {
  background: var(--color-surface);
  border: 2px solid var(--color-border);
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
  background: var(--color-background-dark, #1f1f1f);
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

/* --- 🌟 AGREGADO DE ESTILO: SECCIÓN DEMO RECLUTADOR --- */
.demo-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px dashed var(--color-border);
  text-align: left;
}

.demo-section h3 {
  font-family: 'Nova Square', sans-serif;
  font-size: 1rem;
  color: var(--color-accent-alt, #ffba08); /* Amarillo neón de realce */
  margin-bottom: 0.4rem;
  text-transform: uppercase;
}

.demo-section p {
  font-size: 0.8rem;
  color: var(--color-text-dimmed, #888);
  line-height: 1.4;
  margin-bottom: 1rem;
}

.btn-demo {
  width: 100%;
  padding: 10px;
  background: transparent;
  border: 2px solid var(--color-accent-alt, #ffba08);
  color: var(--color-accent-alt, #ffba08);
  border-radius: 6px;
  font-weight: bold;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-demo:hover {
  background: var(--color-accent-alt, #ffba08);
  color: #121212;
  box-shadow: 0 0 10px rgba(255, 186, 8, 0.3);
}
</style>
