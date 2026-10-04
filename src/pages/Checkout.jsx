import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import CartSummarySidebar from '../components/CartSummarySidebar'
import CheckoutAddress from '../components/CheckoutAddress'
import CheckoutDateTime from '../components/CheckoutDateTime'
import CheckoutPayment from '../components/CheckoutPayment'
import { MapPin, Calendar, CreditCard, CheckCircle2, ShoppingBag } from 'lucide-react'
import './Checkout.css'

export default function Checkout({
  cartItems = [],
  onIncrement,
  onDecrement,
  onRemove,
  onBackToShop,
  onClearCart,
}) {
  const [currentStep, setCurrentStep] = useState(1) // 1: Domicilio, 2: Fecha/Hora, 3: Pago, 4: Éxito
  const [shippingCost] = useState(2500)

  // Order information state
  const [addressData, setAddressData] = useState({
    street: '',
    number: '',
    floor: '',
    apartment: '',
    isBis: false,
  })

  const [dateTimeData, setDateTimeData] = useState({
    date: 'hoy',
    timeSlot: '09-12',
  })

  const [paymentMethod, setPaymentMethod] = useState('mercadopago')
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderSummary, setOrderSummary] = useState(null)

  // Subtotal & Total calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )
  const effectiveShipping = cartItems.length > 0 ? shippingCost : 0
  const totalAmount = subtotal + effectiveShipping

  // Navigation handlers
  const handleAddressNext = () => setCurrentStep(2)
  const handleAddressBack = () => onBackToShop()

  const handleDateTimeNext = () => setCurrentStep(3)
  const handleDateTimeBack = () => setCurrentStep(1)

  const handlePaymentBack = () => setCurrentStep(2)

  const handlePaymentSubmit = (method) => {
    setIsProcessing(true)

    setTimeout(() => {
      setIsProcessing(false)
      setOrderSummary({
        orderNumber: `BB-${Math.floor(100000 + Math.random() * 900000)}`,
        address: addressData,
        dateTime: dateTimeData,
        paymentMethod: method,
        total: totalAmount,
        date: new Date().toLocaleDateString('es-AR'),
      })
      setCurrentStep(4)
      if (onClearCart) onClearCart()
    }, 1200)
  }

  const stepsList = [
    { number: 1, label: 'Domicilio', icon: MapPin },
    { number: 2, label: 'Fecha y Hora', icon: Calendar },
    { number: 3, label: 'Método de Pago', icon: CreditCard },
  ]

  return (
    <div className="checkout-page-layout">
      {/* Navbar with brand & profile */}
      <Navbar
        searchQuery=""
        setSearchQuery={() => {}}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
      />

      <div className="checkout-main-container">
        {/* Step Indicator / Stepper Breadcrumb */}
        {currentStep <= 3 && (
          <div className="checkout-stepper-container">
            <div className="checkout-stepper">
              {stepsList.map((st) => {
                const IconComponent = st.icon
                const isActive = currentStep === st.number
                const isCompleted = currentStep > st.number
                return (
                  <div
                    key={st.number}
                    className={`step-item ${isActive ? 'active' : ''} ${
                      isCompleted ? 'completed' : ''
                    }`}
                  >
                    <div className="step-circle">
                      {isCompleted ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <IconComponent size={16} />
                      )}
                    </div>
                    <span className="step-text">{st.label}</span>
                    {st.number < 3 && <div className="step-line" />}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* 2-Column Content Layout: Left is Form Step, Right is CartSummary */}
        <div className="checkout-content-grid">
          {/* Left Column: Active Step Card */}
          <section className="checkout-form-column">
            {currentStep === 1 && (
              <CheckoutAddress
                addressData={addressData}
                onUpdateAddress={setAddressData}
                onNext={handleAddressNext}
                onBack={handleAddressBack}
                shippingCost={effectiveShipping}
                totalAmount={totalAmount}
              />
            )}

            {currentStep === 2 && (
              <CheckoutDateTime
                dateTimeData={dateTimeData}
                onUpdateDateTime={setDateTimeData}
                onNext={handleDateTimeNext}
                onBack={handleDateTimeBack}
              />
            )}

            {currentStep === 3 && (
              <CheckoutPayment
                paymentMethod={paymentMethod}
                onUpdatePaymentMethod={setPaymentMethod}
                onSubmitPayment={handlePaymentSubmit}
                onBack={handlePaymentBack}
                isProcessing={isProcessing}
              />
            )}

            {currentStep === 4 && (
              <div className="checkout-card success-card">
                <div className="success-icon-wrapper">
                  <CheckCircle2 size={54} className="success-check-icon" />
                </div>
                <h2 className="checkout-card-title success-title">
                  ¡Pedido Confirmado con Éxito!
                </h2>
                <p className="checkout-card-subtitle">
                  Orden #{orderSummary?.orderNumber} registrada. Recibirás todos los detalles por correo.
                </p>

                <div className="success-order-details">
                  <div className="detail-item">
                    <span className="detail-label">Domicilio de entrega:</span>
                    <strong className="detail-value">
                      {orderSummary?.address.street} {orderSummary?.address.number}
                      {orderSummary?.address.isBis ? ' Bis' : ''}
                      {orderSummary?.address.floor ? ` - Piso ${orderSummary?.address.floor}` : ''}
                      {orderSummary?.address.apartment ? ` Depto ${orderSummary?.address.apartment}` : ''}
                    </strong>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Medio de Pago:</span>
                    <strong className="detail-value" style={{ textTransform: 'capitalize' }}>
                      {orderSummary?.paymentMethod === 'mercadopago' ? 'Mercado Pago' : orderSummary?.paymentMethod}
                    </strong>
                  </div>
                </div>

                <div className="checkout-actions-row" style={{ justifyContent: 'center' }}>
                  <button
                    type="button"
                    className="btn-burgundy"
                    onClick={onBackToShop}
                  >
                    <ShoppingBag size={18} />
                    <span>Volver a la tienda</span>
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* Right Column: Always Visible Cart Summary Sidebar */}
          <aside className="checkout-summary-column">
            <CartSummarySidebar
              cartItems={cartItems}
              onIncrement={onIncrement}
              onDecrement={onDecrement}
              onRemove={onRemove}
              shippingCost={effectiveShipping}
              showBreakdown={true}
              isCheckoutMode={true}
            />
          </aside>
        </div>
      </div>
    </div>
  )
}
