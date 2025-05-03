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
            <li><router-link to="/reggae-music">Reggae</router-link></li> 
            <li><router-link to="/hip-hop">Hip Hop</router-link></li> 
            <li><router-link to="/rock-progresivo">Rock Progresivo</router-link></li> 
          </ul>
        </li>
        <li class="has-submenu">
          <a href="#">Ropa</a>
          <ul class="submenu">
            <li><a href="/ropa/shirts">Shirts</a></li>
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
/* Header */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
  background-color: #fff;
   border-bottom: 5px solid var(--border-gray);
}

.logo img {
  height: 50px;
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
  color: var(--accent-blue);
  font-weight: bold;
}

.nav-menu a:hover {
  color: var(--accent-blue-hover);
}

/* Submenu */
.has-submenu .submenu {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  min-width: 150px;
  z-index: 10;
}

.has-submenu:hover .submenu {
  display: block;
}

.submenu li {
  margin: 5px 0;
  padding: 10px 15px;
  list-style: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.submenu li:hover {
  background-color: #f0f0f0; /* subtle hover effect */
}

/* Header actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-actions input {
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 3px;
}

/* Hamburger menu (for mobile) */
.hamburger {
  display: none;
  font-size: 30px;
  background: none;
  border: none;
  cursor: pointer;
}

/* Mobile menu styles */
.nav-menu {
  display: flex;
}

.nav-menu.active {
  display: block;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.nav-menu ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-menu li {
  text-align: center;
}

/* Media Query for Mobile (768px and below) */
@media screen and (max-width: 768px) {
  .hamburger {
    display: block; /* Show hamburger icon on mobile */
  }

  .nav-menu {
    display: none; /* Hide nav menu by default */
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .nav-menu ul {
    display: flex;
    flex-direction: column;
    padding: 10px;
  }

  .nav-menu li {
    padding: 10px;
    text-align: center;
  }

  .header-actions {
    display: none; /* Optionally hide header actions on mobile */
  }

  .has-submenu .submenu {
    display: none;
  }

  .has-submenu:hover .submenu {
    display: block;
  }
}

/* Media Query for Desktop (Above 768px) */
@media screen and (min-width: 769px) {
  .hamburger {
    display: none; /* Hide hamburger icon on desktop */
  }

  .nav-menu {
    display: flex; /* Show menu horizontally on desktop */
  }

  .nav-menu ul {
    display: flex; /* Horizontal layout */
    flex-direction: row;
  }

  .nav-menu li {
    margin: 0 15px; /* Keep the spacing */
  }

  .header-actions {
    display: flex;
    gap: 10px;
  }

  /* Ensure the submenus are shown on hover in desktop */
  .has-submenu .submenu {
    display: none;
  }

  .has-submenu:hover .submenu {
    display: block;
  }
}
</style>
