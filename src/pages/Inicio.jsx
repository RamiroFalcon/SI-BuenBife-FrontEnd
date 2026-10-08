import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag, UserCheck, ArrowRight } from 'lucide-react'
import styles from './Inicio.module.css'

export default function Inicio() {
  const navigate = useNavigate()

  const accesos = [
    {
      id: 'tienda',
      label: 'Tienda Cliente',
      description: 'Explorá nuestros cortes, armá tu pedido y recibilo en tu casa.',
      icon: ShoppingBag,
      path: '/tienda',
    },
    {
      id: 'empleados',
      label: 'Portal Empleados',
      description: 'Venta en mostrador, despacho, remitos y cierre de caja.',
      icon: UserCheck,
      path: '/empleados/remitos',
    },
  ]

  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <section className={styles.hero}>
          <h1 className={styles.logo}>BuenBife</h1>
          <span className={styles.tagline}>Carnicería & Selección</span>
          <p className={styles.subtitle}>
            Cortes seleccionados, achuras y vinos para tu mesa. Elegí cómo querés ingresar.
          </p>
        </section>

        <section className={styles.accesos}>
          {accesos.map((acceso) => {
            const Icon = acceso.icon
            return (
              <button
                key={acceso.id}
                type="button"
                className={styles.card}
                onClick={() => navigate(acceso.path)}
              >
                <div className={styles.cardIcon}>
                  <Icon size={26} />
                </div>
                <h2 className={styles.cardTitle}>{acceso.label}</h2>
                <p className={styles.cardDescription}>{acceso.description}</p>
                <span className={styles.cardAction}>
                  Ingresar <ArrowRight size={16} />
                </span>
              </button>
            )
          })}
        </section>
      </main>
    </div>
  )
}
