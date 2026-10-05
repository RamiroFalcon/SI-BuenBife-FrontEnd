import React from 'react'
import {
  Store,
  Truck,
  FileText,
  BadgeDollarSign,
  TrendingUp,
  PackageCheck,
  Clock,
  ArrowRight,
} from 'lucide-react'
import styles from './Dashboard.module.css'

export default function Dashboard({ onNavigate = () => {} }) {
  const quickStats = [
    {
      id: 'ventas',
      label: 'Ventas en mostrador hoy',
      value: '$ 485.600',
      icon: TrendingUp,
    },
    {
      id: 'pedidos',
      label: 'Pedidos para despacho',
      value: '14 órdenes',
      icon: PackageCheck,
    },
    {
      id: 'remitos',
      label: 'Remitos generados',
      value: '8 registros',
      icon: FileText,
    },
    {
      id: 'caja',
      label: 'Estado de caja',
      value: 'Turno Abierto',
      icon: Clock,
    },
  ]

  const modules = [
    { id: 'mostrador', label: 'Venta en Mostrador', icon: Store },
    { id: 'entregas', label: 'Despacho y Entregas', icon: Truck },
    { id: 'remito', label: 'Generar Remito', icon: FileText },
    { id: 'caja', label: 'Cierre de Caja', icon: BadgeDollarSign },
  ]

  return (
    <div className={styles.dashboardContainer}>
      {/* Welcome Card with explicitly requested greeting */}
      <section className={styles.welcomeCard}>
        <h1 className={styles.welcomeTitle}>Bienvenido al Portal de Empleados</h1>
        <p className={styles.welcomeSubtitle}>
          Sistema integral de operaciones BuenBife. Gestiona pedidos de mostrador, entregas de carnicería, emisión de remitos y cuadre de caja de tu turno diario.
        </p>
      </section>

      {/* Quick Metrics */}
      <section className={styles.metricsGrid}>
        {quickStats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.id} className={styles.metricCard}>
              <div className={styles.metricIconWrapper}>
                <Icon size={22} />
              </div>
              <div className={styles.metricContent}>
                <span className={styles.metricValue}>{stat.value}</span>
                <span className={styles.metricLabel}>{stat.label}</span>
              </div>
            </div>
          )
        })}
      </section>

      {/* Modules Shortcuts */}
      <section className={styles.modulesSection}>
        <h2 className={styles.sectionHeader}>Accesos Rápidos a Módulos</h2>
        <div className={styles.modulesList}>
          {modules.map((m) => {
            const Icon = m.icon
            return (
              <button
                key={m.id}
                type="button"
                className={styles.moduleButton}
                onClick={() => onNavigate(m.id)}
              >
                <Icon size={20} className={styles.moduleIcon} />
                <span>{m.label}</span>
                <ArrowRight size={16} style={{ marginLeft: 'auto', opacity: 0.6 }} />
              </button>
            )
          })}
        </div>
      </section>
    </div>
  )
}
