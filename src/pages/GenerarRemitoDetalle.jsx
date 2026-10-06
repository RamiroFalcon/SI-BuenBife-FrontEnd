import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Building2,
  Package,
  AlertTriangle,
  FileCheck2,
  CheckCircle2,
  Printer,
  Calendar,
  MapPin,
  Clock,
} from 'lucide-react'
import styles from './GenerarRemitoDetalle.module.css'

export default function GenerarRemitoDetalle({
  sale = {
    id: '#VT-2023-0895',
    client: 'Hotel Boutique Alvear',
    deliveryAddress: 'Av. Alvear 1891',
    saleDate: '15 Oct, 2023 11:45',
    items: [
      { id: 1, name: 'Ojo de Bife (Corte entero)', quantity: '15 kg' },
      { id: 2, name: 'Chorizo Puro Cerdo', quantity: '5 kg' },
      { id: 3, name: 'Asado de Tira', quantity: '10 kg' },
    ],
  },
  onBackToList = () => {},
}) {
  const navigate = useNavigate()
  const [remitoResult, setRemitoResult] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleConfirmRemito = () => {
    setIsGenerating(true)

    setTimeout(() => {
      setIsGenerating(false)
      const now = new Date()
      const formattedDate = now.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      const formattedTime = now.toLocaleTimeString('es-AR', {
        hour: '2-digit',
        minute: '2-digit',
      })

      // Generate realistic sequential packing slip number
      const randomRemitoNumber = `RTO-0001-${Math.floor(100000 + Math.random() * 900000)}`

      setRemitoResult({
        remitoNumber: randomRemitoNumber,
        timestamp: `${formattedDate} ${formattedTime} hs`,
        issuedBy: 'Operador Mostrador / Carnicería',
      })
      navigate('/empleados/remitos/exito', {
        state: { saleId: sale.id.replace(/^#/, '') },
      })
    }, 850)
  }

  return (
    <div className={styles.container}>
      {/* Encabezado Superior */}
      <div className={styles.headerSection}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => {
            onBackToList()
            navigate('/empleados/remitos')
          }}
          title="Regresar a ventas pendientes de remito"
        >
          <ArrowLeft size={16} />
          <span>Volver al listado</span>
        </button>

        <h1 className={styles.title}>Detalle de Venta {sale.id}</h1>
      </div>

      {/* Success Banner if Remito is already generated */}
      {remitoResult && (
        <div className={styles.successBanner}>
          <CheckCircle2 size={28} className={styles.successIcon} />
          <div className={styles.successContent}>
            <span className={styles.successHeading}>
              ¡Remito Oficial Generado Exitosamente!
            </span>
            <div className={styles.successMeta}>
              <span className={styles.successMetaItem}>
                Número de Remito: <strong>{remitoResult.remitoNumber}</strong>
              </span>
              <span className={styles.successMetaItem}>
                Fecha y Hora de Emisión: <strong>{remitoResult.timestamp}</strong>
              </span>
              <span className={styles.successMetaItem}>
                Venta Asociada: <strong>{sale.id}</strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tarjeta de Datos del Cliente */}
      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <Building2 size={20} className={styles.cardIcon} />
          <h2 className={styles.cardTitle}>Datos del Cliente y Entrega</h2>
        </div>

        <div className={styles.customerGrid}>
          <div className={styles.infoBlock}>
            <span className={styles.infoLabel}>Cliente</span>
            <span className={styles.infoValue}>{sale.client}</span>
          </div>

          <div className={styles.infoBlock}>
            <span className={styles.infoLabel}>Dirección de Entrega</span>
            <span className={styles.infoValue}>{sale.deliveryAddress}</span>
          </div>

          <div className={styles.infoBlock}>
            <span className={styles.infoLabel}>Fecha de Venta</span>
            <span className={styles.infoValue}>{sale.saleDate}</span>
          </div>
        </div>
      </section>

      {/* Tarjeta de Productos */}
      <section className={styles.card}>
        <div className={styles.cardHeader}>
          <Package size={20} className={styles.cardIcon} />
          <h2 className={styles.cardTitle}>Detalle de Productos para Envío</h2>
        </div>

        <ul className={styles.productsList}>
          {sale.items.map((item) => (
            <li key={item.id} className={styles.productItem}>
              <div className={styles.productLeft}>
                <span className={styles.productBullet} />
                <span className={styles.productName}>{item.name}</span>
              </div>
              <span className={styles.productWeightBadge}>{item.quantity}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Panel de Acción (Inferior) */}
      <footer className={styles.actionPanel}>
        <div className={styles.warningBox}>
          <AlertTriangle size={20} className={styles.warningIcon} />
          <p className={styles.warningText}>
            Verifique que la mercadería física coincida con el detalle antes de generar el documento de envío.
          </p>
        </div>

        <button
          type="button"
          className={styles.confirmButton}
          disabled={isGenerating || Boolean(remitoResult)}
          onClick={handleConfirmRemito}
        >
          <FileCheck2 size={18} />
          <span>
            {isGenerating
              ? 'Generando remito...'
              : remitoResult
              ? 'Remito Confirmado'
              : 'CONFIRMAR GENERACIÓN DE REMITO'}
          </span>
        </button>
      </footer>
    </div>
  )
}
