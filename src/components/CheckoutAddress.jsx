import React, { useState } from 'react'
import { ArrowRight, ArrowLeft, Truck, MapPin } from 'lucide-react'
import './CheckoutStyles.css'

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
    <div className="checkout-flow-container">
      {/* Outside Card: Small metadata with shipping cost and total */}
      <div className="checkout-top-meta-info">
        <div className="meta-shipping">
          <Truck size={15} />
          <span>
            Costo de envío: <strong>{formatPrice(shippingCost)}</strong>
          </span>
        </div>
        <div className="meta-total">
          <span>
            Total a pagar: <strong>{formatPrice(totalAmount)}</strong>
          </span>
        </div>
      </div>

      {/* Centered White Card */}
      <div className="checkout-card">
        <div className="checkout-card-header">
          <h2 className="checkout-card-title">Ingrese domicilio para entrega</h2>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          {/* Row 1: Calle y Nro */}
          <div className="form-row">
            <div className="form-group col-8">
              <label htmlFor="street" className="checkout-label">
                Calle *
              </label>
              <input
                id="street"
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Ej. Av. del Libertador"
                className={`checkout-input ${errors.street ? 'input-error' : ''}`}
                autoComplete="street-address"
              />
              {errors.street && <span className="field-error-msg">{errors.street}</span>}
            </div>

            <div className="form-group col-4">
              <label htmlFor="number" className="checkout-label">
                Nro *
              </label>
              <input
                id="number"
                type="text"
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="Ej. 1420"
                className={`checkout-input ${errors.number ? 'input-error' : ''}`}
              />
              {errors.number && <span className="field-error-msg">{errors.number}</span>}
            </div>
          </div>

          {/* Checkbox Bis */}
          <div className="form-group">
            <label className="checkout-checkbox-label">
              <input
                type="checkbox"
                name="isBis"
                checked={formData.isBis}
                onChange={handleChange}
                className="checkout-checkbox-input"
              />
              <span>Indicar numeración 'Bis'</span>
            </label>
          </div>

          {/* Row 2: Piso y Depto (Opcionales) */}
          <div className="form-row">
            <div className="form-group col-6">
              <label htmlFor="floor" className="checkout-label">
                Piso <span className="optional">(Opcional)</span>
              </label>
              <input
                id="floor"
                type="text"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                placeholder="Ej. 4"
                className="checkout-input"
              />
            </div>

            <div className="form-group col-6">
              <label htmlFor="apartment" className="checkout-label">
                Depto <span className="optional">(Opcional)</span>
              </label>
              <input
                id="apartment"
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handleChange}
                placeholder="Ej. B"
                className="checkout-input"
              />
            </div>
          </div>

          {/* Action Buttons: Volver & Siguiente */}
          <div className="checkout-actions-row">
            <button
              type="button"
              className="btn-outline"
              onClick={onBack}
            >
              <ArrowLeft size={16} />
              <span>Volver</span>
            </button>

            <button type="submit" className="btn-burgundy">
              <span>Siguiente</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
