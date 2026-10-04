import React from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { CATEGORIES } from '../services/productsData'
import './FilterSidebar.css'

export default function FilterSidebar({
  selectedCategory,
  onSelectCategory,
  totalItemsCount = 0,
}) {
  return (
    <aside className="filter-sidebar">
      <div className="filter-card">
        {/* Header */}
        <div className="filter-header">
          <h2 className="filter-title">Filtros</h2>
          <SlidersHorizontal size={18} className="filter-icon" />
        </div>

        <div className="filter-divider" />

        {/* Categories Section */}
        <div className="filter-group">
          <span className="filter-subtitle">Categorías</span>

          <div className="category-list">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id
              return (
                <label
                  key={cat.id}
                  className={`category-item ${isSelected ? 'selected' : ''}`}
                >
                  <div className="radio-container">
                    <input
                      type="radio"
                      name="product-category"
                      value={cat.id}
                      checked={isSelected}
                      onChange={() => onSelectCategory(cat.id)}
                      className="category-radio"
                    />
                    <span className="custom-radio" />
                  </div>
                  <span className="category-label">{cat.label}</span>
                </label>
              )
            })}
          </div>
        </div>

        {/* Extra info badge */}
        <div className="filter-footer-info">
          <span className="selection-count">
            {totalItemsCount} {totalItemsCount === 1 ? 'corte disponible' : 'cortes disponibles'}
          </span>
        </div>
      </div>
    </aside>
  )
}
