<template>
  <div class="cart-container">
    <h1>Tu Carrito de Compras</h1>

    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>No tienes productos en el carrito todavía.</p>
      <router-link to="/" class="btn-back">Ir a la tienda</router-link>
    </div>

    <div v-else class="cart-content">
      <div class="cart-items-list">
        <div
          v-for="(item, index) in cartItems"
          :key="index"
          class="cart-item-card"
        >
          <img :src="item.image" :alt="item.name" class="item-img" />

          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="item-meta">Item #: {{ item.item_number }}</p>
            <p v-if="item.size" class="item-size">
              Talla: <span>{{ item.size }}</span>
            </p>
            <p class="item-price">{{ formatPrice(item.price) }}</p>
          </div>

          <div class="item-quantity-controls">
            <p>
              Cant: <strong>{{ item.quantity }}</strong>
            </p>
          </div>
        </div>
      </div>

      <div class="cart-summary">
        <h2>Resumen de Orden</h2>
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>{{ formatPrice(totalCartPrice) }}</span>
        </div>
        <div class="summary-row total">
          <span>Total:</span>
          <span>{{ formatPrice(totalCartPrice) }}</span>
        </div>

        <hr />

        <h3>Datos de Envío</h3>
        <form @submit.prevent="checkout">
          <div class="form-group">
            <label>Nombre Completo:</label>
            <input
              type="text"
              v-model="customer.name"
              required
              placeholder="Ej: Walter..."
            />
          </div>
          <div class="form-group">
            <label>Teléfono:</label>
            <input
              type="text"
              v-model="customer.phone"
              required
              placeholder="Ej: 8888-8888"
            />
          </div>
          <div class="form-group">
            <label>Dirección de Entrega:</label>
            <textarea
              v-model="customer.address"
              required
              placeholder="Provincia, Cantón, Distrito y detalles..."
            ></textarea>
          </div>

          <button type="submit" class="btn-checkout">
            🚀 Confirmar y Finalizar Compra
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/services/supabase.js'
import { cartService } from '@/services/cartService.js'
import { formatPrice } from '@/utils/formatPrice.js'

export default {
  name: 'CartView',
  data() {
    return {
      cartItems: [],
      customer: {
        name: '',
        phone: '',
        address: '',
      },
    }
  },
  computed: {
    totalCartPrice() {
      return this.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      )
    },
  },
  methods: {
    formatPrice,
    loadCart() {
      this.cartItems = cartService.getCart()
    },
    async checkout() {
      if (this.cartItems.length === 0) return

      try {
        for (const item of this.cartItems) {
          const idBuscado = Number(item.id)

          // A. Traemos el stock actual (que es un objeto JSON)
          const { data: productoDB, error: fetchError } = await supabase
            .from('products')
            .select('stock, id')
            .eq('id', idBuscado)
            .single()

          if (fetchError) {
            console.error(
              `Error al buscar el producto ID ${idBuscado} en DB:`,
              fetchError.message,
            )
            throw fetchError
          }

          if (!productoDB || !productoDB.stock) {
            throw new Error(
              `El producto ${item.name} no tiene una estructura de stock válida.`,
            )
          }

          // 🧠 EXTRAEMOS EL NÚMERO REAL: Accedemos a .unidad dentro del objeto stock
          const stockNumericoActual = Number(productoDB.stock.unidad)

          // B. Calculamos el nuevo stock numérico
          const nuevoStockNumerico = stockNumericoActual - item.quantity

          if (nuevoStockNumerico < 0) {
            alert(
              `Lo sentimos, no hay suficiente stock de ${item.name}. Stock disponible: ${stockNumericoActual}`,
            )
            return
          }

          // 📦 ARMAMOS EL NUEVO OBJETO JSON para guardarlo tal como lo requiere tu tabla
          const stockActualizadoJSON = { unidad: nuevoStockNumerico }

          // C. Actualizamos el stock real enviando el objeto armado
          const { data: updateData, error: updateError } = await supabase
            .from('products')
            .update({ stock: stockActualizadoJSON }) // Guardamos el JSON completo actualizado
            .eq('id', idBuscado)
            .select()

          if (updateError) {
            console.error(
              'Error al intentar hacer el UPDATE:',
              updateError.message,
            )
            throw updateError
          }
        }

        // --- TODO SALIÓ BIEN ---
        alert(
          `¡Excelente ${this.customer.name}! Tu orden ha sido procesada con éxito.`,
        )
        cartService.clearCart()
        this.$router.push('/')
      } catch (error) {
        console.error('Error al procesar la compra en Supabase:', error.message)
        alert(
          'Hubo un problema al procesar tu compra. Por favor, intenta de nuevo.',
        )
      }
    },
  },
  created() {
    this.loadCart()
    // Escucha si el carrito se actualiza de fondo
    window.addEventListener('cart-updated', this.loadCart)
  },
  beforeUnmount() {
    window.removeEventListener('cart-updated', this.loadCart)
  },
}
</script>

<style scoped>
.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px 40px;
  color: var(--color-text-main, #fff);
}
h1 {
  color: var(--color-text-main);
  text-align: center;
  margin-bottom: 2rem;
}
.empty-cart {
  text-align: center;
  padding: 50px;
  background: #111;
  border-radius: 8px;
}
.btn-back {
  display: inline-block;
  margin-top: 1rem;
  background: #ff0055;
  color: white;
  padding: 0.5rem 1.5rem;
  text-decoration: none;
  border-radius: 6px;
}
.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}
.cart-item-card {
  display: flex;
  gap: 1.5rem;
  background: #181818;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.item-img {
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 6px;
}
.item-details h3 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
}
.item-meta {
  font-size: 0.8rem;
  color: #888;
  margin: 0;
}
.item-size {
  font-size: 0.9rem;
  margin: 0.25rem 0;
}
.item-size span {
  color: var(--color-accent-alt);
  font-weight: bold;
}
.item-price {
  color: var(--color-accent-alt);
  font-weight: bold;
  margin: 0.5rem 0 0;
}
.cart-summary {
  background: #141414;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: fit-content;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.summary-row.total {
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--color-accent-alt);
}
hr {
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin: 1.5rem 0;
}
.form-group {
  margin-bottom: 1rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.6rem;
  background: #1e1e1e;
  border: 1px solid #333;
  color: white;
  border-radius: 6px;
}
.form-group textarea {
  height: 80px;
  resize: none;
}
.btn-checkout {
  width: 100%;
  padding: 0.8rem;
  background: var(--color-accent);
  color: var(--color-text-main);
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
}
.btn-checkout:hover {
  background: var(--color-accent-hover);
}
@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
}
</style>
