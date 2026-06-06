<template>
  <div>
    <h2>Gestión de Productos</h2>

    <div v-if="loading">Cargando productos...</div>

    <div v-else>
      <p>Total productos: {{ products.length }}</p>

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

          <input v-model="selectedProduct.name" type="text" />

          <input v-model="selectedProduct.band" type="text" />

          <textarea v-model="selectedProduct.description" rows="5"></textarea>

          <input v-model.number="selectedProduct.price" type="number" />

          <input v-model="selectedProduct.image" type="text" />

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
    }
  },

  async mounted() {
    await this.loadProducts()
  },

  computed: {
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage

      return this.products.slice(start, end)
    },

    totalPages() {
      return Math.ceil(this.products.length / this.itemsPerPage)
    },
  },

  methods: {
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
        const { error } = await supabase
          .from('products')
          .update({
            name: this.selectedProduct.name,
            band: this.selectedProduct.band,
            price: this.selectedProduct.price,
            description: this.selectedProduct.description,
            image: this.selectedProduct.image,
          })
          .eq('id', this.selectedProduct.id)

        if (error) throw error

        alert('Producto actualizado')

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
  color: var(--color-accent);
}

.modal-content input,
.modal-content textarea {
  width: 100%;

  background: var(--color-surface);
  color: var(--color-text-main);

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
</style>
