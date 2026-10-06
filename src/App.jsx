import React, { useMemo, useState } from 'react'
import { Navigate, Outlet, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import EmployeeLayout from './pages/EmployeeLayout'
import Dashboard from './pages/Dashboard'
import CierreCaja from './pages/CierreCaja'
import VentaMostrador from './pages/VentaMostrador'
import GestionDespacho from './pages/GestionDespacho'
import PlanificacionRuta from './pages/PlanificacionRuta'
import RegistroEntrega from './pages/RegistroEntrega'
import GenerarRemitoListado from './pages/GenerarRemitoListado'
import GenerarRemitoDetalle from './pages/GenerarRemitoDetalle'
import RemitoGenerado from './pages/RemitoGenerado'
import { MOCK_PRODUCTS } from './services/productsData'
import { UserCheck, ShoppingBag } from 'lucide-react'

const defaultSale = {
  id: '#VT-2023-0895',
  client: 'Hotel Boutique Alvear',
  deliveryAddress: 'Av. Alvear 1891',
  saleDate: '15 Oct, 2023 11:45',
  items: [
    { id: 1, name: 'Ojo de Bife (Corte entero)', quantity: '15 kg' },
    { id: 2, name: 'Chorizo Puro Cerdo', quantity: '5 kg' },
    { id: 3, name: 'Asado de Tira', quantity: '10 kg' },
  ],
}

function RemitoDetalleRoute() {
  const { id } = useParams()
  return <GenerarRemitoDetalle sale={{ ...defaultSale, id: `#${id}` }} />
}

function EmployeeModulePlaceholder({ title }) {
  return (
    <section
      style={{
        maxWidth: '800px', margin: '0 auto', padding: '2.5rem', textAlign: 'center',
        backgroundColor: 'var(--color-white)', border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-subtle)',
      }}
    >
      <h1 style={{ fontFamily: 'var(--font-serif)', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
        Módulo en Construcción
      </h1>
      <p style={{ color: 'var(--color-text-secondary)' }}>Has seleccionado: <strong>{title}</strong>.</p>
    </section>
  )
}

function App() {
  const navigate = useNavigate()
  const [currentView, setCurrentView] = useState('employee')
  const [cart, setCart] = useState({ 1: 2, 3: 1 })

  const handleIncrement = (productId) => {
    const product = MOCK_PRODUCTS.find((item) => item.id === productId)
    if (!product) return
    setCart((previous) => {
      const quantity = previous[productId] || 0
      if (quantity >= product.stock) return previous
      return { ...previous, [productId]: quantity + 1 }
    })
  }

  const handleDecrement = (productId) => {
    setCart((previous) => {
      const quantity = previous[productId] || 0
      if (quantity <= 1) {
        const nextCart = { ...previous }
        delete nextCart[productId]
        return nextCart
      }
      return { ...previous, [productId]: quantity - 1 }
    })
  }

  const handleRemove = (productId) => {
    setCart((previous) => {
      const nextCart = { ...previous }
      delete nextCart[productId]
      return nextCart
    })
  }

  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .filter(([, quantity]) => quantity > 0)
        .map(([id, quantity]) => ({
          product: MOCK_PRODUCTS.find((item) => item.id === Number(id)),
          quantity,
        }))
        .filter((item) => item.product),
    [cart],
  )

  const renderFallback = () => {
    if (currentView === 'home') {
      return <Home cart={cart} setCart={setCart} onGoToCheckout={() => setCurrentView('checkout')} />
    }
    if (currentView === 'checkout') {
      return (
        <Checkout
          cartItems={cartItems}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onRemove={handleRemove}
          onBackToShop={() => setCurrentView('home')}
          onClearCart={() => setCart({})}
        />
      )
    }
    return <Navigate to="/empleados/remitos" replace />
  }

  return (
    <div className="app-root">
      <div
        style={{
          position: 'fixed', bottom: '16px', right: '16px', zIndex: 9999,
          display: 'flex', gap: '8px', backgroundColor: 'var(--color-white)',
          padding: '6px 10px', borderRadius: 'var(--radius-pill)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          border: '1px solid var(--color-border-subtle)',
        }}
      >
        <button
          type="button"
          onClick={() => { setCurrentView('employee'); navigate('/empleados/remitos') }}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px',
            borderRadius: 'var(--radius-pill)', fontSize: '0.78rem', fontWeight: 600,
            backgroundColor: currentView === 'employee' ? 'var(--color-primary)' : 'transparent',
            color: currentView === 'employee' ? 'var(--color-white)' : 'var(--color-text-secondary)',
            cursor: 'pointer',
          }}
        >
          <UserCheck size={14} />
          <span>Portal Empleados</span>
        </button>
        <button
          type="button"
          onClick={() => { setCurrentView('home'); navigate('/') }}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px',
            borderRadius: 'var(--radius-pill)', fontSize: '0.78rem', fontWeight: 600,
            backgroundColor: currentView !== 'employee' ? 'var(--color-primary)' : 'transparent',
            color: currentView !== 'employee' ? 'var(--color-white)' : 'var(--color-text-secondary)',
            cursor: 'pointer',
          }}
        >
          <ShoppingBag size={14} />
          <span>Tienda Cliente</span>
        </button>
      </div>

      <Routes>
        <Route
          path="/empleados"
          element={(
            <EmployeeLayout
              activeTab="remito"
              onLogout={() => { setCurrentView('home'); navigate('/') }}
              user={{ name: 'John Doe', role: 'Carnicero' }}
            >
              <Outlet />
            </EmployeeLayout>
          )}
        >
          <Route index element={<Navigate to="remitos" replace />} />
          <Route path="remitos" element={<GenerarRemitoListado />} />
          <Route path="remitos/detalle/:id" element={<RemitoDetalleRoute />} />
          <Route path="remitos/exito" element={<RemitoGenerado />} />
          <Route path="mostrador" element={<VentaMostrador />} />
          <Route
            path="entregas"
            element={(
              <GestionDespacho
                onCreateRoute={() => navigate('/empleados/entregas/ruta')}
                onViewOrder={(orderId) => navigate(`/empleados/entregas/registro/${encodeURIComponent(orderId.replace(/^#/, ''))}`)}
                onAssignOrder={() => navigate('/empleados/entregas/ruta')}
              />
            )}
          />
          <Route
            path="entregas/ruta"
            element={(
              <PlanificacionRuta
                onConfirmAssign={() => navigate('/empleados/entregas/registro/ORD-0921')}
              />
            )}
          />
          <Route
            path="entregas/registro/:id"
            element={(
              <RegistroEntrega
                onBack={() => navigate('/empleados/entregas')}
                onCancel={() => navigate('/empleados/entregas')}
                onConfirmDelivery={() => navigate('/empleados/entregas')}
              />
            )}
          />
          <Route
            path="dashboard"
            element={(
              <Dashboard
                onNavigate={(tabId) => {
                  const destination = tabId === 'remito' ? 'remitos' : tabId
                  navigate(`/empleados/${destination}`)
                }}
              />
            )}
          />
          <Route path="caja" element={<CierreCaja />} />
        </Route>
        <Route path="*" element={renderFallback()} />
      </Routes>
    </div>
  )
}

export default App
