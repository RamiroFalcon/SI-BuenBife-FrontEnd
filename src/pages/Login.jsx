import { useState } from 'react'
import styles from './Login.module.css'

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!credentials.username.trim() || !credentials.password) {
      setError('Por favor complete todos los campos.')
      return
    }

    try {
      setIsLoading(true)
      // TODO: Conectar con el servicio de autenticación correspondiente en /services
      console.log('Iniciando sesión con:', credentials)
    } catch (err) {
      setError('Error al autenticar las credenciales.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className={styles.loginTitle}>Iniciar Sesión</h2>
        <p className={styles.loginSubtitle}>Sistema de Control de Acceso</p>

        {error && <div className={styles.loginError}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="username" className={styles.formLabel}>
              Usuario o Correo Electrónico
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Ingrese su usuario o correo"
              autoComplete="username"
              className={styles.formInput}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Ingrese su contraseña"
              autoComplete="current-password"
              className={styles.formInput}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.loginButton}
            disabled={isLoading}
          >
            {isLoading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  )
}
