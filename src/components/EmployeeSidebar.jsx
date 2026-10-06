import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Store,
  Truck,
  FileText,
  BadgeDollarSign,
  LogOut,
  User,
} from 'lucide-react'
import styles from './EmployeeSidebar.module.css'

export default function EmployeeSidebar({
  activeTab = 'dashboard',
  onSelectTab,
  onLogout,
  user = { name: 'John Doe', role: 'Carnicero' },
}) {
  const navigate = useNavigate()
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/empleados/dashboard' },
    { id: 'mostrador', label: 'Venta en Mostrador', icon: Store, path: '/empleados/mostrador' },
    { id: 'entregas', label: 'Despacho y Entregas', icon: Truck, path: '/empleados/entregas' },
    { id: 'remito', label: 'Generar Remito', icon: FileText, path: '/empleados/remitos' },
    { id: 'caja', label: 'Cierre de Caja', icon: BadgeDollarSign, path: '/empleados/caja' },
  ]

  return (
    <aside className={styles.sidebar}>
      <div>
        <div className={styles.logoWrapper}>
          <span className={styles.logoTitle}>BuenBife</span>
          <span className={styles.logoBadge}>Gestión de Personal</span>
        </div>
        <nav className={styles.navigation}>
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                type="button"
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                onClick={() => item.path ? navigate(item.path) : onSelectTab?.(item.id)}
              >
                <Icon size={19} className={styles.navIcon} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
      <div className={styles.footerSection}>
        <div className={styles.userInfoCard}>
          <div className={styles.userAvatar}><User size={18} /></div>
          <div className={styles.userDetails}>
            <span className={styles.userName}>{user.name}</span>
            <span className={styles.userRole}>{user.role}</span>
          </div>
        </div>
        <button type="button" className={styles.logoutButton} onClick={onLogout} title="Cerrar sesión actual">
          <LogOut size={16} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  )
}
