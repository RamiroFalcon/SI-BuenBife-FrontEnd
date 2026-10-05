import React, { useState } from 'react'
import EmployeeSidebar from '../components/EmployeeSidebar'
import EmployeeTopbar from '../components/EmployeeTopbar'
import styles from './EmployeeLayout.module.css'

export default function EmployeeLayout({
  children,
  activeTab = 'dashboard',
  onSelectTab = () => {},
  onLogout = () => {},
  user = { name: 'John Doe', role: 'Carnicero' },
}) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className={styles.layoutWrapper}>
      {/* Left Fixed Navigation Sidebar (250px) */}
      <EmployeeSidebar
        activeTab={activeTab}
        onSelectTab={onSelectTab}
        onLogout={onLogout}
        user={user}
      />

      {/* Right Main Column */}
      <div className={styles.mainColumn}>
        {/* Topbar with search and notifications */}
        <EmployeeTopbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notificationCount={3}
        />

        {/* Content Area for Business Cases (Venta, Entregas, Remitos, Cierre de caja) */}
        <main className={styles.contentArea}>
          {children}
        </main>
      </div>
    </div>
  )
}
