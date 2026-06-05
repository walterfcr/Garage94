export const cartService = {
  getCart() {
    const cart = localStorage.getItem('g94_cart')
    return cart ? JSON.parse(cart) : []
  },

  addToCart(product, selectedSize) {
    const cart = this.getCart()

    const finalSize = product.type === 'Clothing' ? selectedSize : null

    const existingItem = cart.find((item) => {
      if (product.type === 'Clothing') {
        return item.id === product.id && item.size === finalSize
      }
      return item.id === product.id
    })

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        type: product.type,
        item_number: product.item_number,
        size: finalSize,
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
