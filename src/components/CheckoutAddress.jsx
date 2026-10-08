import React, { useState } from 'react'
import { ArrowRight, ArrowLeft, Truck } from 'lucide-react'
import styles from './CheckoutAddress.module.css'

export default function CheckoutAddress({
  addressData,
  onUpdateAddress,
  onNext,
  onBack,
  shippingCost = 2500,
  totalAmount = 0,
}) {
  const [formData, setFormData] = useState({
    street: addressData?.street || '',
    number: addressData?.number || '',
    floor: addressData?.floor || '',
    apartment: addressData?.apartment || '',
    isBis: addressData?.isBis || false,
    notes: addressData?.notes || '',
  })

  const [errors, setErrors] = useState({})

  const formatPrice = (val) =>
    new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(val)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = {}
    if (!formData.street.trim()) {
      newErrors.street = 'Por favor ingrese el nombre de la calle'
    }
    if (!formData.number.trim()) {
      newErrors.number = 'Ingrese la numeración'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onUpdateAddress(formData)
    onNext()
  }

  return (
    <div className={styles.checkoutFlowContainer}>
      {/* Outside Card: Small metadata with shipping cost and total */}
      <div className={styles.checkoutTopMetaInfo}>
        <div className={styles.metaShipping}>
          <Truck size={15} />
          <span>
            Costo de envío: <strong>{formatPrice(shippingCost)}</strong>
          </span>
        </div>
        <div className={styles.metaTotal}>
          <span>
            Total a pagar: <strong>{formatPrice(totalAmount)}</strong>
          </span>
        </div>
      </div>

      {/* Centered White Card */}
      <div className={styles.checkoutCard}>
        <div className={styles.checkoutCardHeader}>
          <h2 className={styles.checkoutCardTitle}>Ingrese domicilio para entrega</h2>
        </div>

        <form onSubmit={handleSubmit} className={styles.checkoutForm}>
          {/* Row 1: Calle y Nro */}
          <div className={styles.formRow}>
            <div className={`${styles.formGroup} ${styles.col8}`}>
              <label htmlFor="street" className={styles.checkoutLabel}>
                Calle *
              </label>
              <input
                id="street"
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Ej. Bv. Oroño"
                className={`${styles.checkoutInput} ${errors.street ? styles.inputError : ''}`}
                autoComplete="street-address"
              />
              {errors.street && <span className={styles.fieldErrorMsg}>{errors.street}</span>}
            </div>

            <div className={`${styles.formGroup} ${styles.col4}`}>
              <label htmlFor="number" className={styles.checkoutLabel}>
                Nro *
              </label>
              <input
                id="number"
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="Ej. 1420"
                className={`${styles.checkoutInput} ${errors.number ? styles.inputError : ''}`}
              />
              {errors.number && <span className={styles.fieldErrorMsg}>{errors.number}</span>}
            </div>
          </div>

          {/* Checkbox Bis */}
          <div className={styles.formGroup}>
            <label className={styles.checkoutCheckboxLabel}>
              <input
                type="checkbox"
                name="isBis"
                checked={formData.isBis}
                onChange={handleChange}
                className={styles.checkoutCheckboxInput}
              />
              <span>Indicar numeración 'Bis'</span>
            </label>
          </div>

          {/* Row 2: Piso y Depto (Opcionales) */}
          <div className={styles.formRow}>
            <div className={`${styles.formGroup} ${styles.col6}`}>
              <label htmlFor="floor" className={styles.checkoutLabel}>
                Piso <span className={styles.optional}>(Opcional)</span>
              </label>
              <input
                id="floor"
                type="text"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                placeholder="Ej. 4"
                className={styles.checkoutInput}
              />
            </div>

            <div className={`${styles.formGroup} ${styles.col6}`}>
              <label htmlFor="apartment" className={styles.checkoutLabel}>
                Depto <span className={styles.optional}>(Opcional)</span>
              </label>
              <input
                id="apartment"
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
                placeholder="Ej. B"
                className={styles.checkoutInput}
              />
            </div>
          </div>

          {/* Action Buttons: Volver & Siguiente */}
          <div className={styles.checkoutActionsRow}>
            <button
              type="button"
              className={styles.btnOutline}
              onClick={onBack}
            >
              <ArrowLeft size={16} />
              <span>Volver</span>
            </button>

            <button type="submit" className={styles.btnBurgundy}>
              <span>Siguiente</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
