import React from 'react'
import { Check } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './RemitoGenerado.module.css'

export default function RemitoGenerado({
  saleId,
  onViewRemito = () => {},
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const displayedSaleId = saleId ?? location.state?.saleId ?? 'V-1043'

  return (
    <main className={styles.container}>
      <section className={styles.card} aria-labelledby="remito-generado-title">
        <div className={styles.successIcon} aria-hidden="true">
          <Check size={38} strokeWidth={2.5} />
        </div>

        <h1 id="remito-generado-title" className={styles.title}>
          ¡Remito Generado!
        </h1>

        <p className={styles.description}>
          El remito se ha generado con éxito para la venta #{displayedSaleId}
        </p>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={onViewRemito}
          >
            VER REMITO GENERADO
          </button>
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => navigate('/empleados/remitos')}
          >
            VOLVER AL LISTADO
          </button>
        </div>
      </section>
    </main>
  )
}
