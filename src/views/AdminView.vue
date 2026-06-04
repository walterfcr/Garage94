<template>
  <div class="admin-container">
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <h2>G94 Admin</h2>
      </div>
      <nav class="sidebar-nav">
        <a href="#" class="active">📦 Agregar Producto</a>
        <a href="#">🧾 Órdenes</a>
      </nav>
      <div class="sidebar-footer">
        <button @click="handleLogout" class="btn-logout">
          🔑 Cerrar Sesión
        </button>
      </div>
    </aside>

    <main class="admin-content">
      <header class="content-header">
        <h1>Panel de Gestión de Productos</h1>
        <div class="admin-badge">Admin Mode</div>
      </header>

      <section class="form-section">
        <div class="form-card">
          <h3>🚀 Subir Artículo al Inventario Real</h3>

          <form @submit.prevent="handleSubmit" class="product-form">
            <div class="form-row">
              <div class="form-group flex-2">
                <label>Nombre del Artículo *</label>
                <input
                  v-model="product.name"
                  type="text"
                  placeholder="Ej: Camiseta Circle Jerks o Riot, Riot, Upstart"
                  required
                />
              </div>
              <div class="form-group flex-1">
                <label>Tipo de Producto (type) *</label>
                <select v-model="product.type" required>
                  <option value="CD">Música: CD</option>
                  <option value="vinyl">Música: Vinyl</option>
                  <option value="Clothing">Ropa (Clothing)</option>
                  <option value="Accesorio">Mercancía: Accesorio</option>
                  <option value="Coleccionables">
                    Mercancía: Coleccionables
                  </option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Precio (₡ o $) *</label>
                <input
                  v-model.number="product.price"
                  type="number"
                  placeholder="Ej: 12000"
                  required
                />
              </div>

              <div
                v-if="product.type === 'Clothing'"
                class="form-group stock-tallas-box"
              >
                <label>Inventario por Tallas *</label>
                <div class="tallas-grid">
                  <div class="talla-input-item">
                    <span>S</span>
                    <input
                      type="number"
                      v-model.number="product.stock.S"
                      min="0"
                    />
                  </div>
                  <div class="talla-input-item">
                    <span>M</span>
                    <input
                      type="number"
                      v-model.number="product.stock.M"
                      min="0"
                    />
                  </div>
                  <div class="talla-input-item">
                    <span>L</span>
                    <input
                      type="number"
                      v-model.number="product.stock.L"
                      min="0"
                    />
                  </div>
                  <div class="talla-input-item">
                    <span>XL</span>
                    <input
                      type="number"
                      v-model.number="product.stock.XL"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <div v-else class="form-group">
                <label>Stock Disponible *</label>
                <input
                  v-model.number="product.stock.unidad"
                  type="number"
                  placeholder="10"
                  min="0"
                  required
                />
              </div>

              <div class="form-group">
                <label>Código de Artículo (item_number) *</label>
                <input
                  v-model="product.item_number"
                  type="text"
                  placeholder="Ej: CLTH-001 o 25869844X"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label>Ruta de la Imagen (image) *</label>
              <input
                v-model="product.image"
                type="text"
                placeholder="Ej: /images/ropa/punk/p-1.webp"
                required
              />
            </div>

            <div
              v-if="product.type === 'CD' || product.type === 'vinyl'"
              class="dynamic-section music-theme"
            >
              <h4>Detalles del Álbum Musical ({{ product.type }})</h4>
              <div class="form-row">
                <div class="form-group">
                  <label>Banda / Artista (band) *</label>
                  <input
                    v-model="product.band"
                    type="text"
                    placeholder="Ej: Agnostic Front"
                    :required="isMusic"
                  />
                </div>
                <div class="form-group">
                  <label>Género Principal (genre) *</label>
                  <select v-model="product.genre" :required="isMusic">
                    <option value="" disabled>
                      -- Selecciona un Género --
                    </option>
                    <option value="Punk Rock">Punk</option>
                    <option value="Metal">Metal</option>
                    <option value="Hardcore">Hardcore</option>
                    <option value="Grunge">Grunge</option>
                    <option value="Rock Alternativo">Rock Alternativo</option>
                    <option value="Ska">Ska</option>
                    <option value="Hip Hop">Hip Hop</option>
                    <option value="Rock Progresivo">Rock Progresivo</option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Discográfica (label)</label>
                  <input
                    v-model="product.label"
                    type="text"
                    placeholder="Ej: Epitaph Records"
                  />
                </div>
                <div class="form-group">
                  <label>Número de Discos (num_discs)</label>
                  <input
                    v-model.number="product.num_discs"
                    type="number"
                    placeholder="1"
                  />
                </div>
                <div class="form-group">
                  <label>Fecha Lanzamiento (release_date)</label>
                  <input
                    v-model="product.release_date"
                    type="text"
                    placeholder="Ej: 07/09/1999"
                  />
                </div>
              </div>
              <div class="form-group">
                <label>Subgénero / Descripción Corta (genre_description)</label>
                <input
                  v-model="product.genre_description"
                  type="text"
                  placeholder="Ej: Hardcore Punk"
                />
              </div>
            </div>

            <div
              v-if="product.type === 'Clothing'"
              class="dynamic-section cloth-theme"
            >
              <h4>Atributos de Vestimenta</h4>
              <div class="form-row">
                <div class="form-group flex-1">
                  <label>Color</label>
                  <input
                    v-model="product.color"
                    type="text"
                    placeholder="Ej: Negro"
                  />
                </div>
                <div class="form-group flex-1">
                  <label>Categoría de Ropa (category) *</label>
                  <select
                    v-model="product.category"
                    :required="product.type === 'Clothing'"
                  >
                    <option value="" disabled>-- Elige Estilo --</option>
                    <option value="Punk">Punk</option>
                    <option value="Grunge">Grunge</option>
                    <option value="Metal">Metal</option>
                    <option value="Mujer">Mujer</option>
                  </select>
                </div>
              </div>
            </div>

            <div
              v-if="
                product.type === 'Accesorio' ||
                product.type === 'Coleccionables'
              "
              class="dynamic-section merch-theme"
            >
              <h4>Especificaciones de Mercancía ({{ product.type }})</h4>
              <div class="form-row">
                <div class="form-group">
                  <label>Material</label>
                  <input
                    v-model="product.material"
                    type="text"
                    placeholder="Ej: Plástico, Metal, Tela"
                  />
                </div>
                <div class="form-group">
                  <label>Dimensiones / Tamaño (length)</label>
                  <input
                    v-model="product.length"
                    type="text"
                    placeholder='Ej: 5,9" x 4,3"an'
                  />
                </div>
              </div>
            </div>

            <div class="form-group">
              <label>Descripción detallada del Producto (description) *</label>
              <textarea
                v-model="product.description"
                rows="4"
                placeholder="Escribe el texto comercial para tus clientes..."
                required
              ></textarea>
            </div>

            <button type="submit" :disabled="loading" class="btn-submit">
              {{
                loading
                  ? 'Enviando fila limpia a Postgres...'
                  : '💾 Guardar en Inventario'
              }}
            </button>
          </form>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { supabase } from '../services/supabase'

export default {
  name: 'AdminView',
  data() {
    return {
      loading: false,
      product: this.getInitialProductState(),
    }
  },
  computed: {
    isMusic() {
      return this.product.type === 'CD' || this.product.type === 'vinyl'
    },
  },
  methods: {
    getInitialProductState() {
      return {
        name: '',
        type: 'CD',
        price: null,
        stock: {
          unidad: 10,
          S: 0,
          M: 0,
          L: 0,
          XL: 0,
        },
        item_number: '',
        image: '',
        description: '',
        band: '',
        genre: '',
        genre_description: '',
        label: '',
        num_discs: null,
        release_date: '',
        category: '',
        sizes: [],
        color: '',
        material: '',
        length: '',
      }
    },
    async handleSubmit() {
      this.loading = true
      try {
        const payload = { ...this.product }

        if (payload.type === 'Clothing') {
          // 📦 1. ASIGNACIÓN INTELIGENTE AUTOMÁTICA DE TALLAS:
          // Filtramos las llaves del objeto stock para detectar cuáles tienen un valor mayor a 0
          const tallasActivas = []
          if (this.product.stock.S > 0) tallasActivas.push('S')
          if (this.product.stock.M > 0) tallasActivas.push('M')
          if (this.product.stock.L > 0) tallasActivas.push('L')
          if (this.product.stock.XL > 0) tallasActivas.push('XL')

          // Se inyecta automáticamente el array de strings al payload (ej: ['S', 'M'])
          payload.sizes = tallasActivas

          // Guardamos el desglose limpio en el JSON de stock
          payload.stock = {
            S: this.product.stock.S || 0,
            M: this.product.stock.M || 0,
            L: this.product.stock.L || 0,
            XL: this.product.stock.XL || 0,
          }
        } else {
          payload.stock = {
            unidad: this.product.stock.unidad || 0,
          }
        }

        const camposMusica = [
          'band',
          'genre',
          'genre_description',
          'label',
          'num_discs',
          'release_date',
        ]
        const camposRopa = ['category', 'sizes', 'color']
        const camposMercancia = ['material', 'length']

        if (payload.type !== 'CD' && payload.type !== 'vinyl') {
          camposMusica.forEach((campo) => delete payload[campo])
        }
        if (payload.type !== 'Clothing') {
          camposRopa.forEach((campo) => delete payload[campo])
        }
        if (payload.type !== 'Accesorio' && payload.type !== 'Coleccionables') {
          camposMercancia.forEach((campo) => delete payload[campo])
        }

        const { error } = await supabase.from('products').insert([payload])

        if (error) throw error

        alert('¡Producto guardado e inventario automatizado con éxito! ⚡')
        this.product = this.getInitialProductState()
      } catch (error) {
        alert('Error al guardar: ' + error.message)
      } finally {
        this.loading = false
      }
    },
    async handleLogout() {
      try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        this.$router.push('/login')
      } catch (error) {
        alert('Error: ' + error.message)
      }
    },
  },
}
</script>

<style scoped>
h1 {
  color: var(--color-text-main);
}

.admin-container {
  display: flex;
  min-height: 100vh;
  background: #0a0a0a;
  color: #fff;
  font-family: sans-serif;
}
.admin-sidebar {
  width: 260px;
  background: #121212;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem 1rem;
}
.sidebar-header h2 {
  font-family: 'Nova Square', sans-serif;
  color: #ff0055;
  text-align: center;
  text-transform: uppercase;
  margin: 0;
}
.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2rem;
  flex-grow: 1;
}
.sidebar-nav a {
  color: #b3b3b3;
  text-decoration: none;
  padding: 12px 15px;
  border-radius: 6px;
  font-weight: 500;
  transition: 0.3s;
}
.sidebar-nav a.active {
  background: rgba(255, 0, 85, 0.1);
  color: #fff;
  border-left: 4px solid #ff0055;
}
.btn-logout {
  width: 100%;
  background: #ff0055;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}
.admin-content {
  flex-grow: 1;
  padding: 2rem 3rem;
  background: #0d0d0d;
}
.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
}
.admin-badge {
  background: rgba(0, 230, 115, 0.1);
  border: 1px solid #00e673;
  color: #00e673;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: bold;
}

.form-card {
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 2.5rem;
  max-width: 750px;
  margin: 0 auto;
}
.form-card h3 {
  margin-bottom: 2rem;
  color: #ff0055;
  font-size: 1.4rem;
}
.product-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.form-row {
  display: flex;
  gap: 1.2rem;
}
.form-row .form-group {
  flex: 1;
}
.flex-2 {
  flex: 2 !important;
}
.flex-1 {
  flex: 1 !important;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.form-group label {
  font-size: 0.85rem;
  color: #a0a0a0;
}
.form-group input,
.form-group select,
.form-group textarea {
  background: #1e1e1e;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 11px;
  color: white;
  outline: none;
  font-size: 0.95rem;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #ff0055;
}

/* 🎨 SECCIÓN DE LAS CAJITAS DE STOCK CORREGIDA */
.stock-tallas-box {
  flex: 1.2 !important; /* Le damos un poco más de aire en la fila */
}
.tallas-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-top: 0.1rem;
}
.talla-input-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1e1e1e;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 6px 4px;
}
.talla-input-item span {
  font-size: 0.8rem;
  color: #00bcff;
  font-weight: bold;
  margin-bottom: 4px;
}
/* Forzamos a que el input interno ignore el padding alto global y se vea el número */
.talla-input-item input {
  width: 85% !important;
  padding: 5px 2px !important;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  background: #0d0d0d !important;
  border-radius: 4px;
  font-size: 0.9rem !important;
}

.dynamic-section {
  background: rgba(255, 255, 255, 0.015);
  padding: 1.5rem;
  border-radius: 6px;
  border-left: 4px solid;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.music-theme {
  border-color: #00e673;
}
.cloth-theme {
  border-color: #00bcff;
}
.merch-theme {
  border-color: #ffaa00;
}
.dynamic-section h4 {
  margin: 0 0 0.2rem 0;
  font-size: 1rem;
  font-weight: bold;
}

.btn-submit {
  background: #00e673;
  color: #000;
  border: none;
  padding: 14px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  transition: 0.3s;
}
.btn-submit:hover {
  background: #00c864;
}
.btn-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
