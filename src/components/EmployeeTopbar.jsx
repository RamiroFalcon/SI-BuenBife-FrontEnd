import React from 'react'
import { Search, Bell } from 'lucide-react'
import styles from './EmployeeTopbar.module.css'

export default function EmployeeTopbar({
  searchQuery = '',
  setSearchQuery = () => {},
  notificationCount = 3,
  onNotificationClick = () => {},
}) {
  return (
    <header className={styles.topbar}>
      {/* General Search Input */}
      <div className={styles.searchWrapper}>
        <Search size={18} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Buscar pedido, cliente, corte o remito..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* Right Controls: Shift status & Notifications */}
      <div className={styles.actionsGroup}>
        <div className={styles.systemStatus} title="Sistema en línea y sincronizado">
          <span className={styles.statusIndicator} />
          <span>Turno Activo</span>
        </div>

        <button
          type="button"
          className={styles.notificationButton}
          onClick={onNotificationClick}
          title="Notificaciones operativas"
          aria-label="Notificaciones"
        >
          <Bell size={19} />
          {notificationCount > 0 && (
            <span className={styles.notificationBadge}>{notificationCount}</span>
          )}
        </button>
      </div>
    </header>
  )
}
