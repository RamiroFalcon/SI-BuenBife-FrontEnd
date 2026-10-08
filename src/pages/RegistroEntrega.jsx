import React, { useState } from 'react'
import { ArrowLeft, MapPin, Package, Phone, UserRound } from 'lucide-react'
import styles from './RegistroEntrega.module.css'

const orderItems = [
  { id: 1, name: 'Ojo de Bife', quantity: '15 kg' },
  { id: 2, name: 'Chorizo Puro Cerdo', quantity: '5 kg' },
  { id: 3, name: 'Asado de Tira', quantity: '10 kg' },
]

const deliveryStatuses = ['Óptimo', 'Aceptable', 'Con Novedad']

export default function RegistroEntrega({
  onBack = () => {},
  onCancel = () => {},
  onConfirmDelivery = () => {},
}) {
  const [status, setStatus] = useState('Óptimo')
  const [form, setForm] = useState({
    date: '2023-10-27',
    estimatedTime: '14:30',
    recipient: 'Juan Pérez',
    comments: '',
  })

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onConfirmDelivery({ ...form, status })
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backButton}
          onClick={onBack}
          aria-label="Volver"
          title="Volver"
        >
          <ArrowLeft size={19} aria-hidden="true" />
        </button>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Registro de Entrega</h1>
          <p className={styles.subtitle}>Completar detalles para el Remito #REM-2023-1048</p>
        </div>
      </header>

      <div className={styles.columns}>
        <div className={styles.orderColumn}>
          <section className={styles.infoCard} aria-labelledby="customer-title">
            <div className={styles.cardHeading}>
              <span className={styles.cardIcon}><UserRound size={18} aria-hidden="true" /></span>
              <h2 id="customer-title" className={styles.cardTitle}>Cliente</h2>
            </div>
            <dl className={styles.customerInfo}>
              <div>
                <dt>Nombre</dt>
                <dd>Restaurante El Parrillón</dd>
              </div>
              <div>
                <dt>Dirección</dt>
                <dd className={styles.iconValue}><MapPin size={15} aria-hidden="true" /> Av. Pellegrini 1500, Rosario</dd>
              </div>
              <div>
                <dt>Contacto</dt>
                <dd className={styles.iconValue}><Phone size={15} aria-hidden="true" /> +54 11 4567-8900</dd>
              </div>
            </dl>
          </section>

          <section className={styles.infoCard} aria-labelledby="order-title">
            <div className={styles.cardHeading}>
              <span className={styles.cardIcon}><Package size={18} aria-hidden="true" /></span>
              <h2 id="order-title" className={styles.cardTitle}>Detalle del Pedido</h2>
            </div>
            <ul className={styles.productList}>
              {orderItems.map((item) => (
                <li key={item.id} className={styles.productItem}>
                  <span>{item.name}</span>
                  <strong>{item.quantity}</strong>
                </li>
              ))}
            </ul>
            <div className={styles.packageTotal}>
              <span>Total Bultos</span>
              <strong>3</strong>
            </div>
          </section>
        </div>

        <form className={styles.formCard} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Datos de la Entrega</h2>

          <div className={styles.dateTimeRow}>
            <label className={styles.field} htmlFor="delivery-date">
              <span>Fecha</span>
              <input
                id="delivery-date"
                type="date"
                value={form.date}
                onChange={updateField('date')}
              />
            </label>
            <label className={styles.field} htmlFor="delivery-time">
              <span>Hora Estimada</span>
              <input
                id="delivery-time"
                type="time"
                value={form.estimatedTime}
                onChange={updateField('estimatedTime')}
              />
            </label>
          </div>

          <label className={styles.field} htmlFor="delivery-recipient">
            <span>Nombre del Responsable (Quien Recibe)</span>
            <input
              id="delivery-recipient"
              type="text"
              value={form.recipient}
              onChange={updateField('recipient')}
              placeholder="Ingresá el nombre de quien recibe"
              required
            />
          </label>

          <fieldset className={styles.statusFieldset}>
            <legend>Estado de la Mercadería</legend>
            <div className={styles.statusOptions}>
              {deliveryStatuses.map((deliveryStatus) => (
                <button
                  key={deliveryStatus}
                  type="button"
                  className={`${styles.statusButton} ${status === deliveryStatus ? styles.statusActive : ''}`}
                  aria-pressed={status === deliveryStatus}
                  onClick={() => setStatus(deliveryStatus)}
                >
                  {deliveryStatus}
                </button>
              ))}
            </div>
          </fieldset>

          <label className={`${styles.field} ${styles.commentsField}`} htmlFor="delivery-comments">
            <span>Observaciones / Comentarios</span>
            <textarea
              id="delivery-comments"
              rows="5"
              value={form.comments}
              onChange={updateField('comments')}
              placeholder="Agregá observaciones sobre la entrega..."
            />
          </label>

          <div className={styles.formActions}>
            <button type="button" className={styles.cancelButton} onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className={styles.confirmButton}>
              Confirmar Entrega
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
