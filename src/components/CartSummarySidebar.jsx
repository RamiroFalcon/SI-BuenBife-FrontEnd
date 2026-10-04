import React from 'react'
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, Truck } from 'lucide-react'
import styles from './CartSummarySidebar.module.css'

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
    <aside className={styles.cartSidebar}>
      <div className={styles.cartCard}>
        {/* Header */}
        <div className={styles.cartHeader}>
          <div className={styles.cartTitleWrapper}>
            <ShoppingBag size={20} className={styles.cartHeaderIcon} />
            <h2 className={styles.cartTitle}>Tu Pedido</h2>
          </div>
          <span className={styles.cartItemsPill}>
            {totalCount} {totalCount === 1 ? 'ítem' : 'ítems'}
          </span>
        </div>

        <div className={styles.cartDivider} />

        {/* List of items */}
        <div className={styles.cartItemsContainer}>
          {cartItems.length > 0 ? (
            <ul className={styles.cartItemsList}>
              {cartItems.map(({ product, quantity }) => (
                <li key={product.id} className={styles.cartItem}>
                  <div className={styles.cartItemHeader}>
                    <span className={styles.cartItemName} title={product.name}>
                      {product.name}
                    </span>
                    {onRemove && (
                      <button
                        type="button"
                        className={styles.cartItemRemove}
                        onClick={() => onRemove(product.id)}
                        title="Quitar producto"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>

                  <div className={styles.cartItemFooter}>
                    <div className={styles.cartItemQtyControl}>
                      <button
                        type="button"
                        className={styles.cartQtyBtn}
                        onClick={() => onDecrement && onDecrement(product.id)}
                        disabled={!onDecrement}
                        aria-label="Restar uno"
                      >
                        <Minus size={12} />
                      </button>
                      <span className={styles.cartQtyVal}>{quantity}</span>
                      <button
                        type="button"
                        className={styles.cartQtyBtn}
                        onClick={() => onIncrement && onIncrement(product.id)}
                        disabled={!onIncrement || quantity >= product.stock}
                        aria-label="Sumar uno"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className={styles.cartItemPriceBlock}>
                      <span className={styles.cartItemSubtotal}>
                        {formatPrice(product.price * quantity)}
                      </span>
                      <span className={styles.cartItemUnitprice}>
                        ({formatPrice(product.price)} c/u)
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.cartEmptyState}>
              <div className={styles.cartEmptyCircle}>
                <ShoppingBag size={28} className={styles.cartEmptyIcon} />
              </div>
              <p className={styles.cartEmptyText}>Tu carrito está vacío</p>
              <span className={styles.cartEmptySub}>
                Agrega cortes de carne seleccionados desde el catálogo.
              </span>
            </div>
          )}
        </div>

        {/* Resumen / Bloque resaltado Total */}
        <div className={styles.cartSummaryBlock}>
          {showBreakdown && cartItems.length > 0 && (
            <div className={styles.cartBreakdownDetails}>
              <div className={styles.breakdownRow}>
                <span className={styles.breakdownLabel}>Subtotal de productos:</span>
                <span className={styles.breakdownVal}>{formatPrice(subtotal)}</span>
              </div>
              <div className={styles.breakdownRow}>
                <span className={styles.breakdownLabel}>
                  <Truck size={13} className={styles.inlineTruckIcon} /> Costo de envío:
                </span>
                <span className={styles.breakdownVal}>{formatPrice(effectiveShipping)}</span>
              </div>
            </div>
          )}

          <div className={styles.totalHighlightBox}>
            <span className={styles.totalLabel}>TOTAL HASTA EL MOMENTO</span>
            <span className={styles.totalValue}>{formatPrice(totalAmount)}</span>
          </div>

          {!isCheckoutMode && (
            <button
              type="button"
              className={styles.goToCartButton}
              onClick={onGoToCart}
              disabled={cartItems.length === 0}
            >
              <span>Ir a carrito</span>
              <ArrowRight size={18} className={styles.cartBtnArrow} />
            </button>
          )}
        </div>
      </div>
    </aside>
  )
}
