import React, { useState } from 'react'
import {
  Clock3,
  GripVertical,
  MapPin,
  MapPinned,
  Package,
  Route,
  Truck,
  Weight,
} from 'lucide-react'
import styles from './PlanificacionRuta.module.css'

const routeStops = [
  {
    id: '#ORD-0921',
    customer: 'Restaurante La Parrilla',
    address: 'Av. Libertador 1234',
    weight: '85kg',
  },
  {
    id: '#ORD-0922',
    customer: 'Familia Martínez',
    address: 'Cabildo 2450',
    weight: '110kg',
  },
  {
    id: '#ORD-0923',
    customer: 'Mercado Belgrano',
    address: 'Juramento 2100',
    weight: '225kg',
  },
]

const drivers = ['Carlos Fernández', 'Lucía Gómez', 'Martín Rodríguez']

const routeStats = [
  { label: 'OCUPACIÓN', value: '75%', icon: Package },
  { label: 'PESO TOTAL', value: '420kg', icon: Weight },
  { label: 'ENTREGAS', value: '12', icon: MapPin },
  { label: 'EST. TIEMPO', value: '3h 45m', icon: Clock3 },
]

export default function PlanificacionRuta({
  onOptimizeRoute = () => {},
  onConfirmAssign = () => {},
  onSaveDraft = () => {},
}) {
  const [selectedDriver, setSelectedDriver] = useState('')

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headingGroup}>
          <span className={styles.eyebrow}><Truck size={16} aria-hidden="true" /> DESPACHO</span>
          <h1 className={styles.title}>Planificación de Ruta: Zona Norte</h1>
          <p className={styles.subtitle}>Vehículo Asignado: Furgón Refrigerado 01</p>
        </div>
      </header>

      <section className={styles.statsGrid} aria-label="Indicadores de la ruta">
        {routeStats.map(({ label, value, icon: Icon }) => (
          <article key={label} className={styles.statCard}>
            <span className={styles.statIcon}><Icon size={18} aria-hidden="true" /></span>
            <div className={styles.statCopy}>
              <span className={styles.statLabel}>{label}</span>
              <strong className={styles.statValue}>{value}</strong>
            </div>
          </article>
        ))}
      </section>

      <div className={styles.mainGrid}>
        <section className={styles.sequenceSection} aria-labelledby="sequence-title">
          <div className={styles.sectionHeading}>
            <div>
              <h2 id="sequence-title" className={styles.sectionTitle}>Secuencia de Entrega</h2>
              <p className={styles.sectionHint}>Arrastrá las paradas para cambiar el orden</p>
            </div>
            <button
              type="button"
              className={styles.optimizeButton}
              onClick={onOptimizeRoute}
            >
              <Route size={17} aria-hidden="true" />
              Optimizar Ruta
            </button>
          </div>

          <ol className={styles.stopList}>
            {routeStops.map((stop, index) => (
              <li key={stop.id} className={styles.stopCard}>
                <span className={styles.dragHandle} aria-label="Arrastrar para reordenar">
                  <GripVertical size={20} aria-hidden="true" />
                </span>
                <div className={styles.stopContent}>
                  <span className={styles.stopId}>{stop.id}</span>
                  <h3 className={styles.customerName}>{stop.customer}</h3>
                  <p className={styles.stopMeta}>
                    <MapPin size={15} aria-hidden="true" />
                    <span>{stop.address}</span>
                    <span className={styles.metaDivider} aria-hidden="true">•</span>
                    <Weight size={15} aria-hidden="true" />
                    <span>{stop.weight}</span>
                  </p>
                </div>
                <span className={styles.stopNumber} aria-label={`Parada ${index + 1}`}>
                  {index + 1}
                </span>
              </li>
            ))}
          </ol>
        </section>

        <aside className={styles.routeAside}>
          <section className={styles.mapPlaceholder} aria-label="Vista previa del mapa">
            <span className={styles.mapIcon}><MapPinned size={30} aria-hidden="true" /></span>
            <p>Visualización de Ruta</p>
            <span className={styles.mapNote}>Integración de Mapa Pendiente</span>
          </section>

          <section className={styles.actionsCard} aria-labelledby="actions-title">
            <h2 id="actions-title" className={styles.actionsTitle}>Acciones de Ruta</h2>
            <label className={styles.driverLabel} htmlFor="route-driver">Asignar Conductor</label>
            <select
              id="route-driver"
              className={styles.driverSelect}
              value={selectedDriver}
              onChange={(event) => setSelectedDriver(event.target.value)}
            >
              <option value="">Seleccionar conductor...</option>
              {drivers.map((driver) => (
                <option key={driver} value={driver}>{driver}</option>
              ))}
            </select>

            <button
              type="button"
              className={styles.confirmButton}
              disabled={!selectedDriver}
              onClick={() => onConfirmAssign(selectedDriver)}
            >
              Confirmar y Asignar
            </button>
            <button
              type="button"
              className={styles.draftButton}
              onClick={() => onSaveDraft(selectedDriver)}
            >
              Guardar Borrador
            </button>
          </section>
        </aside>
      </div>
    </div>
  )
}
