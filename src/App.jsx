import React, { useState, useMemo } from 'react'
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import { MOCK_PRODUCTS } from './services/productsData'

function App() {
  const [currentView, setCurrentView] = useState('home') // 'home' | 'checkout'

  // Cart with initial gourmet items so checkout can be experienced right away or modified
  const [cart, setCart] = useState({
    1: 2, // 2x Ojo de Bife Angus
    3: 1, // 1x Asado de Tira Especial
  })

  // Cart operations
  const handleIncrement = (productId) => {
    const product = MOCK_PRODUCTS.find((p) => p.id === productId)
    if (!product) return

    setCart((prev) => {
      const currentQty = prev[productId] || 0
      if (currentQty >= product.stock) return prev
      return { ...prev, [productId]: currentQty + 1 }
    })
  }

  const handleDecrement = (productId) => {
    setCart((prev) => {
      const currentQty = prev[productId] || 0
      if (currentQty <= 1) {
        const copy = { ...prev }
        delete copy[productId]
        return copy
      }
      return { ...prev, [productId]: currentQty - 1 }
    })
  }

  const handleRemove = (productId) => {
    setCart((prev) => {
      const copy = { ...prev }
      delete copy[productId]
      return copy
    })
  }

  const handleClearCart = () => {
    setCart({})
  }

  // Prepared cart items
  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .filter(([_, qty]) => qty > 0)
      .map(([idStr, qty]) => {
        const prod = MOCK_PRODUCTS.find((p) => p.id === Number(idStr))
        return {
          product: prod,
          quantity: qty,
        }
      })
      .filter((item) => item.product !== undefined)
  }, [cart])

  return (
    <div className="app-root">
      {currentView === 'home' ? (
        <Home
          cart={cart}
          setCart={setCart}
          onGoToCheckout={() => setCurrentView('checkout')}
        />
      ) : (
        <Checkout
          cartItems={cartItems}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onRemove={handleRemove}
          onBackToShop={() => setCurrentView('home')}
          onClearCart={handleClearCart}
        />
      )}
    </div>
  )
}

export default App
