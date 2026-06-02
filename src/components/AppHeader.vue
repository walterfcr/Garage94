<template>
  <header class="header">
    <div class="logo">
      <img src="/images/logo.png" alt="Logo" />
    </div>

    <button class="hamburger" @click="toggleMenu" aria-label="Toggle menu">
      ☰
    </button>

    <nav class="nav-menu" :class="{ active: menuActive }">
      <div class="search-box mobile-search-box">
        <input
          v-model="textoABuscar"
          type="text"
          placeholder="Buscar discos, ropa..."
          @keyup.enter="ejecutarBusqueda"
        />
        <button @click="ejecutarBusqueda">🔍</button>
      </div>

      <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/nosotros">Nosotros</a></li>
        <li class="has-submenu">
          <a href="#">Música</a>
          <ul class="submenu">
            <li>
              <router-link to="/catalogo/Punk Rock" @click="closeMenu"
                >CDs Punk Rock</router-link
              >
            </li>
            <li>
              <router-link to="/catalogo/Hardcore" @click="closeMenu"
                >CDs Hardcore</router-link
              >
            </li>
            <li>
              <router-link to="/catalogo/Metal" @click="closeMenu"
                >CDs Metal</router-link
              >
            </li>
            <li>
              <router-link to="/catalogo/Grunge" @click="closeMenu"
                >CDs Grunge</router-link
              >
            </li>
            <li>
              <router-link to="/catalogo/Alternativo" @click="closeMenu"
                >CDs Rock Alternativo</router-link
              >
            </li>
            <li>
              <router-link to="/catalogo/Ska" @click="closeMenu"
                >CDs Ska</router-link
              >
            </li>
            <li>
              <router-link to="/catalogo/Hip Hop" @click="closeMenu"
                >CDs Hip Hop</router-link
              >
            </li>
            <li>
              <router-link to="/catalogo/Rock Progresivo" @click="closeMenu"
                >CDs Rock Progresivo</router-link
              >
            </li>
          </ul>
        </li>
        <li class="has-submenu">
          <a href="#">Mercadería</a>
          <ul class="submenu">
            <li>
              <router-link to="/ropa/punk" @click="closeMenu"
                >Camisetas Punk / Ska</router-link
              >
            </li>
            <li>
              <router-link to="/ropa/metal" @click="closeMenu"
                >Camisetas Metal / Progresivo</router-link
              >
            </li>
            <li>
              <router-link to="/ropa/grunge" @click="closeMenu"
                >Camisetas Grunge / Alternativo</router-link
              >
            </li>
            <li>
              <router-link to="/ropa/mujer" @click="closeMenu"
                >Ropa Mujer</router-link
              >
            </li>
            <li>
              <router-link to="/mercancia/accesorios" @click="closeMenu"
                >Accesorios</router-link
              >
            </li>
            <li>
              <router-link to="/mercancia/coleccionables" @click="closeMenu"
                >Artículos Coleccionables</router-link
              >
            </li>
          </ul>
        </li>
        <li><a href="/contacto">Contacto</a></li>
      </ul>
    </nav>

    <div class="header-actions">
      <button>🛒</button>
      <button>Login</button>
      <div class="search-box desktop-search-box">
        <input
          v-model="textoABuscar"
          type="text"
          placeholder="Buscar discos, ropa..."
          @keyup.enter="ejecutarBusqueda"
        />
        <button @click="ejecutarBusqueda">🔍</button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      menuActive: false,
      textoABuscar: '', // 🔍 Guardará lo que el usuario escribe en el input
    }
  },
  methods: {
    toggleMenu() {
      this.menuActive = !this.menuActive
    },
    closeMenu() {
      this.menuActive = false
    },

    /* 🚀 Método para disparar la búsqueda en Supabase */
    ejecutarBusqueda() {
      const queryLimpio = this.textoABuscar.trim()

      if (queryLimpio.length > 0) {
        // Redirige a la nueva vista pasando la palabra clave en la URL (?q=...)
        this.$router.push({ path: '/buscar', query: { q: queryLimpio } })

        this.textoABuscar = '' // Limpia el input para la siguiente búsqueda
        this.closeMenu() // Por si el usuario busca desde el menú móvil, aseguramos cerrarlo
      }
    },
  },
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 100px;
  background-color: var(--color-background-dark);
  border-bottom: 3px solid var(--color-border);
  color: var(--color-text-light);
  position: relative;
}

.logo img {
  height: 75px;
}

/* Hamburger */
.hamburger {
  display: none;
  font-size: 30px;
  background: none;
  border: none;
  color: var(--color-text-dark);
  cursor: pointer;
}

/* Nav Menu */
.nav-menu {
  display: flex;
}

.nav-menu ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-menu li {
  position: relative;
  margin: 0 15px;
  text-align: center;
}

.nav-menu a {
  text-decoration: none;
  color: var(--color-text-main);
  font-weight: bold;
  transition: color 0.3s;
}

.nav-menu a:hover {
  color: var(--color-text-dark-hover);
}

/* Submenu */
.has-submenu .submenu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  padding: 10px;
  min-width: 250px;
  z-index: 10;
}

.has-submenu:hover .submenu {
  display: block;
}

.has-submenu .submenu a {
  color: var(--color-text-light);
}

.submenu li {
  margin: 5px 0;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.2s ease;
}

.submenu li:hover {
  background-color: var(--color-background-dark);
}

/* Header Actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-actions input {
  padding: 5px 10px;
  border: 1px solid var(--color-border-light);
  border-radius: 3px;
  background-color: var(--color-surface);
  color: var(--color-text-light);
}

.header-actions button {
  background-color: var(--color-button-bg);
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.header-actions button:hover {
  background-color: var(--color-button-hover);
}

/* --- CONTENEDOR DEL BUSCADOR --- */
.search-box {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 0, 85, 0.3); /* Borde sutil rosa */
  border-radius: 20px;
  padding: 4px 14px;
  transition: all 0.3s ease;
  max-width: 300px;
  width: 100%;
}

.search-box:focus-within {
  border-color: var(--color-accent); /* Brilla en rosa neón al hacer click */
  box-shadow: 0 0 10px rgba(255, 0, 85, 0.2);
  background: rgba(255, 255, 255, 0.06);
}

/* --- INPUT DE TEXTO --- */
.search-box input {
  background: transparent;
  border: none;
  outline: none;
  color: var(--color-text-dark);
  font-family: 'Roboto', sans-serif;
  font-size: 0.85rem;
  width: 100%;
  padding: 6px 0;
}

.search-box input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

/* --- BOTÓN LUPA --- */
.search-box button {
  background: transparent;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 0.9rem;
  padding-left: 8px;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
}

.search-box button:hover {
  color: var(--color-accent); /* La lupa se ilumina en rosa al pasar el mouse */
}

/* Responsive */
@media screen and (max-width: 768px) {
  .header {
    flex-wrap: wrap;
    padding: 10px 30px;
  }

  .hamburger {
    display: block;
    z-index: 1100;
    position: relative;
  }

  .nav-menu {
    display: none;
    flex-direction: column;
    width: 100%;
    background-color: var(--color-background-dark);
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
  }

  .nav-menu a {
    color: var(--color-text-light);
  }

  .nav-menu.active {
    display: flex;
  }

  .nav-menu ul {
    flex-direction: column;
    padding: 10px;
  }

  .nav-menu li {
    padding: 10px 0;
  }

  .header-actions {
    display: none;
  }

  .has-submenu .submenu {
    display: none;
    position: relative;
    background-color: var(--color-surface);
    border: none;
    padding: 0;
  }

  .has-submenu:hover .submenu {
    display: block;
  }
}
.mobile-search-box {
  display: none !important;
}

@media (max-width: 768px) {
  .desktop-search-box {
    display: none !important;
  }

  .mobile-search-box {
    display: flex !important;
    margin: 20px auto;
    width: 85%;
    color: var(--color-text-light) !important;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--color-accent);
    border-radius: 20px;
    padding: 6px 14px;
  }
}

@media screen and (min-width: 769px) {
  .hamburger {
    display: none;
  }

  .nav-menu {
    display: flex !important;
  }

  .nav-menu ul {
    flex-direction: row;
  }

  .nav-menu li {
    margin: 0 15px;
  }

  .header-actions {
    display: flex;
  }

  .has-submenu .submenu {
    display: none;
  }

  .has-submenu:hover .submenu {
    display: block;
  }
}
</style>
