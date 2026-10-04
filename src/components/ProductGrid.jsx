import React from 'react'
import ProductCard from './ProductCard'
import { Sparkles, PackageOpen } from 'lucide-react'
import './ProductGrid.css'

export default function ProductGrid({
  products,
  cart,
  onIncrement,
  onDecrement,
  categoryTitle,
}) {
  return (
    <section className="product-grid-section">
      {/* Grid Header */}
      <div className="grid-header">
        <div>
          <div className="grid-badge">
            <Sparkles size={14} />
            <span>Selección de Primera</span>
          </div>
          <h1 className="grid-title">{categoryTitle}</h1>
        </div>
        <span className="grid-count">
          {products.length} {products.length === 1 ? 'producto' : 'productos'}
        </span>
      </div>

      {/* Grid List */}
      {products.length > 0 ? (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={cart[product.id] || 0}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
            />
          ))}
        </div>
      ) : (
        <div className="empty-grid">
          <PackageOpen size={48} className="empty-icon" />
          <h3 className="empty-title">No se encontraron productos</h3>
          <p className="empty-desc">
            Prueba seleccionando otra categoría o limpiando la barra de búsqueda.
          </p>
        </div>
      )}
    </section>
  )
}
