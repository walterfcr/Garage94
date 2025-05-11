<template>
  <footer class="site-footer">
    <div class="footer-content">
      <!-- Logo or brand name -->
      <div class="footer-logo">
        <img src="/images/logo.png" alt="Logo" />
      </div>

      <!-- Navigation links -->
      <div class="footer-links">
        <div class="link-column">
          <h4>Música</h4>
          <ul>
            <li><router-link to="/punk-rock">Punk Rock</router-link></li>
            <li><router-link to="/hard-core">Hardcore</router-link></li>
            <li><router-link to="/metal-music">Metal</router-link></li>
            <li><router-link to="/grunge-music">Grunge</router-link></li>
          </ul>
        </div>
        <div class="link-column">
          <h4>Mercadería</h4>
          <ul>
            <li><a href="/ropa/shirts">Shirts</a></li>
            <li><a href="/ropa/shoes">Shoes</a></li>
            <li><a href="/ropa/accesorios">Accesorios</a></li>
          </ul>
        </div>
        <div class="link-column">
          <h4>Nosotros</h4>
          <ul>
            <li><a href="/nosotros">Acerca de</a></li>
            <li><a href="/contacto">Contacto</a></li>
            <li><a href="/politica-privacidad">Privacidad</a></li>
          </ul>
        </div>
      </div>

      <!-- Social and copyright -->
      <div class="footer-bottom">
        <div class="social-icons">
          <a href="#" aria-label="Instagram">📷</a>
          <a href="#" aria-label="Facebook">📘</a>
          <a href="#" aria-label="Twitter">🐦</a>
        </div>
        <p>&copy; {{ new Date().getFullYear() }} TuMarca. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style scoped>
.site-footer {
  background-color: var(--color-surface);
  color: var(--color-text-light);
  padding: 3rem 1.5rem;
}

.footer-content {
  max-width: 1200px;
  margin: auto;
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr;
}

.footer-logo img {
  max-width: 120px;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-between;
}

.link-column h4 {
  color: var(--color-accent);
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.link-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.link-column li {
  margin: 0.3rem 0;
}

.link-column a {
  color: var(--color-text-muted);
  text-decoration: none;
}

.link-column a:hover {
  color: var(--color-accent-hover);
}

.footer-bottom {
  border-top: 1px solid var(--color-border);
  padding-top: 1.5rem;
  text-align: center;
}

.social-icons {
  margin-bottom: 0.5rem;
}

.social-icons a {
  color: var(--color-accent);
  margin: 0 0.5rem;
  font-size: 1.2rem;
  text-decoration: none;
}

.social-icons a:hover {
  color: var(--color-accent-hover);
}

</style>