# Guion: proceso de venta desde el punto de vista del cliente — BuenBife

**Objetivo:** recorrer la compra online de punta a punta, como la vive un cliente, y mostrar en cada paso qué funcionalidad del sistema entra en juego.

**Personaje:** Laura, clienta de BuenBife, que quiere preparar un asado para el sábado y pedir todo a domicilio.

**Pedido que se arma en la demo:**

| Producto | Cantidad | Precio unitario | Subtotal |
|---|---|---|---|
| Ojo de Bife Angus | 2 kg | $ 13.900 | $ 27.800 |
| Asado de Tira Especial | 1 kg | $ 10.500 | $ 10.500 |
| Chorizo Puro Criollo (x4) | 2 packs | $ 6.200 | $ 12.400 |
| Gran Reserva Malbec 2021 | 1 botella | $ 14.200 | $ 14.200 |
| **Subtotal de productos** | | | **$ 64.900** |
| Costo de envío | | | $ 2.500 |
| **Total** | | | **$ 67.400** |

> Formato de cada escena: **🎙️ Narrador** (lo que se dice), **🧑 Laura** (lo que hace en pantalla) y **⚙️ Funcionalidad** (qué resuelve el sistema).

---

## Escena 1 — Llegada al sitio

**Pantalla:** Inicio (`/`)

🎙️ **Narrador:** "Laura entra a BuenBife desde su computadora. Lo primero que ve es la portada de la carnicería, con dos accesos bien diferenciados: uno para clientes y otro para el personal."

🧑 **Laura:** Lee la presentación *"Carnicería & Selección"* y hace clic en la tarjeta **Tienda Cliente** → *Ingresar*.

⚙️ **Funcionalidad:**
- Pantalla de inicio con acceso separado para **Tienda Cliente** y **Portal Empleados**.
- El logo de BuenBife en la barra superior lleva siempre de vuelta al inicio.

---

## Escena 2 — Explorar el catálogo

**Pantalla:** Tienda (`/tienda`)

🎙️ **Narrador:** "La tienda está organizada en tres columnas: a la izquierda los filtros, en el centro el catálogo y a la derecha el pedido en curso. Laura ya había dejado algunos cortes en el carrito en una visita anterior."

🧑 **Laura:** Recorre el catálogo. En cada tarjeta ve la foto, la categoría, la descripción del corte, el precio por kilo y el stock disponible. Nota que el panel **Tu Pedido** ya tiene 2 kg de Ojo de Bife y 1 kg de Asado de Tira.

⚙️ **Funcionalidad:**
- **Catálogo de productos** con imagen, categoría, descripción, precio y unidad de venta (kg, pack, botella).
- **Stock visible** por producto; cuando queda poco (8 unidades o menos) se resalta, y si se agota se muestra *"Agotado"*.
- **Carrito persistente** mientras navega por la tienda.

---

## Escena 3 — Filtrar por categoría

🎙️ **Narrador:** "Para acompañar el asado, Laura quiere chorizos. En lugar de recorrer todo, filtra por categoría."

🧑 **Laura:** En el panel **Filtros** elige **Achuras & Embutidos**. El catálogo se reduce y el pie del panel indica *"2 cortes disponibles"*. Ve las Mollejas con el stock resaltado (quedan pocas) y el Chorizo Puro Criollo.

🧑 **Laura:** En la tarjeta del Chorizo presiona **+** una vez.

⚙️ **Funcionalidad:**
- **Filtro por categoría:** Novillito & Ternera, Cortes de Cerdo, Pollo de Campo, Achuras & Embutidos y Vinos de Selección.
- **Contador de resultados** en el filtro.
- **Control de cantidad (+ / −)** directamente en la tarjeta del producto; el carrito lateral y el contador del ícono de la bolsa se actualizan al instante.

---

## Escena 4 — Buscar un producto

🎙️ **Narrador:** "Falta el vino. Laura sabe lo que quiere, así que usa el buscador."

🧑 **Laura:** Vuelve a **Todos los productos** y escribe *"malbec"* en el buscador de la barra superior. Aparece el **Gran Reserva Malbec 2021**; presiona **+**.

⚙️ **Funcionalidad:**
- **Búsqueda en tiempo real** por nombre, categoría o descripción del producto.
- La búsqueda se combina con el filtro de categoría activo.

---

## Escena 5 — Revisar el pedido

🎙️ **Narrador:** "Antes de pagar, Laura revisa lo que lleva."

🧑 **Laura:** Mira el panel **Tu Pedido**: ve cada producto con su cantidad, el subtotal por ítem y el precio unitario, el costo de envío y el **TOTAL HASTA EL MOMENTO**. Hace clic en **Ir a carrito**.

⚙️ **Funcionalidad:**
- **Resumen del pedido** siempre visible: cantidad de ítems, subtotal por producto, subtotal general, envío y total.
- **Edición del carrito** desde el resumen: sumar, restar o quitar un producto (ícono de papelera).
- **Validación de stock:** el botón **+** se deshabilita al llegar al stock disponible, así no se puede pedir más de lo que hay.
- El botón *Ir a carrito* solo se habilita si hay productos.

---

## Escena 6 — El carrito

**Pantalla:** Carrito (`/tienda/carrito`)

🎙️ **Narrador:** "Antes de cargar los datos de entrega, Laura ve su carrito completo en una pantalla propia, con todo el detalle en forma de tabla."

🧑 **Laura:** Recorre la tabla: para cada producto ve la **Descripción**, el **Tipo** (Novillito, Embutidos, Vinos), la **Cantidad** con su unidad (*kg*, *packs*, *botella*) y el **Precio** de esa fila.

🧑 **Laura:** Se da cuenta de que van a ser varios y sube el Chorizo a **2 packs** con el botón **+**. El total al pie pasa a *"Total hasta el momento: $ 64.900"*.

🧑 **Laura:** Para mostrar los filtros, elige **Vinos de Selección** en el panel izquierdo: la tabla muestra solo el Malbec, pero el total sigue siendo el del carrito completo. Vuelve a **Todos los productos** y presiona **Siguiente**.

⚙️ **Funcionalidad:**
- **Vista de carrito** en tabla: descripción, tipo, cantidad con unidad y precio por fila.
- **Edición de cantidades** (+ / −) y **quitar productos** (ícono de papelera), con el mismo tope por stock que en la tienda.
- **Filtro por categoría y buscador** dentro del carrito, útiles cuando el pedido es largo. Solo cambian las filas que se ven; el total siempre corresponde al carrito completo.
- **Total de productos** al pie. El envío todavía no se suma: se agrega en el checkout.
- Botón **Volver** a la tienda y botón **Siguiente**, que lleva a la carga del domicilio. *Siguiente* se desactiva si el carrito está vacío.

---

## Escena 7 — Checkout, paso 1: domicilio de entrega

**Pantalla:** Checkout (`/tienda/checkout`)

🎙️ **Narrador:** "El checkout se divide en tres pasos, indicados arriba: Domicilio, Fecha y Hora, y Método de Pago. El resumen del pedido sigue a la derecha durante todo el proceso."

🧑 **Laura:** En el resumen lateral ve que ahora se suma el envío de $ 2.500: el total a pagar es **$ 67.400**.

🧑 **Laura:** Presiona **Siguiente** sin completar nada a propósito. El sistema le marca en rojo *"Por favor ingrese el nombre de la calle"* e *"Ingrese la numeración"*. Completa Calle y Nro, deja Piso y Depto vacíos (son opcionales) y presiona **Siguiente**.

⚙️ **Funcionalidad:**
- **Indicador de pasos** (stepper) que muestra en qué etapa está y cuáles ya completó.
- **Carrito editable dentro del checkout**, con recálculo inmediato del total.
- **Costo de envío y total a pagar** visibles arriba del formulario.
- **Formulario de domicilio** con calle, número, opción *Bis*, piso y depto.
- **Validación de campos obligatorios** con mensajes claros junto a cada campo.
- Botón **Volver** para regresar al carrito sin perder el pedido.

---

## Escena 8 — Checkout, paso 2: fecha y franja horaria

🎙️ **Narrador:** "Laura quiere recibir todo el sábado, antes del mediodía."

🧑 **Laura:** En **Fecha de entrega** elige *Próximo Sábado (Especial Asado)* y en **Rango horario** elige *09:00 a 12:00 hs — Franja Mañana*. Presiona **Siguiente**.

⚙️ **Funcionalidad:**
- **Programación de la entrega:** hoy (prioritaria), mañana, en 48 hs o próximo sábado.
- **Franjas horarias:** mañana, mediodía, tarde y noche.
- Se puede volver al paso anterior sin perder lo cargado.

---

## Escena 9 — Checkout, paso 3: método de pago

🎙️ **Narrador:** "Último paso: cómo pagar."

🧑 **Laura:** Despliega las opciones y deja **Mercado Pago**. Lee el aviso: *"Serás redirigido a Mercado Pago para completar tu pago de forma segura."* Presiona **Ir a pago**; el botón cambia a *"Procesando..."*.

⚙️ **Funcionalidad:**
- **Medios de pago:** Mercado Pago (tarjetas, dinero en cuenta, cuotas), tarjeta de crédito/débito, transferencia bancaria o efectivo contra entrega.
- **Mensaje informativo** según el medio elegido.
- **Bloqueo de botones mientras se procesa** el pago, para evitar pedidos duplicados.
- Indicador de *Pago 100% seguro y encriptado*.

---

## Escena 10 — Confirmación del pedido

🎙️ **Narrador:** "El pedido queda registrado."

🧑 **Laura:** Ve la pantalla **¡Pedido Confirmado con Éxito!** con su número de orden (formato `BB-XXXXXX`), el domicilio de entrega y el medio de pago. El carrito quedó vacío. Presiona **Volver a la tienda**.

⚙️ **Funcionalidad:**
- **Número de orden único** para seguimiento.
- **Resumen de confirmación** con domicilio y medio de pago.
- **Vaciado automático del carrito** al confirmar.

---

## Escena 11 — Cierre

🎙️ **Narrador:** "En pocos minutos Laura eligió sus cortes, filtró, buscó, revisó su carrito y ajustó cantidades sin pasarse del stock, cargó su domicilio, programó la entrega para el sábado a la mañana y pagó. Del otro lado, ese pedido ya está disponible para que el equipo de BuenBife lo prepare, genere el remito y lo despache desde el Portal Empleados."

---

## Resumen de funcionalidades mostradas

| Etapa | Funcionalidades |
|---|---|
| Inicio | Acceso diferenciado cliente / empleados |
| Catálogo | Fichas de producto, precio por unidad, stock visible y alerta de stock bajo |
| Navegación | Filtro por categoría, búsqueda en tiempo real, contador de resultados |
| Resumen lateral | Sumar / restar / quitar, tope por stock, subtotal, envío y total en vivo |
| Carrito | Tabla con tipo, cantidad y unidad, edición de cantidades, filtro y búsqueda dentro del carrito, total de productos |
| Domicilio | Formulario con validación de obligatorios, campos opcionales y *Bis* |
| Entrega | Elección de fecha y franja horaria |
| Pago | Cuatro medios de pago, aviso según el medio, bloqueo durante el procesamiento |
| Confirmación | Número de orden, resumen y carrito vaciado |

---

## Notas para quien presenta

- El carrito arranca con **2 kg de Ojo de Bife y 1 kg de Asado de Tira** precargados; por eso el guion lo presenta como "una visita anterior".
- Los productos, el número de orden y el pago son **simulados** en esta versión del front-end: no hay redirección real a Mercado Pago ni se envía el correo de confirmación. Conviene presentarlo como el flujo previsto, no como integración funcionando.
- El nombre que aparece en la barra superior es *John Doe*; si se quiere evitar la confusión con "Laura", se puede cambiar el personaje o mencionarlo como usuario de prueba.
- Si se recarga la página durante la demo, el carrito vuelve al estado inicial.
- El total de la pantalla **Carrito** ($ 64.900) no incluye el envío, mientras que el panel *Tu Pedido* de la tienda y el checkout sí lo suman ($ 67.400). Conviene aclararlo en voz alta para que la diferencia no parezca un error.
