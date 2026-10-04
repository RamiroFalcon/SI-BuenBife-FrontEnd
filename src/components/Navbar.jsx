import React from 'react'
import { Search, User, ShoppingBag } from 'lucide-react'
import './Navbar.css'

export default function Navbar({ searchQuery, setSearchQuery, cartCount = 0 }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <div className="navbar-brand">
          <span className="navbar-logo-text">BuenBife</span>
          <span className="navbar-tagline">Carnicería & Selección</span>
        </div>

        {/* Right Action Icons */}
        <div className="navbar-actions">
          {/* Search Box */}
          <div className="search-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Buscar corte, vino o achuras..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* User profile */}
          <div className="user-profile" title="Perfil de usuario">
            <div className="user-avatar">
              <User size={18} />
            </div>
            <span className="user-name">John Doe</span>
          </div>

          {/* Cart Icon indicator */}
          <div className="cart-badge-button" title="Carrito de compras">
            <ShoppingBag size={20} className="cart-icon" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
        </div>
      </div>
    </header>
  )
}
