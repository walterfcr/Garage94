<template>
  <div class="track-order">
    <h1>Seguimiento de Pedido</h1>

    <div class="search-box">
      <input v-model="orderId" type="text" placeholder="Ej: RC-00015" />

      <button @click="searchOrder">Buscar</button>
    </div>

    <div v-if="order" class="order-card">
      <h2>{{ formatOrderNumber(order.id) }}</h2>
      <hr class="order-divider" />

      <div class="order-layout">
        <!-- COLUMNA IZQUIERDA -->
        <div class="order-info">
          <p>
            <strong>Cliente:</strong>
            {{ order.customer_name }}
          </p>

          <div class="status-row">
            <strong>Estado:</strong>

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
          </div>

          <p>
            <strong>Total:</strong>
            ₡{{ order.total_price }}
          </p>
        </div>

        <!-- COLUMNA DERECHA -->
        <div class="products-column">
          <h3>Productos</h3>

          <div
            v-for="(item, index) in order.items"
            :key="index"
            class="tracking-item"
          >
            <img
              :src="item.image"
              :alt="item.name"
              class="tracking-item-image"
            />

            <div class="tracking-item-info">
              <h4>{{ item.name }}</h4>

              <p v-if="item.band">
                {{ item.band }}
              </p>

              <p>
                {{ item.type }}
              </p>

              <p>Cantidad: {{ item.quantity }}</p>

              <p v-if="item.size">Talla: {{ item.size }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
import { supabase } from '@/services/supabase'
import { formatOrderNumber } from '@/utils/formatOrderNumber'

export default {
  name: 'TrackOrderView',

  data() {
    return {
      orderId: '',
      order: null,
      errorMessage: '',
    }
  },

  methods: {
    formatOrderNumber,
    async searchOrder() {
      this.errorMessage = ''
      this.order = null

      try {
        const numericId = Number(
          this.orderId.replace(/rc-/i, '').replace(/^0+/, ''),
        )

        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('id', numericId)
          .single()

        if (error) throw error

        this.order = data
      } catch (error) {
        this.errorMessage = 'Orden no encontrada'
      }
    },
  },
}
</script>

<style scoped>
.track-order {
  max-width: 900px;
  margin: 3rem auto;
  padding: 2rem;
  color: var(--color-text-main);
}

.track-order h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--color-text-main);
}

.search-box {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-box input {
  flex: 1;
  background: var(--color-card-bg);
  color: var(--color-text-main);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 14px;
  outline: none;
}

.search-box input:focus {
  border-color: var(--color-accent);
}

.search-box button {
  background: var(--color-accent);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0 24px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.search-box button:hover {
  background: var(--color-accent-hover);
}

.order-card {
  background: var(--color-background-darker);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  padding: 2rem;
}

.order-card h2 {
  margin: 0;
  padding: 0 0 10px;
  color: var(--color-accent-alt);
}

.order-card p {
  margin: 0;
  padding: 0 0 10px;
  color: var(--color-text-muted);
}

.order-card h3 {
  margin-top: 0;
  color: var(--color-accent-alt);
}

.order-card ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
}

.order-card li {
  background: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 10px 14px;
  margin-bottom: 10px;
}

.status-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 0;
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

.error-message {
  text-align: center;
  margin-top: 2rem;
  color: var(--color-accent);
  font-weight: bold;
}
.order-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2rem;
  align-items: start;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.products-column {
  display: flex;
  flex-direction: column;
  align-self: start;
  gap: 1rem;
}

.products-column h3 {
  margin: 0;
}

.tracking-item {
  display: flex;
  gap: 1rem;

  background: var(--color-card-bg);
  border: 1px solid var(--color-border);

  border-radius: 8px;
  padding: 1rem;
}

.tracking-item-image {
  width: 90px;
  height: 90px;

  object-fit: cover;

  border-radius: 6px;
  flex-shrink: 0;
}

.tracking-item-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.tracking-item-info h4 {
  margin: 0;
  color: var(--color-text-main);
}

.tracking-item-info p {
  margin: 0;
  color: var(--color-text-muted);
}
.order-divider {
  border: none;
  height: 1px;
  background: var(--color-border);
  margin: 1rem 0 1.5rem;
}
</style>
