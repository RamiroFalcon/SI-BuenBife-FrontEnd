import React from 'react'
import { Link } from 'react-router-dom'
import { Search, User, ShoppingBag } from 'lucide-react'
import styles from './Navbar.module.css'

export default function Navbar({ searchQuery, setSearchQuery, cartCount = 0 }) {
  return (
    <header className={styles.navbar}>
      <div className={styles.navbarContainer}>
        {/* Brand Logo */}
        <Link to="/" className={styles.navbarBrand} title="Ir al inicio">
          <span className={styles.navbarLogoText}>BuenBife</span>
          <span className={styles.navbarTagline}>Carnicería & Selección</span>
        </Link>

        {/* Right Action Icons */}
        <div className={styles.navbarActions}>
          {/* Search Box */}
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={18} />
            <input
              type="text"
              placeholder="Buscar corte, vino o achuras..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* User profile */}
          <div className={styles.userProfile} title="Perfil de usuario">
            <div className={styles.userAvatar}>
              <User size={18} />
            </div>
            <span className={styles.userName}>John Doe</span>
          </div>

          {/* Cart Icon indicator */}
          <div className={styles.cartBadgeButton} title="Carrito de compras">
            <ShoppingBag size={20} className={styles.cartIcon} />
            {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
          </div>
        </div>
      </div>
    </header>
  )
}
