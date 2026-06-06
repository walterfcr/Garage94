<template>
  <div>
    <h2>Gestión de Productos</h2>

    <div v-if="loading">Cargando productos...</div>

    <div v-else>
      <p>Total productos: {{ products.length }}</p>
      <div class="search-box">
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Buscar por nombre, banda o código..."
        />
      </div>
      <div class="filters">
        <select v-model="selectedType">
          <option value="">Todos</option>
          <option value="CD">CD</option>
          <option value="vinyl">Vinyl</option>
          <option value="Clothing">Clothing</option>
          <option value="Accesorio">Accesorio</option>
          <option value="Coleccionables">Coleccionables</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Banda</th>
            <th>Tipo</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="product in paginatedProducts" :key="product.id">
            <td>{{ product.name }}</td>
            <td>{{ product.band }}</td>
            <td>{{ product.type }}</td>
            <td>{{ product.price }}</td>
            <td>
              <button @click="editProduct(product)">✏️ Editar</button>
              <button @click="deleteProduct(product)">🗑️ Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="currentPage--" :disabled="currentPage === 1">
          Anterior
        </button>

        <span> Página {{ currentPage }} de {{ totalPages }} </span>

        <button @click="currentPage++" :disabled="currentPage === totalPages">
          Siguiente
        </button>
      </div>
      <div
        v-if="selectedProduct"
        class="modal-overlay"
        @click.self="selectedProduct = null"
      >
        <div class="modal-content">
          <h3>Editando: {{ selectedProduct.name }}</h3>
          <p><strong>ID:</strong> {{ selectedProduct.id }}</p>
          <p><strong>SKU:</strong> {{ selectedProduct.item_number }}</p>
          <p><strong>Tipo:</strong> {{ selectedProduct.type }}</p>

          <input v-model="selectedProduct.name" type="text" />

          <input v-model="selectedProduct.band" type="text" />

          <input v-model.number="selectedProduct.price" type="number" />

          <div class="edit-layout">
            <div class="description-column">
              <h4>Descripción</h4>

              <textarea
                v-model="selectedProduct.description"
                rows="12"
              ></textarea>
            </div>

            <div class="image-column">
              <h4>Imagen actual</h4>

              <img
                :src="selectedProduct.image"
                alt=""
                class="product-preview"
              />

              <input type="file" @change="handleNewImage" />
            </div>
          </div>

          <div class="modal-actions">
            <button @click="saveProduct">💾 Guardar</button>

            <button @click="selectedProduct = null">❌ Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/services/supabase'

export default {
  name: 'ProductManager',

  data() {
    return {
      products: [],
      loading: true,
      currentPage: 1,
      itemsPerPage: 20,
      selectedProduct: null,
      newImageFile: null,
      searchTerm: '',
      selectedType: '',
      newImageFile: null,
    }
  },

  async mounted() {
    await this.loadProducts()
  },

  computed: {
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage

      return this.filteredProducts.slice(start, end)
    },

    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage)
    },
    filteredProducts() {
      let filtered = this.products

      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase()

        filtered = filtered.filter(
          (product) =>
            product.name?.toLowerCase().includes(term) ||
            product.band?.toLowerCase().includes(term) ||
            product.item_number?.toLowerCase().includes(term),
        )
      }

      if (this.selectedType) {
        filtered = filtered.filter(
          (product) => product.type === this.selectedType,
        )
      }

      return filtered
    },
  },

  methods: {
    handleNewImage(event) {
      this.newImageFile = event.target.files[0]
    },
    editProduct(product) {
      this.selectedProduct = { ...product }
    },
    async loadProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error

        this.products = data || []
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },
    async saveProduct() {
      try {
        let imageUrl = this.selectedProduct.image

        if (this.newImageFile) {
          const fileName = `${this.selectedProduct.item_number}-${Date.now()}-${this.newImageFile.name}`

          const { error: uploadError } = await supabase.storage
            .from('products')
            .upload(fileName, this.newImageFile)

          if (uploadError) throw uploadError

          const { data } = supabase.storage
            .from('products')
            .getPublicUrl(fileName)

          imageUrl = data.publicUrl
        }
        const { error } = await supabase
          .from('products')
          .update({
            name: this.selectedProduct.name,
            band: this.selectedProduct.band,
            price: this.selectedProduct.price,
            description: this.selectedProduct.description,
            image: imageUrl,
          })
          .eq('id', this.selectedProduct.id)

        if (error) throw error

        alert('Producto actualizado')
        this.newImageFile = null
        this.selectedProduct = null

        await this.loadProducts()
      } catch (error) {
        console.error(error)
        alert(error.message)
      }
    },
    async deleteProduct(product) {
      const confirmDelete = confirm(`¿Eliminar "${product.name}"?`)

      if (!confirmDelete) return

      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', product.id)

        if (error) throw error

        alert('Producto eliminado')

        await this.loadProducts()
      } catch (error) {
        console.error(error)
        alert(error.message)
      }
    },
    handleNewImage(event) {
      const file = event.target.files[0]

      if (!file) return

      this.newImageFile = file

      this.selectedProduct.image = URL.createObjectURL(file)
    },
  },
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 12px;
  border: 1px solid #333;
  text-align: left;
}

th {
  background: #1a1a1a;
}

tr:hover {
  background: rgba(255, 255, 255, 0.03);
}

.pagination {
  margin-top: 20px;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
}

.pagination button {
  padding: 8px 16px;
  cursor: pointer;
}
.modal-overlay {
  position: fixed;
  inset: 0;

  background: rgba(0, 0, 0, 0.85);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 9999;
}

.modal-content {
  width: 750px;
  max-width: 90vw;

  background: var(--color-background-darker);
  border: 1px solid var(--color-border);
  border-radius: 8px;

  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
}

.modal-content h3 {
  margin: 0;
  color: var(--color-accent-alt);
}

.modal-content p {
  padding: 0;
  margin: 0;
  font-size: 0.8rem;
}

.modal-content input,
.modal-content textarea {
  width: 100%;

  background: var(--color-surface);
  color: var(--color-text-main);
  font-size: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;

  padding: 12px;

  outline: none;
}

.modal-content input:focus,
.modal-content textarea:focus {
  border-color: var(--color-accent);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  margin-top: 1rem;
}

.modal-actions button {
  border: none;
  border-radius: 6px;

  padding: 12px 20px;

  cursor: pointer;
  font-weight: bold;

  transition: 0.3s;
}

.modal-actions button:first-child {
  background: var(--color-accent);
  color: white;
}

.modal-actions button:first-child:hover {
  background: var(--color-accent-hover);
}

.modal-actions button:last-child {
  background: var(--color-surface);
  color: var(--color-text-main);
  border: 1px solid var(--color-border);
}

.modal-actions button:last-child:hover {
  background: var(--color-card-bg);
}

.edit-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  align-items: start;
}

.image-column {
  display: flex;
  flex-direction: column;
}

.edit-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.description-column,
.image-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.description-column textarea {
  min-height: 275px;
  resize: vertical;
}

.product-preview {
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.search-box {
  margin: 1rem 0;
}

.search-box input {
  width: 100%;
  max-width: 500px;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border);
  color: var(--color-text-main);
  padding: 12px;
  border-radius: 8px;
}
.filters {
  margin-bottom: 1rem;
}

.filters select {
  background: var(--color-card-bg);
  color: var(--color-text-main);
  border: 1px solid var(--color-border);
  padding: 12px;
  border-radius: 8px;
  min-width: 220px;
}
</style>
