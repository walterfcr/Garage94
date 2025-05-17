<template>
  <header class="header">
    <div class="logo">
      <img src="/images/logo.png" alt="Logo" />
    </div>

    <!-- Hamburger menu icon for mobile -->
    <button class="hamburger" @click="toggleMenu" aria-label="Toggle menu">
      &#9776;
    </button>

    <!-- Navigation menu -->
    <nav class="nav-menu" :class="{'active': menuActive}">
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
            <li><a href="/ropa/shoes">Shoes</a></li>
            <li><a href="/ropa/accesorios">Accesorios</a></li>
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
      menuActive: false, // To control menu visibility
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
}

.logo img {
  height: 75px;
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

.has-submenu .submenu a{
color: var(--color-text-light);
}

.submenu li {
  margin: 5px 0;
  padding: 10px 15px;
  list-style: none;
  border-radius: 5px;
  transition: background-color 0.2s ease;
  color: var(--color-text-light);
}

.submenu li:hover {
  background-color: var(--color-background-dark);
}

/* Header actions */
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

/* Hamburger */
.hamburger {
  display: none;
  font-size: 30px;
  background: none;
  border: none;
  color: var(--color-text-light);
  cursor: pointer;
}

/* Mobile Menu */
.nav-menu {
  display: flex;
}

.nav-menu.active {
  display: block;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background-color: var(--color-background-dark);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.nav-menu ul {
  flex-direction: column;
  gap: 10px;
}

.nav-menu li {
  text-align: center;
}

/* Responsive */
@media screen and (max-width: 768px) {
  .hamburger {
    display: block;
  }

  .nav-menu {
    display: none;
  }

  .nav-menu ul {
    flex-direction: column;
    padding: 10px;
  }

  .nav-menu li {
    padding: 10px;
  }

  .header-actions {
    display: none;
  }

  .has-submenu .submenu {
    display: none;
  }

  .has-submenu:hover .submenu {
    display: block;
  }

  .header {
  padding: 10px 30px;

}
}

@media screen and (min-width: 769px) {
  .hamburger {
    display: none;
  }

  .nav-menu {
    display: flex;
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
