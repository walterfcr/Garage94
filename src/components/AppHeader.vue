<template>
  <header class="header">
    <div class="logo">
      <router-link to="/">
        <img src="/images/logo.png" alt="Logo Garage94" />
      </router-link>
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
        <li><router-link to="/" @click="closeMenu">Inicio</router-link></li>
        <li>
          <router-link to="/nosotros" @click="closeMenu">Nosotros</router-link>
        </li>

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
        <li>
          <router-link to="/orden" @click="closeMenu"
            >Rastrea Pedido</router-link
          >
        </li>
        <li>
          <router-link to="/contacto" @click="closeMenu">Contacto</router-link>
        </li>

        <li class="mobile-actions-li">
          <router-link
            to="/carrito"
            class="btn-nav-action-mobile"
            @click="closeMenu"
          >
            🛒 Carrito ({{ cartCount }})
          </router-link>
          <router-link
            to="/login"
            class="btn-nav-action-mobile login-mobile"
            @click="closeMenu"
          >
            👤 Login
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="header-actions">
      <router-link
        to="/carrito"
        class="btn-action cart-btn-wrap"
        title="Ver mi carrito"
      >
        <span class="icon">🛒</span>
        <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
      </router-link>

      <router-link
        to="/login"
        class="btn-action login-btn"
        title="Iniciar sesión"
      >
        Login
      </router-link>

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
import { cartService } from '@/services/cartService.js'

export default {
  name: 'AppHeader',
  data() {
    return {
      menuActive: false,
      textoABuscar: '',
      cartCount: 0,
    }
  },
  methods: {
    toggleMenu() {
      this.menuActive = !this.menuActive
    },
    closeMenu() {
      this.menuActive = false
    },
    ejecutarBusqueda() {
      const queryLimpio = this.textoABuscar.trim()
      if (queryLimpio.length > 0) {
        this.$router.push({ path: '/buscar', query: { q: queryLimpio } })
        this.textoABuscar = ''
        this.closeMenu()
      }
    },

    actualizarContador() {
      const items = cartService.getCart()
      this.cartCount = items.reduce((acc, item) => acc + item.quantity, 0)
    },
  },
  mounted() {
    this.actualizarContador()

    window.addEventListener('cart-updated', this.actualizarContador)
  },
  beforeUnmount() {
    window.removeEventListener('cart-updated', this.actualizarContador)
  },
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 40px;
  background-color: var(--color-background-dark);
  border-bottom: 3px solid var(--color-border);
  color: var(--color-text-light);
  position: relative;
}

.logo img {
  height: 65px;
  transition: transform 0.3s ease;
}
.logo img:hover {
  transform: scale(1.05);
}

.hamburger {
  display: none;
  font-size: 28px;
  background: none;
  border: none;
  color: var(--color-text-light);
  cursor: pointer;
}

.nav-menu {
  display: flex;
  align-items: center;
}

.nav-menu ul {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-menu li {
  position: relative;
  margin: 0 12px;
}

.nav-menu a {
  text-decoration: none;
  color: var(--color-text-muted);
  font-size: 0.95rem;
  font-weight: bold;
  transition: color 0.2s ease;
}

.nav-menu a:hover,
.router-link-active {
  color: var(--color-accent) !important;
}

.has-submenu .submenu {
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-surface);
  border: 2px solid var(--color-border);
  padding: 8px 0;
  min-width: 240px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.has-submenu:hover .submenu {
  display: block;
}

.submenu li a {
  display: block;
  color: var(--color-text-light) !important;
  padding: 10px 16px;
  font-size: 0.88rem;
  font-weight: normal;
}

.submenu li a:hover {
  background-color: var(--color-background-dark);
  color: var(--color-accent) !important;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.btn-action {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface);
  border: 1px solid var(--color-border-light);
  color: var(--color-text-light);
  text-decoration: none;
  height: 38px;
  padding: 0 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-action:hover {
  background: #363636;
  border-color: var(--color-text-muted);
}

.login-btn {
  background: var(--color-button-bg);
  border: none;
}
.login-btn:hover {
  background: var(--color-button-hover);
}

.cart-btn-wrap {
  position: relative;
  width: 42px;
  padding: 0;
  border-radius: 50%;
}
.cart-btn-wrap .icon {
  font-size: 1.1rem;
}

.cart-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: var(--color-accent-alt);
  color: #121212;
  font-size: 0.7rem;
  font-weight: 900;
  min-width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  box-shadow: 0 0 8px var(--color-accent-alt);
}

.mobile-actions-li {
  display: none;
}

.search-box {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 0, 85, 0.2);
  border-radius: 20px;
  padding: 4px 14px;
  transition: all 0.3s ease;
}
.search-box input {
  background: transparent;
  border: none;
  outline: none;
  color: var(--color-text-light);
  font-size: 0.85rem;
  width: 100%;
}
.search-box button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding-left: 6px;
}

@media screen and (min-width: 769px) {
  .mobile-search-box {
    display: none !important;
  }
  .desktop-search-box {
    display: flex;
    width: 220px;
  }
  .desktop-search-box:focus-within {
    border-color: var(--color-accent);
    box-shadow: 0 0 8px rgba(255, 0, 85, 0.3);
    width: 260px;
  }
}

@media screen and (max-width: 768px) {
  .desktop-search-box {
    display: none !important;
  }

  .mobile-search-box {
    display: flex !important;
    margin: 15px auto;
    width: 90%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--color-accent);
  }

  .hamburger {
    display: block;
  }

  .nav-menu {
    display: none;
    flex-direction: column;
    width: 100%;
    background-color: var(--color-background-darker);
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    border-bottom: 2px solid var(--color-border);
  }

  .nav-menu.active {
    display: flex;
  }

  .nav-menu ul {
    flex-direction: column;
    width: 100%;
    padding: 15px 0;
  }

  .nav-menu li {
    width: 100%;
    margin: 0;
    padding: 0;
    text-align: left;
  }

  .nav-menu ul > li > a {
    display: block;
    padding: 12px 24px;
    color: var(--color-text-light) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
    transition: background-color 0.2s ease;
  }

  .nav-menu ul > li > a:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  .has-submenu .submenu {
    position: relative;
    transform: none;
    left: 0;
    width: 90%;
    margin: 5px auto;
    box-shadow: none;
    background: var(--color-background-dark);
  }

  .header-actions {
    display: none;
  }

  .mobile-actions-li {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 15px 20px 5px;
    width: 90% !important;
    margin: 0 auto;
  }
  .btn-nav-action-mobile {
    display: block;
    width: 100%;
    background: var(--color-surface);
    text-align: center;
    padding: 12px;
    border-radius: 8px;
    color: var(--color-text-light) !important;
    border: 1px solid var(--color-border-light);
  }
  .btn-nav-action-mobile.login-mobile {
    background: var(--color-accent);
    border: none;
  }
}
</style>
