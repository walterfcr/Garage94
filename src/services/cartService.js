// src/services/cartService.js

export const cartService = {
  getCart() {
    const cart = localStorage.getItem('g94_cart')
    return cart ? JSON.parse(cart) : []
  },

  addToCart(product, selectedSize) {
    const cart = this.getCart()

    // Determinamos la talla de manera estricta: solo si es ropa lleva talla
    const finalSize = product.type === 'Clothing' ? selectedSize : null

    // Buscamos si ya existe el mismo artículo en el carrito
    // (Para ropa compara ID y Talla. Para lo demás, solo el ID)
    const existingItem = cart.find((item) => {
      if (product.type === 'Clothing') {
        return item.id === product.id && item.size === finalSize
      }
      return item.id === product.id
    })

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      // Creamos el objeto del carrito adaptado a tus columnas reales
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        type: product.type,
        item_number: product.item_number,
        size: finalSize, // Será 'S', 'M', etc. para ropa, o null para discos/mercancía
        quantity: 1,
      })
    }

    localStorage.setItem('g94_cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cart-updated'))
  },

  clearCart() {
    localStorage.removeItem('g94_cart')
    window.dispatchEvent(new Event('cart-updated'))
  },
}
