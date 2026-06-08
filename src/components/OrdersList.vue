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
          <span class="order-id">
            {{ formatOrderNumber(order.id) }}
          </span>
          <span class="order-date">
            {{ formatDate(order.created_at) }}
          </span>
        </div>

        <div class="order-summary">
          <p>{{ order.customer_name }}</p>

          <span
            class="status-badge"
            :class="{
              pending: order.status === 'Pendiente',
              shipped: order.status === 'Enviado',
              delivered: order.status === 'Entregado',
            }"
          >
            {{ order.status }}
          </span>

          <div class="order-total">₡{{ order.total_price }}</div>

          <button @click="openOrder(order)">Ver Detalles</button>
        </div>
      </div>
    </div>
    <div
      v-if="selectedOrder"
      class="modal-overlay"
      @click.self="selectedOrder = null"
    >
      <div class="modal-content">
        <div class="status-section">
          <label>Estado de la orden</label>

          <select v-model="selectedOrder.status">
            <option value="Pendiente">Pendiente</option>
            <option value="Enviado">Enviado</option>
            <option value="Entregado">Entregado</option>
          </select>
        </div>
        <h3>Orden #{{ selectedOrder.id }}</h3>

        <p>
          <strong>Cliente:</strong>
          {{ selectedOrder.customer_name }}
        </p>

        <p>
          <strong>Teléfono:</strong>
          {{ selectedOrder.customer_phone }}
        </p>

        <p>
          <strong>Dirección:</strong>
          {{ selectedOrder.customer_address }}
        </p>

        <hr />

        <h4>Productos</h4>

        <ul>
          <li v-for="(item, index) in selectedOrder.items" :key="index">
            {{ item.name }}
            <span v-if="item.size"> ({{ item.size }}) </span>

            x{{ item.quantity }}
          </li>
        </ul>

        <h3>₡{{ selectedOrder.total_price }}</h3>

        <div class="modal-actions">
          <button @click="saveOrderStatus">💾 Guardar Estado</button>

          <button @click="selectedOrder = null">❌ Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '../services/supabase'
import { formatOrderNumber } from '@/utils/formatOrderNumber'

export default {
  name: 'OrdersList',
  data() {
    return {
      orders: [],
      loading: false,
      selectedOrder: null,
    }
  },
  mounted() {
    this.fetchOrders()
  },
  methods: {
    formatOrderNumber,
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
    openOrder(order) {
      this.selectedOrder = order
    },
    async saveOrderStatus() {
      try {
        const { error } = await supabase
          .from('orders')
          .update({
            status: this.selectedOrder.status,
          })
          .eq('id', this.selectedOrder.id)

        if (error) throw error

        alert('Estado actualizado')

        await this.fetchOrders()

        this.selectedOrder = null
      } catch (error) {
        console.error(error)
        alert(error.message)
      }
    },
  },
}
</script>

<style scoped>
.orders-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
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
.order-summary {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.status-badge {
  background: rgba(255, 186, 8, 0.15);
  color: var(--color-accent-alt);
  border: 1px solid rgba(255, 186, 8, 0.3);

  padding: 6px 10px;
  border-radius: 20px;

  width: fit-content;

  font-size: 0.85rem;
  font-weight: bold;
}
.status-badge.pending {
  background: rgba(255, 186, 8, 0.15);
  color: #ffba08;
  border: 1px solid rgba(255, 186, 8, 0.4);
}

.status-badge.shipped {
  background: rgba(0, 188, 255, 0.15);
  color: #00bcff;
  border: 1px solid rgba(0, 188, 255, 0.4);
}

.status-badge.delivered {
  background: rgba(0, 230, 115, 0.15);
  color: #00e673;
  border: 1px solid rgba(0, 230, 115, 0.4);
}

.order-summary button {
  background: var(--color-accent);
  color: white;

  border: none;
  border-radius: 6px;

  padding: 10px;
  cursor: pointer;

  font-weight: bold;
}

.order-summary button:hover {
  background: var(--color-accent-hover);
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
  width: 700px;
  max-width: 90vw;

  background: var(--color-background-darker);
  border: 1px solid var(--color-border);

  border-radius: 8px;
  padding: 2rem;
}

.modal-content h3 {
  color: var(--color-accent-alt);
}
.status-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  margin: 1rem 0;
}

.status-section select {
  background: var(--color-surface);
  color: var(--color-text-main);

  border: 1px solid var(--color-border);

  padding: 10px;
  border-radius: 6px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  margin-top: 1rem;
}
</style>
