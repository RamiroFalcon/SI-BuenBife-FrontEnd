# 🏗️ Arquitectura y Stack Tecnológico - BuenBife

Este documento detalla la arquitectura de software y las herramientas tecnológicas seleccionadas para el desarrollo del sistema integral de la Carnicería BuenBife, conforme a lo establecido en el Documento de Arquitectura de Software (DAS).

## 🌟 Visión General

El sistema BuenBife utiliza una arquitectura cliente-servidor basada en web, separando claramente la capa de presentación (Front-End) de la lógica de negocio y persistencia de datos (Back-End y Base de Datos). Esta separación permite un desarrollo más ágil, escalable y mantenible.

## 💻 Capa de Presentación (Front-End)

La interfaz de usuario está diseñada para ser rápida, reactiva y consumida tanto por clientes como por empleados (portal de gestión y mostrador).

* **Librería Principal:** **React** (con JSX). Elegido por su eficiencia en la actualización del DOM virtual y su ecosistema basado en componentes.

* **Herramienta de Construcción (Bundler):** **Vite**. Proporciona un servidor de desarrollo extremadamente rápido y un empaquetado optimizado para producción.

* **Lenguajes Base:** **JavaScript, HTML5 y CSS3**.

* **Gestor de Paquetes:** **pnpm**. Seleccionado por su eficiencia en el manejo de espacio en disco y velocidad en comparación con npm o yarn.

* **Gestor de Entorno:** **fnm** (Fast Node Manager). Utilizado para estandarizar la versión de Node.js en todo el equipo de desarrollo.

## ⚙️ Capa de Lógica de Negocio (Back-End)

La API que provee los datos y procesa las reglas de negocio opera de manera asíncrona para garantizar tiempos de respuesta óptimos (menores a 2 segundos).

* **Entorno de Ejecución:** **Node.js**.

* **Framework Web:** **Express**. Permite la creación de una API RESTful ligera y robusta.

* **Seguridad y Autenticación:** **JWT (JSON Web Tokens)**. Utilizado para el control de sesiones seguras y validación de roles (clientes, cajeros, administradores), protegiendo rutas y endpoints sensibles.

## 🗄️ Capa de Persistencia (Base de Datos)

El almacenamiento de la información crítica (inventario, lotes, ventas, usuarios) debe garantizar integridad relacional y transaccional.

* **Motor de Base de Datos:** **MySQL**.

* **Gestor de Base de Datos:** **MySQL Workbench 8.0**. Herramienta principal para la administración, diseño del Modelo de Datos Físico (MDF) y ejecución de consultas.

## 🛠️ Herramientas de Desarrollo y Colaboración

* **IDE Recomendado:** **Visual Studio Code (VSCode)**.

* **Control de Versiones:** **Git** (con alojamiento en plataformas como GitHub/GitLab).

*Documento generado a partir del Documento de Arquitectura de Software (DAS) v1.00.*