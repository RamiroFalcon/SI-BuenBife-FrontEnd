import React, { useMemo, useState } from 'react'
import { Search, ShoppingCart, Minus, Plus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react'
import Navbar from '../components/Navbar'
import FilterSidebar from '../components/FilterSidebar'
import styles from './Carrito.module.css'

const formatPrice = (val) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(val)

// 'kg' se muestra tal cual; el resto de las unidades se pluraliza según la cantidad
const formatUnit = (unit, quantity) => {
  if (unit === 'kg') return 'kg'
  return quantity === 1 ? unit : `${unit}s`
}

export default function Carrito({
  cartItems = [],
  onIncrement,
  onDecrement,
  onRemove,
  onBack,
  onNext,
}) {
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [searchQuery, setSearchQuery] = useState('')

  // Filtra los ítems del carrito según categoría y búsqueda
  const visibleItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return cartItems.filter(({ product }) => {
      const matchesCategory =
        selectedCategory === 'todos' || product.category === selectedCategory
      const matchesSearch =
        query === '' ||
        product.name.toLowerCase().includes(query) ||
        product.categoryLabel.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [cartItems, selectedCategory, searchQuery])

  // El total siempre refleja el carrito completo, no solo lo filtrado
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div className={styles.carritoLayout}>
      <Navbar searchQuery="" setSearchQuery={() => {}} cartCount={totalCount} />

      <div className={styles.carritoContainer}>
        {/* Columna izquierda: filtros */}
        <div className={styles.carritoColFilters}>
          <FilterSidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            totalItemsCount={visibleItems.length}
          />
        </div>

        {/* Columna derecha: encabezado + tabla */}
        <main className={styles.carritoColMain}>
          <div className={styles.headerCard}>
            <div className={styles.headerTitleWrapper}>
              <h1 className={styles.headerTitle}>Carrito</h1>
              <ShoppingCart size={24} className={styles.headerIcon} />
            </div>

            <div className={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <Search size={18} className={styles.searchIcon} />
            </div>
          </div>

          <div className={styles.tableCard}>
            {cartItems.length === 0 ? (
              <div className={styles.emptyState}>
                <ShoppingCart size={32} className={styles.emptyIcon} />
                <p className={styles.emptyText}>Tu carrito está vacío</p>
                <span className={styles.emptySub}>
                  Volvé a la tienda para agregar productos.
                </span>
              </div>
            ) : (
              <div className={styles.tableScroll}>
                <table className={styles.cartTable}>
                  <thead>
                    <tr>
                      <th>Descripción</th>
                      <th>Tipo</th>
                      <th>Cantidad</th>
                      <th className={styles.colPrice}>Precio</th>
                      <th className={styles.colAction} aria-label="Acciones" />
                    </tr>
                  </thead>
                  <tbody>
                    {visibleItems.length === 0 ? (
                      <tr>
                        <td colSpan={5} className={styles.noResults}>
                          No hay productos del carrito que coincidan con el filtro.
                        </td>
                      </tr>
                    ) : (
                      visibleItems.map(({ product, quantity }) => (
                        <tr key={product.id}>
                          <td className={styles.cellName}>{product.name}</td>
                          <td className={styles.cellType}>{product.categoryLabel}</td>
                          <td>
                            <div className={styles.qtyCell}>
                              <div className={styles.qtyControl}>
                                <button
                                  type="button"
                                  className={styles.qtyBtn}
                                  onClick={() => onDecrement(product.id)}
                                  aria-label="Restar uno"
                                >
                                  <Minus size={16} />
                                </button>
                                <span className={styles.qtyVal}>{quantity}</span>
                                <button
                                  type="button"
                                  className={styles.qtyBtn}
                                  onClick={() => onIncrement(product.id)}
                                  disabled={quantity >= product.stock}
                                  aria-label="Sumar uno"
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                              <span className={styles.qtyUnit}>
                                {formatUnit(product.unit, quantity)}
                              </span>
                            </div>
                          </td>
                          <td className={styles.colPrice}>
                            {formatPrice(product.price * quantity)}
                          </td>
                          <td className={styles.colAction}>
                            <button
                              type="button"
                              className={styles.removeBtn}
                              onClick={() => onRemove(product.id)}
                              title="Quitar producto"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            <p className={styles.totalLine}>
              Total hasta el momento: {formatPrice(totalAmount)}
            </p>

            <div className={styles.actionsDivider} />

            <div className={styles.actions}>
              <button type="button" className={styles.btnOutline} onClick={onBack}>
                <ArrowLeft size={18} />
                <span>Volver</span>
              </button>
              <button
                type="button"
                className={styles.btnPrimary}
                onClick={onNext}
                disabled={cartItems.length === 0}
              >
                <span>Siguiente</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
