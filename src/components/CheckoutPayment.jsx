import React, { useState } from 'react'
import { ArrowRight, ArrowLeft, CreditCard, ShieldCheck, ExternalLink, Info } from 'lucide-react'
import './CheckoutStyles.css'

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
    <div className="checkout-flow-container">
      {/* Centered White Card */}
      <div className="checkout-card">
        <div className="checkout-card-header">
          <h2 className="checkout-card-title">Método de pago</h2>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          {/* Dropdown Method Selector */}
          <div className="form-group">
            <label htmlFor="paymentMethod" className="checkout-label">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <CreditCard size={15} style={{ color: 'var(--primary-burgundy)' }} />
                Seleccione medio de pago *
              </span>
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={selectedMethod}
              onChange={handleChange}
              className="checkout-select"
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
            <div className="checkout-info-box">
              <ExternalLink size={20} className="checkout-info-icon" />
              <p className="checkout-info-text">
                Serás redirigido a Mercado Pago para completar tu pago de forma segura.
              </p>
            </div>
          ) : (
            <div className="checkout-info-box">
              <Info size={20} className="checkout-info-icon" />
              <p className="checkout-info-text">
                Procesaremos tu solicitud con los más estrictos estándares de seguridad y te enviaremos la confirmación inmediata por email.
              </p>
            </div>
          )}

          {/* Action Buttons: Volver & Ir a pago */}
          <div className="checkout-actions-row">
            <button
              type="button"
              className="btn-outline"
              onClick={onBack}
              disabled={isProcessing}
            >
              <ArrowLeft size={16} />
              <span>Volver</span>
            </button>

            <button
              type="submit"
              className="btn-burgundy"
              disabled={isProcessing}
            >
              <span>{isProcessing ? 'Procesando...' : 'Ir a pago'}</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Bottom Security Note */}
          <div className="checkout-security-note">
            <ShieldCheck size={16} className="checkout-security-icon" />
            <span>Pago 100% seguro y encriptado</span>
          </div>
        </form>
      </div>
    </div>
  )
}
