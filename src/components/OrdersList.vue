<template>
  <div class="orders-section">
    <div v-if="loading" class="loading-box">
      ⚡ Cargando órdenes desde Supabase...
    </div>

    <div v-else-if="orders.length === 0" class="empty-orders">
      📭 No hay órdenes registradas aún.
    </div>

    <div v-else class="orders-grid">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-header">
          <span class="order-id">Orden #{{ order.id }}</span>
          <span class="order-date">{{ formatDate(order.created_at) }}</span>
        </div>

        <div class="order-body">
          <div class="client-info">
            <p>👤 <strong>Cliente:</strong> {{ order.customer_name }}</p>
            <p>📞 <strong>Teléfono:</strong> {{ order.customer_phone }}</p>
            <p>📍 <strong>Dirección:</strong> {{ order.customer_address }}</p>
          </div>

          <div class="order-items">
            <h4>Artículos Comprados:</h4>
            <ul>
              <li v-for="(item, idx) in order.items" :key="idx">
                ⚫ {{ item.name }}
                <span v-if="item.size"
                  >(Talla: <strong>{{ item.size }}</strong
                  >)</span
                >
                x{{ item.quantity }} -
                <span class="item-cost">₡{{ item.price * item.quantity }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="order-footer">
          <span>Monto Total:</span>
          <span class="order-total">₡{{ order.total_price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '../services/supabase'

export default {
  name: 'OrdersList',
  data() {
    return {
      orders: [],
      loading: false,
    }
  },
  mounted() {
    this.fetchOrders()
  },
  methods: {
    async fetchOrders() {
      this.loading = true
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('id', { ascending: false })

        if (error) throw error
        this.orders = data
      } catch (error) {
        console.error('Error al traer órdenes:', error.message)
      } finally {
        this.loading = false
      }
    },
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString('es-CR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    },
  },
}
</script>

<style scoped>
.orders-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 750px;
  margin: 0 auto;
}
.order-card {
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: left;
}
.order-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
}
.order-id {
  color: #ff0055;
  font-weight: bold;
  font-size: 1.1rem;
}
.order-date {
  color: #666;
  font-size: 0.9rem;
}
.order-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
.client-info p {
  margin: 0 0 0.5rem 0;
  font-size: 0.95rem;
  color: #ccc;
}
.order-items h4 {
  margin: 0 0 0.5rem 0;
  color: #00bcff;
  font-size: 0.95rem;
}
.order-items ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.order-items li {
  font-size: 0.9rem;
  color: #aaa;
  margin-bottom: 0.4rem;
}
.item-cost {
  color: #ffaa00;
}
.order-footer {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px dashed rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.order-total {
  font-size: 1.3rem;
  font-weight: bold;
  color: #00e673;
}
.loading-box,
.empty-orders {
  text-align: center;
  padding: 3rem;
  background: #111;
  border-radius: 8px;
  color: #888;
  border: 1px dashed rgba(255, 255, 255, 0.05);
}
</style>
