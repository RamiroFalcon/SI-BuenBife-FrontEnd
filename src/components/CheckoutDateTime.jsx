import React, { useState } from 'react'
import { ArrowRight, ArrowLeft, Calendar, Clock } from 'lucide-react'
import './CheckoutStyles.css'

export default function CheckoutDateTime({
  dateTimeData,
  onUpdateDateTime,
  onNext,
  onBack,
}) {
  const [formData, setFormData] = useState({
    date: dateTimeData?.date || 'hoy',
    timeSlot: dateTimeData?.timeSlot || '09-12',
  })

  const availableDates = [
    { value: 'hoy', label: 'Hoy (Entrega prioritaria del día)' },
    { value: 'manana', label: 'Mañana (Horario regular)' },
    { value: 'en-2-dias', label: 'En 48 hs (Programado)' },
    { value: 'fin-de-semana', label: 'Próximo Sábado (Especial Asado)' },
  ]

  const availableTimeSlots = [
    { value: '09-12', label: '09:00 a 12:00 hs — Franja Mañana' },
    { value: '12-15', label: '12:00 a 15:00 hs — Franja Mediodía' },
    { value: '15-18', label: '15:00 a 18:00 hs — Franja Tarde' },
    { value: '18-21', label: '18:00 a 21:00 hs — Franja Noche' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdateDateTime(formData)
    onNext()
  }

  return (
    <div className="checkout-flow-container">
      {/* Centered White Card */}
      <div className="checkout-card">
        <div className="checkout-card-header">
          <h2 className="checkout-card-title">
            Seleccione fecha y hora de recepción del pedido
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          {/* Dropdown 1: Fecha */}
          <div className="form-group">
            <label htmlFor="date" className="checkout-label">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={15} style={{ color: 'var(--primary-burgundy)' }} />
                Fecha de entrega *
              </span>
            </label>
            <select
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="checkout-select"
              required
            >
              {availableDates.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown 2: Rango Horario */}
          <div className="form-group">
            <label htmlFor="timeSlot" className="checkout-label">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Clock size={15} style={{ color: 'var(--primary-burgundy)' }} />
                Rango horario *
              </span>
            </label>
            <select
              id="timeSlot"
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              className="checkout-select"
              required
            >
              {availableTimeSlots.map((ts) => (
                <option key={ts.value} value={ts.value}>
                  {ts.label}
                </option>
              ))}
            </select>
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
