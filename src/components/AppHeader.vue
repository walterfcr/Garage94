<template>
  <header class="header">
    <div class="logo">
      <img src="/images/logo.png" alt="Logo" />
    </div>

    <!-- Hamburger menu icon for mobile -->
    <button class="hamburger" @click="toggleMenu" aria-label="Toggle menu">
      ☰
    </button>

    <!-- Navigation menu -->
    <nav class="nav-menu" :class="{ active: menuActive }">
      <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/nosotros">Nosotros</a></li>
        <li class="has-submenu">
          <a href="#">Música</a>
          <ul class="submenu">
            <li><router-link to="/punk-rock">Punk Rock</router-link></li>
            <li><router-link to="/hard-core">Hardcore</router-link></li>
            <li><router-link to="/metal-music">Metal</router-link></li>
            <li><router-link to="/grunge-music">Grunge</router-link></li>
            <li><router-link to="/rock-alternativo">Rock Alternativo</router-link></li>
            <li><router-link to="/ska-music">Ska</router-link></li>
            <li><router-link to="/hip-hop">Hip Hop</router-link></li>
            <li><router-link to="/rock-progresivo">Rock Progresivo</router-link></li>
          </ul>
        </li>
        <li class="has-submenu">
          <a href="#">Mercadería</a>
          <ul class="submenu">
            <li><router-link to="/ropa-punk">Camisetas Punk</router-link></li>
            <li><router-link to="/ropa-metal">Camisetas Metal</router-link></li>
            <li><router-link to="/ropa-grunge">Camisetas Grunge</router-link></li>
          </ul>
        </li>
        <li><a href="/contacto">Contacto</a></li>
      </ul>
    </nav>

    <div class="header-actions">
      <button>🛒</button>
      <button>Login</button>
      <input type="text" placeholder="Buscar..." />
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      menuActive: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuActive = !this.menuActive;
    },
  },
};
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 100px;
  background-color: var(--color-background-light);
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
  color: var(--color-text-dark);
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
  min-width: 150px;
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
