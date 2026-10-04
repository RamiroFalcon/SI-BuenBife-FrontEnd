import React from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { CATEGORIES } from '../services/productsData'
import styles from './FilterSidebar.module.css'

export default function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  totalItemsCount = 0,
}) {
  return (
    <aside className={styles.filterSidebar}>
      <div className={styles.filterCard}>
        {/* Header */}
        <div className={styles.filterHeader}>
          <h2 className={styles.filterTitle}>Filtros</h2>
          <SlidersHorizontal size={18} className={styles.filterIcon} />
        </div>

        <div className={styles.filterDivider} />

        {/* Categories Section */}
        <div className={styles.filterGroup}>
          <span className={styles.filterSubtitle}>Categorías</span>

          <div className={styles.categoryList}>
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id
              return (
                <label
                  key={cat.id}
                  className={`${styles.categoryItem} ${isSelected ? styles.selected : ''}`}
                >
                  <div className={styles.radioContainer}>
                    <input
                      type="radio"
                      name="product-category"
                      value={cat.id}
                      checked={isSelected}
                      onChange={() => onSelectCategory(cat.id)}
                      className={styles.categoryRadio}
                    />
                    <span className={styles.customRadio} />
                  </div>
                  <span className={styles.categoryLabel}>{cat.label}</span>
                </label>
              )
            })}
          </div>
        </div>

        {/* Extra info badge */}
        <div className={styles.filterFooterInfo}>
          <span className={styles.selectionCount}>
            {totalItemsCount} {totalItemsCount === 1 ? 'corte disponible' : 'cortes disponibles'}
          </span>
        </div>
      </div>
    </aside>
  )
}
