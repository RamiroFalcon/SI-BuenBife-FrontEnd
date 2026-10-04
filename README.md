# 🥩 Proyecto BuenBife - Front-End

¡Bienvenidos al repositorio del Front-End del sistema de Carnicería BuenBife!

Este proyecto contiene la interfaz de usuario web de la aplicación, construida con React y Vite.

## 🛠️ Requisitos Previos

Antes de descargar el código, asegurate de tener instaladas las siguientes herramientas en tu computadora:

1. **Git:** Para el control de versiones.
2. **Node.js:** El entorno de ejecución. Recomendamos usar **`fnm`** (Fast Node Manager) para gestionar la versión y evitar conflictos.
3. **pnpm:** Es nuestro gestor de paquetes oficial para este proyecto.
   * *Si no lo tenés instalado, abrí tu terminal y ejecutá: `npm install -g pnpm`*
4. **Visual Studio Code (VSCode):** El editor de código recomendado.

---

## 🚀 Pasos para levantar el proyecto localmente

Seguí estos comandos en tu terminal para tener el proyecto corriendo en tu máquina:

### 1. Clonar el repositorio
```bash
git clone https://github.com/RamiroFalcon/SI-BuenBife-FrontEnd.git
```

### 2. Ingresar a la carpeta
```bash
cd SI-BuenBife-FrontEnd
```

### 3. Instalar las dependencias
Para descargar todos los paquetes necesarios, ejecutá **estrictamente** este comando (NO uses `npm install` ni `yarn`):
```bash
pnpm install
```

### 4. Iniciar el servidor de desarrollo
Levantá el entorno local con:
```bash
pnpm run dev
```
Hacé `Ctrl + Clic` sobre el enlace que devuelve la consola (generalmente `http://localhost:5173`) para abrir la aplicación en tu navegador.

---

## 📁 Estructura de Carpetas

Todo nuestro código de trabajo vive dentro de la carpeta `src/`. Para mantener el orden, dividimos los archivos de la siguiente manera:

* **`/assets`**: Aquí guardamos todos los recursos estáticos como imágenes, íconos o fuentes.
* **`/components`**: Contiene los bloques de construcción visuales y reutilizables de React (ej. botones, tarjetas de productos, barras de navegación).
* **`/pages`**: Aquí armamos las pantallas completas (ej. el Home, el Catálogo, el Carrito). Cada página suele ser un ensamblaje de varios componentes.
* **`/styles`**: Archivos de estilos globales y variables de diseño (colores, tipografías).
* **`/services`**: En esta carpeta irán las funciones que se encargan de hacer las peticiones (fetch/axios) a nuestra API del Back-End.
* **`/hooks`**: Espacio reservado para los custom hooks de React, en caso de que necesitemos extraer lógica compleja de los componentes.

---

## 🤝 Flujo de Trabajo Colaborativo

1. **Nunca trabajes directamente sobre la rama `main`.**
2. Antes de empezar una nueva pantalla o funcionalidad, creá una rama nueva: 
   `git checkout -b nombre-de-tu-rama`
3. Hacé tus commits y subí tu rama para que el equipo pueda revisar el código antes de integrarlo.