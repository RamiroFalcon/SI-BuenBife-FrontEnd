import React, { useState } from 'react'
import { ArrowRight, ArrowLeft, CreditCard, ShieldCheck, ExternalLink, Info } from 'lucide-react'
import styles from './CheckoutPayment.module.css'

export default function CheckoutPayment({
  paymentMethod = 'mercadopago',
  onUpdatePaymentMethod,
  onSubmitPayment,
  onBack,
  isProcessing = false,
}) {
  const [selectedMethod, setSelectedMethod] = useState(paymentMethod)

  const paymentOptions = [
    { value: 'mercadopago', label: 'Mercado Pago (Tarjetas, Dinero en cuenta, Cuotas)' },
    { value: 'tarjeta', label: 'Tarjeta de Crédito / Débito directa' },
    { value: 'transferencia', label: 'Transferencia Bancaria Inmediata' },
    { value: 'efectivo', label: 'Efectivo contra entrega' },
  ]

  const handleChange = (e) => {
    const value = e.target.value
    setSelectedMethod(value)
    if (onUpdatePaymentMethod) {
      onUpdatePaymentMethod(value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmitPayment) {
      onSubmitPayment(selectedMethod)
    }
  }

  return (
    <div className={styles.checkoutFlowContainer}>
      {/* Centered White Card */}
      <div className={styles.checkoutCard}>
        <div className={styles.checkoutCardHeader}>
          <h2 className={styles.checkoutCardTitle}>Método de pago</h2>
        </div>

        <form onSubmit={handleSubmit} className={styles.checkoutForm}>
          {/* Dropdown Method Selector */}
          <div className={styles.formGroup}>
            <label htmlFor="paymentMethod" className={styles.checkoutLabel}>
              <span className={styles.labelIconText}>
                <CreditCard size={15} className={styles.labelIcon} />
                Seleccione medio de pago *
              </span>
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={selectedMethod}
              onChange={handleChange}
              className={styles.checkoutSelect}
              required
            >
              {paymentOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Highlighted Info Box for Mercado Pago */}
          {selectedMethod === 'mercadopago' ? (
            <div className={styles.checkoutInfoBox}>
              <ExternalLink size={20} className={styles.checkoutInfoIcon} />
              <p className={styles.checkoutInfoText}>
                Serás redirigido a Mercado Pago para completar tu pago de forma segura.
              </p>
            </div>
          ) : (
            <div className={styles.checkoutInfoBox}>
              <Info size={20} className={styles.checkoutInfoIcon} />
              <p className={styles.checkoutInfoText}>
                Procesaremos tu solicitud con los más estrictos estándares de seguridad y te enviaremos la confirmación inmediata por email.
              </p>
            </div>
          )}

          {/* Action Buttons: Volver & Ir a pago */}
          <div className={styles.checkoutActionsRow}>
            <button
              type="button"
              className={styles.btnOutline}
              onClick={onBack}
              disabled={isProcessing}
            >
              <ArrowLeft size={16} />
              <span>Volver</span>
            </button>

            <button
              type="submit"
              className={styles.btnBurgundy}
              disabled={isProcessing}
            >
              <span>{isProcessing ? 'Procesando...' : 'Ir a pago'}</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Bottom Security Note */}
          <div className={styles.checkoutSecurityNote}>
            <ShieldCheck size={16} className={styles.checkoutSecurityIcon} />
            <span>Pago 100% seguro y encriptado</span>
          </div>
        </form>
      </div>
    </div>
  )
}
