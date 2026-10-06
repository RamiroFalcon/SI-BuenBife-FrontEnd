import React, { useMemo, useState } from 'react'
import { Minus, Plus, Search, ShoppingCart, Trash2 } from 'lucide-react'
import { MOCK_PRODUCTS } from '../services/productsData'
import styles from './VentaMostrador.module.css'

const currency = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

const quantityStep = (product) => (product.unit === 'kg' ? 0.25 : 1)

const formatQuantity = (quantity, product) =>
  product.unit === 'kg' ? `${quantity.toFixed(2)} kg` : `${quantity} ${product.unit}`

export default function VentaMostrador({ onProcessPayment = () => {} }) {
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState({})
  const [discount, setDiscount] = useState('0')
  const [paymentMethod, setPaymentMethod] = useState('Efectivo')

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('es-AR')
    return MOCK_PRODUCTS.filter((product) =>
      product.name.toLocaleLowerCase('es-AR').includes(query),
    )
  }, [search])

  const cartItems = useMemo(
    () => Object.entries(cart)
      .map(([id, quantity]) => ({
        product: MOCK_PRODUCTS.find((product) => product.id === Number(id)),
        quantity,
      }))
      .filter((item) => item.product),
    [cart],
  )

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )
  const discountPercent = Math.min(100, Math.max(0, Number(discount) || 0))
  const total = subtotal * (1 - discountPercent / 100)

  const updateQuantity = (product, direction) => {
    const step = quantityStep(product)
    setCart((currentCart) => {
      const nextQuantity = Math.max(
        0,
        Math.min(product.stock, (currentCart[product.id] || 0) + direction * step),
      )
      const nextCart = { ...currentCart }
      if (nextQuantity === 0) delete nextCart[product.id]
      else nextCart[product.id] = Number(nextQuantity.toFixed(2))
      return nextCart
    })
  }

  const handleProcessPayment = () => {
    if (cartItems.length === 0) return
    onProcessPayment({
      items: cartItems,
      subtotal,
      discountPercent,
      total,
      paymentMethod,
    })
  }

  return (
    <main className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>OPERACIONES</p>
          <h1 className={styles.title}>Venta en Mostrador</h1>
          <p className={styles.subtitle}>Buscá productos y armá el ticket de venta.</p>
        </div>
        <span className={styles.saleBadge}>Nueva venta</span>
      </header>

      <div className={styles.posGrid}>
        <section className={styles.catalogSection} aria-labelledby="catalog-title">
          <label className={styles.searchBox} htmlFor="product-search">
            <Search size={19} aria-hidden="true" />
            <input
              id="product-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar cortes o productos..."
            />
          </label>

          <div className={styles.catalogHeading}>
            <h2 id="catalog-title" className={styles.sectionTitle}>Catálogo rápido</h2>
            <span className={styles.productCount}>{filteredProducts.length} productos</span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className={styles.productGrid}>
              {filteredProducts.map((product) => {
                const quantity = cart[product.id] || 0
                const outOfStock = quantity >= product.stock
                return (
                  <button
                    type="button"
                    key={product.id}
                    className={styles.productCard}
                    disabled={outOfStock}
                    onClick={() => updateQuantity(product, 1)}
                    aria-label={`Agregar ${product.name}, ${currency.format(product.price)} por ${product.unit}`}
                  >
                    <span className={styles.productCategory}>{product.categoryLabel}</span>
                    <span className={styles.productName}>{product.name}</span>
                    <span className={styles.productPrice}>
                      {currency.format(product.price)} <small>/ {product.unit}</small>
                    </span>
                    <span className={styles.productStock}>
                      Stock: {product.stock} {product.unit === 'kg' ? 'kg' : 'u.'}
                    </span>
                    <span className={styles.addProduct} aria-hidden="true">
                      <Plus size={15} /> Agregar
                    </span>
                  </button>
                )
              })}
            </div>
          ) : (
            <p className={styles.emptyCatalog}>No encontramos productos con esa búsqueda.</p>
          )}
        </section>

        <aside className={styles.ticket} aria-labelledby="ticket-title">
          <div className={styles.ticketHeader}>
            <div className={styles.ticketTitleWrap}>
              <span className={styles.ticketIcon}><ShoppingCart size={19} aria-hidden="true" /></span>
              <div>
                <h2 id="ticket-title" className={styles.ticketTitle}>Ticket en curso</h2>
                <p className={styles.ticketSubtitle}>Venta de mostrador</p>
              </div>
            </div>
            <span className={styles.ticketItemCount}>{cartItems.length}</span>
          </div>

          <div className={styles.ticketItems}>
            {cartItems.length > 0 ? cartItems.map(({ product, quantity }) => (
              <article key={product.id} className={styles.ticketItem}>
                <div className={styles.ticketItemTop}>
                  <div className={styles.ticketItemInfo}>
                    <h3>{product.name}</h3>
                    <span>{currency.format(product.price)} / {product.unit}</span>
                  </div>
                  <button
                    type="button"
                    className={styles.removeButton}
                    aria-label={`Quitar ${product.name} del ticket`}
                    onClick={() => setCart((current) => {
                      const next = { ...current }
                      delete next[product.id]
                      return next
                    })}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className={styles.ticketItemBottom}>
                  <div className={styles.quantityControls}>
                    <button
                      type="button"
                      aria-label={`Reducir cantidad de ${product.name}`}
                      onClick={() => updateQuantity(product, -1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span>{formatQuantity(quantity, product)}</span>
                    <button
                      type="button"
                      aria-label={`Aumentar cantidad de ${product.name}`}
                      disabled={quantity >= product.stock}
                      onClick={() => updateQuantity(product, 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <strong className={styles.itemSubtotal}>
                    {currency.format(product.price * quantity)}
                  </strong>
                </div>
              </article>
            )) : (
              <div className={styles.emptyTicket}>
                <ShoppingCart size={25} aria-hidden="true" />
                <p>El ticket está vacío</p>
                <span>Seleccioná productos del catálogo para comenzar.</span>
              </div>
            )}
          </div>

          <div className={styles.ticketSummary}>
            <div className={styles.summaryLine}>
              <span>Subtotal</span>
              <strong>{currency.format(subtotal)}</strong>
            </div>
            <label className={styles.discountField} htmlFor="wholesale-discount">
              <span>Descuento Mayorista (%)</span>
              <span className={styles.percentInputWrap}>
                <input
                  id="wholesale-discount"
                  type="number"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(event) => setDiscount(event.target.value)}
                />
                <span>%</span>
              </span>
            </label>
            <div className={`${styles.summaryLine} ${styles.finalTotal}`}>
              <span>Total Final</span>
              <strong>{currency.format(total)}</strong>
            </div>

            <label className={styles.paymentField} htmlFor="payment-method">
              <span>Método de Pago</span>
              <select
                id="payment-method"
                value={paymentMethod}
                onChange={(event) => setPaymentMethod(event.target.value)}
              >
                <option>Efectivo</option>
                <option>Tarjeta</option>
                <option>QR</option>
              </select>
            </label>

            <button
              type="button"
              className={styles.processButton}
              disabled={cartItems.length === 0}
              onClick={handleProcessPayment}
            >
              Procesar Cobro e Imprimir Ticket
            </button>
          </div>
        </aside>
      </div>
    </main>
  )
}
