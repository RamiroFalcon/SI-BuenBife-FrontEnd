import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import CartSummarySidebar from '../components/CartSummarySidebar'
import CheckoutAddress from '../components/CheckoutAddress'
import CheckoutDateTime from '../components/CheckoutDateTime'
import CheckoutPayment from '../components/CheckoutPayment'
import { MapPin, Calendar, CreditCard, CheckCircle2, ShoppingBag } from 'lucide-react'
import styles from './Checkout.module.css'

export default function Checkout({
  cartItems = [],
  onIncrement,
  onDecrement,
  onRemove,
  onBackToShop,
  onBackToCart,
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
  const handleAddressBack = () => (onBackToCart ? onBackToCart() : onBackToShop())

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
    <div className={styles.checkoutPageLayout}>
      {/* Navbar with brand & profile */}
      <Navbar
        searchQuery=""
        setSearchQuery={() => {}}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
      />

      <div className={styles.checkoutMainContainer}>
        {/* Step Indicator / Stepper Breadcrumb */}
        {currentStep <= 3 && (
          <div className={styles.checkoutStepperContainer}>
            <div className={styles.checkoutStepper}>
              {stepsList.map((st) => {
                const IconComponent = st.icon
                const isActive = currentStep === st.number
                const isCompleted = currentStep > st.number
                return (
                  <div
                    key={st.number}
                    className={`${styles.stepItem} ${isActive ? styles.active : ''} ${
                      isCompleted ? styles.completed : ''
                    }`}
                  >
                    <div className={styles.stepCircle}>
                      {isCompleted ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <IconComponent size={16} />
                      )}
                    </div>
                    <span className={styles.stepText}>{st.label}</span>
                    {st.number < 3 && <div className={styles.stepLine} />}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* 2-Column Content Layout: Left is Form Step, Right is CartSummary */}
        <div className={styles.checkoutContentGrid}>
          {/* Left Column: Active Step Card */}
          <section className={styles.checkoutFormColumn}>
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
              <div className={styles.successCard}>
                <div className={styles.successIconWrapper}>
                  <CheckCircle2 size={54} className={styles.successCheckIcon} />
                </div>
                <h2 className={styles.successTitle}>
                  ¡Pedido Confirmado con Éxito!
                </h2>
                <p className={styles.successSubtitle}>
                  Orden #{orderSummary?.orderNumber} registrada. Recibirás todos los detalles por correo.
                </p>

                <div className={styles.successOrderDetails}>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Domicilio de entrega:</span>
                    <strong className={styles.detailValue}>
                      {orderSummary?.address.street} {orderSummary?.address.number}
                      {orderSummary?.address.isBis ? ' Bis' : ''}
                      {orderSummary?.address.floor ? ` - Piso ${orderSummary?.address.floor}` : ''}
                      {orderSummary?.address.apartment ? ` Depto ${orderSummary?.address.apartment}` : ''}
                    </strong>
                  </div>

                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>Medio de Pago:</span>
                    <strong className={styles.detailValue} style={{ textTransform: 'capitalize' }}>
                      {orderSummary?.paymentMethod === 'mercadopago' ? 'Mercado Pago' : orderSummary?.paymentMethod}
                    </strong>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    type="button"
                    className={styles.btnBurgundy}
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
          <aside className={styles.checkoutSummaryColumn}>
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
