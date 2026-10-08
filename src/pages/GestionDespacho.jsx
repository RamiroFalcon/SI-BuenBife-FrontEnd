import React, { useState } from 'react'
import { Clock3, MapPin, Plus, Route } from 'lucide-react'
import styles from './GestionDespacho.module.css'

const deliveryZones = [
  { id: 'norte', label: 'Norte (Alberdi, Arroyito)' },
  { id: 'centro', label: 'Centro (Centro, Pichincha)' },
  { id: 'sur', label: 'Sur (Saladillo, Tablada)' },
]

const orders = [
  {
    id: '#ORD-2891',
    customer: 'Familia Rossi',
    address: 'Av. Alberdi 1234, 5B - Zona Norte',
    schedule: '10:00 - 13:00',
    zone: 'norte',
  },
  {
    id: '#ORD-2892',
    customer: 'Restaurante El Fuego',
    address: 'Av. San Martín 4850 - Zona Sur',
    schedule: '14:00 - 16:00 (Prioridad)',
    zone: 'sur',
    priority: true,
  },
  {
    id: '#ORD-2893',
    customer: 'M. González',
    address: 'Av. Génova 1450, PB A - Zona Norte',
    schedule: 'Cualquier horario',
    zone: 'norte',
  },
]

export default function GestionDespacho({
  onCreateRoute = () => {},
  onViewOrder = () => {},
  onAssignOrder = () => {},
}) {
  const [selectedZones, setSelectedZones] = useState(['norte', 'sur'])
  const visibleOrders = orders.filter((order) => selectedZones.includes(order.zone))

  const handleZoneChange = (zoneId) => {
    setSelectedZones((currentZones) =>
      currentZones.includes(zoneId)
        ? currentZones.filter((zone) => zone !== zoneId)
        : [...currentZones, zoneId],
    )
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerCopy}>
          <h1 className={styles.title}>Gestión de Despacho</h1>
          <p className={styles.subtitle}>Organize and route pending deliveries.</p>
        </div>
        <button type="button" className={styles.createRouteButton} onClick={onCreateRoute}>
          <Route size={18} aria-hidden="true" />
          <span>Crear Ruta</span>
          <Plus size={16} aria-hidden="true" />
        </button>
      </header>

      <div className={styles.contentGrid}>
        <aside className={styles.filtersCard} aria-labelledby="filters-title">
          <h2 id="filters-title" className={styles.filtersTitle}>Filtros</h2>

          <fieldset className={styles.filterGroup}>
            <legend className={styles.filterLegend}>Zona de Entrega</legend>
            <div className={styles.zoneList}>
              {deliveryZones.map((zone) => (
                <label key={zone.id} className={styles.zoneOption}>
                  <input
                    type="checkbox"
                    checked={selectedZones.includes(zone.id)}
                    onChange={() => handleZoneChange(zone.id)}
                    className={styles.checkbox}
                  />
                  <span>{zone.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <section className={styles.filterGroup} aria-labelledby="status-title">
            <h3 id="status-title" className={styles.filterLegend}>Estado</h3>
            <span className={styles.statusBadge}>
              <span className={styles.statusDot} aria-hidden="true" />
              Pendiente de Asignación
            </span>
          </section>
        </aside>

        <section className={styles.ordersSection} aria-label="Pedidos pendientes de despacho">
          <div className={styles.ordersHeader}>
            <h2 className={styles.ordersTitle}>Pedidos pendientes</h2>
            <span className={styles.orderCount}>
              {visibleOrders.length} {visibleOrders.length === 1 ? 'pedido' : 'pedidos'}
            </span>
          </div>

          {visibleOrders.length > 0 ? (
            <div className={styles.ordersGrid}>
              {visibleOrders.map((order) => (
                <article key={order.id} className={styles.orderCard}>
                  <span className={styles.orderId}>{order.id}</span>
                  <h3 className={styles.customerName}>{order.customer}</h3>

                  <div className={styles.orderDetails}>
                    <p className={styles.detailRow}>
                      <MapPin size={17} aria-hidden="true" />
                      <span>{order.address}</span>
                    </p>
                    <p className={styles.detailRow}>
                      <Clock3 size={17} aria-hidden="true" />
                      <span>
                        {order.priority ? (
                          <>{'14:00 - 16:00 '}<strong className={styles.priority}>(Prioridad)</strong></>
                        ) : order.schedule}
                      </span>
                    </p>
                  </div>

                  <div className={styles.cardActions}>
                    <button
                      type="button"
                      className={styles.secondaryButton}
                      onClick={() => onViewOrder(order.id)}
                    >
                      Detalles
                    </button>
                    <button
                      type="button"
                      className={styles.secondaryButton}
                      onClick={() => onAssignOrder(order.id)}
                    >
                      Asignar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              No hay pedidos pendientes en las zonas seleccionadas.
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
