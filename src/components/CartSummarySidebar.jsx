import React from 'react'
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, Truck } from 'lucide-react'
import './CartSummarySidebar.css'

export default function CartSummarySidebar({
  cartItems = [],
  onIncrement,
  onDecrement,
  onRemove,
  onGoToCart,
  shippingCost = 2500,
  showBreakdown = true,
  isCheckoutMode = false,
}) {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )

  const effectiveShipping = cartItems.length > 0 ? shippingCost : 0
  const totalAmount = subtotal + effectiveShipping

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  const formatPrice = (val) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(val)

  return (
    <aside className="cart-sidebar">
      <div className="cart-card">
        {/* Header */}
        <div className="cart-header">
          <div className="cart-title-wrapper">
            <ShoppingBag size={20} className="cart-header-icon" />
            <h2 className="cart-title">Tu Pedido</h2>
          </div>
          <span className="cart-items-pill">
            {totalCount} {totalCount === 1 ? 'ítem' : 'ítems'}
          </span>
        </div>

        <div className="cart-divider" />

        {/* List of items */}
        <div className="cart-items-container">
          {cartItems.length > 0 ? (
            <ul className="cart-items-list">
              {cartItems.map(({ product, quantity }) => (
                <li key={product.id} className="cart-item">
                  <div className="cart-item-header">
                    <span className="cart-item-name" title={product.name}>
                      {product.name}
                    </span>
                    {onRemove && (
                      <button
                        type="button"
                        className="cart-item-remove"
                        onClick={() => onRemove(product.id)}
                        title="Quitar producto"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>

                  <div className="cart-item-footer">
                    <div className="cart-item-qty-control">
                      <button
                        type="button"
                        className="cart-qty-btn"
                        onClick={() => onDecrement && onDecrement(product.id)}
                        disabled={!onDecrement}
                        aria-label="Restar uno"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="cart-qty-val">{quantity}</span>
                      <button
                        type="button"
                        className="cart-qty-btn"
                        onClick={() => onIncrement && onIncrement(product.id)}
                        disabled={!onIncrement || quantity >= product.stock}
                        aria-label="Sumar uno"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className="cart-item-price-block">
                      <span className="cart-item-subtotal">
                        {formatPrice(product.price * quantity)}
                      </span>
                      <span className="cart-item-unitprice">
                        ({formatPrice(product.price)} c/u)
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="cart-empty-state">
              <div className="cart-empty-circle">
                <ShoppingBag size={28} className="cart-empty-icon" />
              </div>
              <p className="cart-empty-text">Tu carrito está vacío</p>
              <span className="cart-empty-sub">
                Agrega cortes de carne seleccionados desde el catálogo.
              </span>
            </div>
          )}
        </div>

        {/* Resumen / Bloque resaltado Total */}
        <div className="cart-summary-block">
          {showBreakdown && cartItems.length > 0 && (
            <div className="cart-breakdown-details">
              <div className="breakdown-row">
                <span className="breakdown-label">Subtotal de productos:</span>
                <span className="breakdown-val">{formatPrice(subtotal)}</span>
              </div>
              <div className="breakdown-row">
                <span className="breakdown-label">
                  <Truck size={13} className="inline-truck-icon" /> Costo de envío:
                </span>
                <span className="breakdown-val">{formatPrice(effectiveShipping)}</span>
              </div>
            </div>
          )}

          <div className="total-highlight-box">
            <span className="total-label">TOTAL HASTA EL MOMENTO</span>
            <span className="total-value">{formatPrice(totalAmount)}</span>
          </div>

          {!isCheckoutMode && (
            <button
              type="button"
              className="go-to-cart-button"
              onClick={onGoToCart}
              disabled={cartItems.length === 0}
            >
              <span>Ir a carrito</span>
              <ArrowRight size={18} className="cart-btn-arrow" />
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
