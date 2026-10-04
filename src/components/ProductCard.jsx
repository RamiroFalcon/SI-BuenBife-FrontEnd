import React from 'react'
import { Plus, Minus } from 'lucide-react'
import './ProductCard.css'

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
    <article className="product-card">
      {/* Top Image & Badge */}
      <div className="product-media">
        <span className="product-badge">{categoryLabel}</span>
        <img
          src={image}
          alt={name}
          className="product-image"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="product-info">
        <h3 className="product-title" title={name}>
          {name}
        </h3>
        
        {description && (
          <p className="product-description">{description}</p>
        )}

        <div className="product-meta">
          {/* Price */}
          <div className="product-pricing">
            <span className="product-price">{formattedPrice}</span>
            <span className="product-unit">/ {unit}</span>
          </div>

          {/* Stock in subtle grey */}
          <span className={`product-stock ${isLowStock ? 'stock-low' : ''}`}>
            {stock > 0 ? `Stock: ${stock} ${unit} disp.` : 'Agotado'}
          </span>
        </div>

        {/* Pill-shaped Quantity Control */}
        <div className="product-actions">
          <div className={`quantity-pill ${quantity > 0 ? 'active' : ''}`}>
            <button
              type="button"
              className="pill-button"
              onClick={() => onDecrement(product.id)}
              disabled={quantity === 0}
              aria-label={`Disminuir cantidad de ${name}`}
            >
              <Minus size={15} />
            </button>

            <span className="pill-quantity">{quantity}</span>

            <button
              type="button"
              className="pill-button"
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
