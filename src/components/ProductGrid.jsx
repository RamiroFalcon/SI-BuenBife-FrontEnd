import React from 'react'
import ProductCard from './ProductCard'
import { Sparkles, PackageOpen } from 'lucide-react'
import styles from './ProductGrid.module.css'

export default function ProductGrid({
  products,
  cart,
  onIncrement,
  onDecrement,
  categoryTitle,
}) {
  return (
    <section className={styles.productGridSection}>
      {/* Grid Header */}
      <div className={styles.gridHeader}>
        <div>
          <div className={styles.gridBadge}>
            <Sparkles size={14} />
            <span>Selección de Primera</span>
          </div>
          <h1 className={styles.gridTitle}>{categoryTitle}</h1>
        </div>
        <span className={styles.gridCount}>
          {products.length} {products.length === 1 ? 'producto' : 'productos'}
        </span>
      </div>

      {/* Grid List */}
      {products.length > 0 ? (
        <div className={styles.productGrid}>
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
        <div className={styles.emptyGrid}>
          <PackageOpen size={48} className={styles.emptyIcon} />
          <h3 className={styles.emptyTitle}>No se encontraron productos</h3>
          <p className={styles.emptyDesc}>
            Prueba seleccionando otra categoría o limpiando la barra de búsqueda.
          </p>
        </div>
      )}
    </section>
  )
}
