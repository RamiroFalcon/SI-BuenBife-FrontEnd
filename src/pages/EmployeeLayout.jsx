import React, { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
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
  const { pathname } = useLocation()
  const currentTab = pathname.includes('/remitos')
    ? 'remito'
    : pathname.includes('/entregas')
      ? 'entregas'
    : pathname.endsWith('/dashboard')
      ? 'dashboard'
      : pathname.endsWith('/caja')
        ? 'caja'
        : pathname.endsWith('/mostrador')
          ? 'mostrador'
          : activeTab

  return (
    <div className={styles.layoutWrapper}>
      <EmployeeSidebar activeTab={currentTab} onSelectTab={onSelectTab} onLogout={onLogout} user={user} />
      <div className={styles.mainColumn}>
        <EmployeeTopbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} notificationCount={3} />
        <main className={styles.contentArea}>{children ?? <Outlet />}</main>
      </div>
    </div>
  )
}
