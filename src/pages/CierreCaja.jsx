import React, { useState } from 'react'
import {
  Calendar,
  Send,
  CheckCircle2,
  Receipt,
  FileCheck2,
  ShieldCheck,
  Building2,
  DollarSign,
  Layers,
} from 'lucide-react'
import styles from './CierreCaja.module.css'

export default function CierreCaja() {
  const [isCashVerified, setIsCashVerified] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  // Example daily tickets
  const sampleTickets = [
    {
      id: 'Ticket #0001-00004582',
      time: '09:14 hs',
      paymentMethod: 'Efectivo',
      amount: '$ 34.500,00',
    },
    {
      id: 'Ticket #0001-00004583',
      time: '10:22 hs',
      paymentMethod: 'Mercado Pago',
      amount: '$ 62.800,00',
    },
    {
      id: 'Ticket #0001-00004584',
      time: '11:45 hs',
      paymentMethod: 'Débito Visa',
      amount: '$ 48.200,00',
    },
    {
      id: 'Ticket #0001-00004585',
      time: '13:05 hs',
      paymentMethod: 'Efectivo',
      amount: '$ 91.400,00',
    },
    {
      id: 'Ticket #0001-00004586',
      time: '14:30 hs',
      paymentMethod: 'Crédito Master',
      amount: '$ 115.900,00',
    },
    {
      id: 'Ticket #0001-00004587',
      time: '17:10 hs',
      paymentMethod: 'Mercado Pago',
      amount: '$ 100.000,00',
    },
    {
      id: 'Ticket #0001-00004588',
      time: '19:50 hs',
      paymentMethod: 'Efectivo',
      amount: '$ 95.088,00',
    },
  ]

  const handleSubmitToArca = (e) => {
    e.preventDefault()
    if (!isCashVerified) return

    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setIsSubmitted(true)
    }, 1200)
  }

  return (
    <div className={styles.container}>
      {/* Encabezado */}
      <header className={styles.header}>
        <h1 className={styles.title}>Cierre de Caja</h1>
        <div className={styles.dateBadge}>
          <Calendar size={15} className={styles.calendarIcon} />
          <span>Lunes, 24 de Mayo de 2024</span>
        </div>
        <p className={styles.subtitle}>
          Revisión y confirmación de ventas diarias para envío a ARCA.
        </p>
      </header>

      {/* Success Notification if submitted */}
      {isSubmitted && (
        <div className={styles.successBanner}>
          <CheckCircle2 size={24} className={styles.successIcon} />
          <div className={styles.successContent}>
            <span className={styles.successTitle}>
              ¡Cierre de caja transmitido exitosamente a ARCA!
            </span>
            <span className={styles.successText}>
              Constancia de transmisión fiscal #ARCA-2024-884920 generada correctamente. La caja del turno ha quedado conciliada y archivada.
            </span>
          </div>
        </div>
      )}

      {/* 2-Column Content Grid */}
      <div className={styles.contentGrid}>
        {/* Panel Central (Resumen Diario) */}
        <section className={styles.centralCard}>
          <div className={styles.cardSectionTitle}>
            <Receipt size={20} />
            <span>Resumen Impositivo Diario</span>
          </div>

          {/* Fila superior: Ventas Brutas e IVA */}
          <div className={styles.taxBlocksRow}>
            <div className={styles.taxBlock}>
              <span className={styles.taxBlockLabel}>Total Ventas Brutas</span>
              <span className={styles.taxBlockValue}>$ 452.800,00</span>
            </div>

            <div className={styles.taxBlock}>
              <span className={styles.taxBlockLabel}>Total de IVA (21%)</span>
              <span className={styles.taxBlockValue}>$ 95.088,00</span>
            </div>
          </div>

          {/* Fila inferior: Bloque Ancho Rojo Borgoña */}
          <div className={styles.netYieldBlock}>
            <span className={styles.netYieldLabel}>
              <DollarSign size={18} />
              Total Neto a Rendir
            </span>
            <span className={styles.netYieldValue}>$ 547.888,00</span>
          </div>

          {/* Desglose de Comprobantes Emitidos */}
          <div className={styles.ticketsSection}>
            <div className={styles.ticketsHeader}>
              <div className={styles.cardSectionTitle} style={{ fontSize: '1.1rem' }}>
                <Layers size={18} />
                <span>Desglose de Comprobantes Emitidos</span>
              </div>
              <span className={styles.ticketsCount}>
                {sampleTickets.length} comprobantes registrados
              </span>
            </div>

            <ul className={styles.ticketsList}>
              {sampleTickets.map((t) => (
                <li key={t.id} className={styles.ticketItem}>
                  <div className={styles.ticketLeft}>
                    <span className={styles.ticketNumber}>{t.id}</span>
                    <div className={styles.ticketMeta}>
                      <span>{t.time}</span>
                      <span>•</span>
                      <span className={styles.ticketMethodBadge}>
                        {t.paymentMethod}
                      </span>
                    </div>
                  </div>
                  <span className={styles.ticketAmount}>{t.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Panel Lateral Derecho (Verificación Física) */}
        <aside className={styles.rightColumn}>
          <div className={styles.verifyCard}>
            <div className={styles.verifyHeader}>
              <Building2 size={22} className={styles.verifyIcon} />
              <h2 className={styles.verifyTitle}>Verificación Física</h2>
            </div>

            <p className={styles.verifyDescription}>
              Antes de enviar a ARCA, confirme que el dinero en la caja registradora coincide exactamente con el sistema.
            </p>

            {/* Toggle / Switch Component */}
            <label className={styles.toggleContainer}>
              <div className={styles.switchWrapper}>
                <input
                  type="checkbox"
                  checked={isCashVerified}
                  onChange={(e) => setIsCashVerified(e.target.checked)}
                  className={styles.switchInput}
                  disabled={isSubmitted}
                />
                <span className={styles.switchSlider} />
              </div>
              <span className={styles.toggleLabel}>
                El total coincide con la caja registradora y el libro manual
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="button"
              className={styles.submitButton}
              disabled={!isCashVerified || isSubmitted || submitting}
              onClick={handleSubmitToArca}
            >
              <Send size={18} />
              <span>
                {submitting
                  ? 'Transmitiendo a ARCA...'
                  : isSubmitted
                  ? 'Cierre Transmitido'
                  : 'Confirmar y Enviar a ARCA'}
              </span>
            </button>

            <div className={styles.arcaBadge}>
              <ShieldCheck size={16} />
              <span>Conexión segura con WebService ARCA (AFIP)</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
