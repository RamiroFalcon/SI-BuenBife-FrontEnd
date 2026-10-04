import React, { useState, useMemo } from 'react'
import Navbar from '../components/Navbar'
import FilterSidebar from '../components/FilterSidebar'
import ProductGrid from '../components/ProductGrid'
import CartSummarySidebar from '../components/CartSummarySidebar'
import { MOCK_PRODUCTS, CATEGORIES } from '../services/productsData'
import './Home.css'

export default function Home({
  cart: parentCart,
  setCart: parentSetCart,
  onGoToCheckout,
}) {
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [searchQuery, setSearchQuery] = useState('')
  // Internal state fallback if parent does not provide it
  const [internalCart, setInternalCart] = useState({})

  const cart = parentCart !== undefined ? parentCart : internalCart
  const setCart = parentSetCart !== undefined ? parentSetCart : setInternalCart

  // Filter products based on selected category and search input
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'todos' || product.category === selectedCategory

      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  // Current category human readable title
  const currentCategoryLabel = useMemo(() => {
    const found = CATEGORIES.find((cat) => cat.id === selectedCategory)
    return found ? found.label : 'Catálogo de Cortes'
  }, [selectedCategory])

  // Cart items prepared with product details
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

  // Total items in cart for navbar badge
  const totalCartCount = useMemo(() => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0)
  }, [cart])

  // Cart operations
  const handleIncrement = (productId) => {
    const product = MOCK_PRODUCTS.find((p) => p.id === productId)
    if (!product) return

    setCart((prev) => {
      const currentQty = prev[productId] || 0
      if (currentQty >= product.stock) return prev
      return {
        ...prev,
        [productId]: currentQty + 1,
      }
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
      return {
        ...prev,
        [productId]: currentQty - 1,
      }
    })
  }

  const handleRemove = (productId) => {
    setCart((prev) => {
      const copy = { ...prev }
      delete copy[productId]
      return copy
    })
  }

  const handleGoToCart = () => {
    if (onGoToCheckout) {
      onGoToCheckout()
    } else {
      alert(
        `Redirigiendo a pantalla de checkout con ${totalCartCount} producto(s) en su orden.`
      )
    }
  }

  return (
    <div className="home-layout">
      {/* Top Navigation */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={totalCartCount}
      />

      {/* Main 3-column Layout: 20% Sidebar, 55% Grid, 25% Cart */}
      <div className="home-container">
        {/* Left Column: Filter Sidebar (20%) */}
        <div className="home-col-filters">
          <FilterSidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            totalItemsCount={filteredProducts.length}
          />
        </div>

        {/* Center Column: Product Grid (55%) */}
        <main className="home-col-products">
          <ProductGrid
            products={filteredProducts}
            cart={cart}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            categoryTitle={currentCategoryLabel}
          />
        </main>

        {/* Right Column: Cart Summary (25%) */}
        <div className="home-col-cart">
          <CartSummarySidebar
            cartItems={cartItems}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onRemove={handleRemove}
            onGoToCart={handleGoToCart}
          />
        </div>
      </div>
    </div>
  )
}
