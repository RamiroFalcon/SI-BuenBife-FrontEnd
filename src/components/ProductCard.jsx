import React from 'react'
import { Plus, Minus } from 'lucide-react'
import styles from './ProductCard.module.css'

export default function ProductCard({
  product,
  quantity = 0,
  onIncrement,
  onDecrement,
}) {
  const { name, categoryLabel, price, unit, stock, image, description } = product

  const formattedPrice = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price)

  const isLowStock = stock <= 8

  return (
    <article className={styles.productCard}>
      {/* Top Image & Badge */}
      <div className={styles.productMedia}>
        <span className={styles.productBadge}>{categoryLabel}</span>
        <img
          src={image}
          alt={name}
          className={styles.productImage}
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className={styles.productInfo}>
        <h3 className={styles.productTitle} title={name}>
          {name}
        </h3>
        
        {description && (
          <p className={styles.productDescription}>{description}</p>
        )}

        <div className={styles.productMeta}>
          {/* Price */}
          <div className={styles.productPricing}>
            <span className={styles.productPrice}>{formattedPrice}</span>
            <span className={styles.productUnit}>/ {unit}</span>
          </div>

          {/* Stock in subtle grey */}
          <span className={`${styles.productStock} ${isLowStock ? styles.stockLow : ''}`}>
            {stock > 0 ? `Stock: ${stock} ${unit} disp.` : 'Agotado'}
          </span>
        </div>

        {/* Pill-shaped Quantity Control */}
        <div className={styles.productActions}>
          <div className={`${styles.quantityPill} ${quantity > 0 ? styles.active : ''}`}>
            <button
              type="button"
              className={styles.pillButton}
              onClick={() => onDecrement(product.id)}
              disabled={quantity === 0}
              aria-label={`Disminuir cantidad de ${name}`}
            >
              <Minus size={15} />
            </button>

            <span className={styles.pillQuantity}>{quantity}</span>

            <button
              type="button"
              className={styles.pillButton}
              onClick={() => onIncrement(product.id)}
              disabled={quantity >= stock}
              aria-label={`Aumentar cantidad de ${name}`}
            >
              <Plus size={15} />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
