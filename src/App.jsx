import React, { useState, useMemo } from 'react'
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import EmployeeLayout from './pages/EmployeeLayout'
import Dashboard from './pages/Dashboard'
import { MOCK_PRODUCTS } from './services/productsData'
import { UserCheck, ShoppingBag } from 'lucide-react'

function App() {
  const [currentView, setCurrentView] = useState('employee') // 'home' | 'checkout' | 'employee'
  const [activeEmployeeTab, setActiveEmployeeTab] = useState('dashboard')

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

  const renderEmployeeContent = () => {
    if (activeEmployeeTab === 'dashboard') {
      return <Dashboard onNavigate={(tabId) => setActiveEmployeeTab(tabId)} />
    }

    return (
      <div
        style={{
          backgroundColor: 'var(--color-white)',
          padding: '2.5rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border-subtle)',
          boxShadow: 'var(--shadow-subtle)',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
          Módulo en Construcción
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
          Has seleccionado: <strong>{activeEmployeeTab.toUpperCase()}</strong>. Este caso de uso administrativo se integrará en el siguiente paso.
        </p>
        <button
          type="button"
          onClick={() => setActiveEmployeeTab('dashboard')}
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-white)',
            padding: '0.65rem 1.25rem',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Volver al Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="app-root">
      {/* Role Switcher floating badge for easy testing between Employee Portal & Customer Store */}
      <div
        style={{
          position: 'fixed',
          bottom: '16px',
          right: '16px',
          zIndex: 9999,
          display: 'flex',
          gap: '8px',
          backgroundColor: 'var(--color-white)',
          padding: '6px 10px',
          borderRadius: 'var(--radius-pill)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <button
          type="button"
          onClick={() => setCurrentView('employee')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.78rem',
            fontWeight: 600,
            backgroundColor: currentView === 'employee' ? 'var(--color-primary)' : 'transparent',
            color: currentView === 'employee' ? 'var(--color-white)' : 'var(--color-text-secondary)',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <UserCheck size={14} />
          <span>Portal Empleados</span>
        </button>
        <button
          type="button"
          onClick={() => setCurrentView('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.78rem',
            fontWeight: 600,
            backgroundColor: currentView !== 'employee' ? 'var(--color-primary)' : 'transparent',
            color: currentView !== 'employee' ? 'var(--color-white)' : 'var(--color-text-secondary)',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <ShoppingBag size={14} />
          <span>Tienda Cliente</span>
        </button>
      </div>

      {currentView === 'employee' ? (
        <EmployeeLayout
          activeTab={activeEmployeeTab}
          onSelectTab={setActiveEmployeeTab}
          onLogout={() => setCurrentView('home')}
          user={{ name: 'John Doe', role: 'Carnicero' }}
        >
          {renderEmployeeContent()}
        </EmployeeLayout>
      ) : currentView === 'home' ? (
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
