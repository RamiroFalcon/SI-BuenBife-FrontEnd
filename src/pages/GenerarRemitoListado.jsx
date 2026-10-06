import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, ChevronLeft, ChevronRight, FileCheck } from 'lucide-react'
import styles from './GenerarRemitoListado.module.css'

export default function GenerarRemitoListado() {
  const navigate = useNavigate()
  // Mock sales data
  const initialSales = [
    {
      id: '#VT-2023-0891',
      date: '15 Oct, 2023 09:30',
      client: 'Parrilla La Estancia',
      totalAmount: '$ 145.000,00',
    },
    {
      id: '#VT-2023-0892',
      date: '15 Oct, 2023 10:15',
      client: 'Restaurante El Ciervo',
      totalAmount: '$ 89.500,00',
    },
    {
      id: '#VT-2023-0895',
      date: '15 Oct, 2023 11:45',
      client: 'Hotel Boutique Alvear',
      totalAmount: '$ 320.000,00',
    },
    {
      id: '#VT-2023-0896',
      date: '15 Oct, 2023 12:10',
      client: 'Club Hípico Argentino',
      totalAmount: '$ 210.400,00',
    },
    {
      id: '#VT-2023-0898',
      date: '15 Oct, 2023 13:00',
      client: 'Parrilla Don Julio Bife',
      totalAmount: '$ 178.900,00',
    },
  ]

  // Pre-selected row 3 as requested in GUI02 specifications (#VT-2023-0895)
  const [selectedIds, setSelectedIds] = useState(['#VT-2023-0895'])

  // Toggle single item selection
  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  // Toggle select all items
  const handleToggleSelectAll = () => {
    if (selectedIds.length === initialSales.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(initialSales.map((s) => s.id))
    }
  }

  // Action: Generate selected packing slips (remitos)
  const handleGenerateRemitos = () => {
    if (selectedIds.length === 0) return

    const saleId = selectedIds[0].replace(/^#/, '')
    navigate(`/empleados/remitos/detalle/${encodeURIComponent(saleId)}`)
  }

  const isAllSelected = selectedIds.length === initialSales.length && initialSales.length > 0
  const isButtonEnabled = selectedIds.length > 0

  return (
    <div className={styles.container}>
      {/* Header and Top Action Row */}
      <div className={styles.headerRow}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Ventas Pendientes de Remito</h1>
          <p className={styles.subtitle}>
            Seleccione los pedidos para generar sus respectivos documentos de envío.
          </p>
        </div>

        {/* Action Button */}
        <button
          type="button"
          className={styles.actionButton}
          disabled={!isButtonEnabled}
          onClick={handleGenerateRemitos}
        >
          <FileCheck size={18} />
          <span>
            GENERAR REMITOS SELECCIONADOS
          </span>
        </button>
      </div>

      {/* Central Table Card */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHeadRow}>
                <th className={styles.checkboxCell}>
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleToggleSelectAll}
                    className={styles.checkboxInput}
                    title="Seleccionar todos los pedidos"
                    aria-label="Seleccionar todos los pedidos"
                  />
                </th>
                <th className={styles.tableHeadCell}>ID VENTA</th>
                <th className={styles.tableHeadCell}>FECHA</th>
                <th className={styles.tableHeadCell}>CLIENTE</th>
                <th className={styles.tableHeadCell}>MONTO TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {initialSales.map((sale) => {
                const isSelected = selectedIds.includes(sale.id)
                return (
                  <tr
                    key={sale.id}
                    className={`${styles.tableRow} ${isSelected ? styles.selected : ''}`}
                    onClick={() => navigate(`/empleados/remitos/detalle/${encodeURIComponent(sale.id.replace(/^#/, ''))}`)}
                  >
                    <td
                      className={styles.checkboxCell}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(sale.id)}
                        className={styles.checkboxInput}
                        aria-label={`Seleccionar pedido ${sale.id}`}
                      />
                    </td>
                    <td className={styles.tableCell}>
                      <span className={styles.saleId}>{sale.id}</span>
                    </td>
                    <td className={styles.tableCell}>
                      <span className={styles.dateText}>{sale.date}</span>
                    </td>
                    <td className={styles.tableCell}>
                      <span className={styles.clientText}>{sale.client}</span>
                    </td>
                    <td className={styles.tableCell}>
                      <span className={styles.amountText}>{sale.totalAmount}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className={styles.paginationRow}>
          <span className={styles.paginationInfo}>Mostrando 5 de 24 ventas</span>

          <div className={styles.paginationControls}>
            <button
              type="button"
              className={styles.pageButton}
              disabled
              title="Página anterior"
              aria-label="Página anterior"
            >
              <ChevronLeft size={16} />
            </button>
            <span className={styles.pageCurrent}>1</span>
            <button
              type="button"
              className={styles.pageButton}
              title="Página siguiente"
              aria-label="Página siguiente"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
