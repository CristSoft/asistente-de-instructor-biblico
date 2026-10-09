# Revisión independiente de interfaz y accesibilidad

Estado: **APROBADO**. No quedan incidencias bloqueantes de interfaz en los flujos revisados.

Revisor: agente review_interface, separado de implementación y de revisión de requisitos.
Fecha: 9 de octubre de 2026.
Referencia: `docs/ACCEPTANCE.md`, skills Calma UI y Calm Functional UI/UX.

## Alcance y evidencia

Inspección real de la aplicación Vite en Chromium mediante Playwright, en 1440 × 900, 390 × 900 y 360 × 900. Se revisaron acceso, lista de estudiantes, ficha, agenda, biblioteca, ventana de lección y formulario. Datos ficticios del modo demostración en contextos aislados, sin escribir datos reales.

Capturas en `.tools/screenshots/`: `students-1440.png`, `students-390.png`, `auth-360.png`, `detail-390.png`, `lesson-360.png`, `form-390.png`, `agenda-390.png`, `library-390.png`, `empty-390.png`, `long-name-360.png`. Las capturas de página completa incluyen navegación fija en su posición del viewport; eso no indica un defecto de scroll.

## Hallazgos y correcciones comprobadas

- Estética ocre, dorado y blanco coherente; superficies tranquilas, jerarquía clara y acción principal identificable. Icono propio de libro con luz e ilustración de libro con brote profesional y pertinente.
- Se pidió aumentar tipografía y controles móviles. Versión revisada: nombres de tarjetas 20 px, temas 16 px, lectura/respuestas 16 px, campos 16 px y botones principales de 48 px en móvil. Metadatos secundarios conservan menor jerarquía.
- Se detectó contraste insuficiente en metadatos, pendientes y otras etiquetas. Se oscurecieron mediante tokens compartidos, manteniendo pendientes atenuados por superficie/peso y texto explícito «Pendiente».
- Se detectó ancho de acceso de 430 px en viewport de 360 px. Corregido con columna `minmax(0,1fr)` y límites de ancho del formulario. Revalidación: document.scrollWidth coincide con 360, 390 y 768 px.
- El resto de pantallas y diálogos no presentó desbordamiento horizontal en 1440, 390 ni 360 px. Nombre largo con espacios probado en ficha móvil sin desbordamiento.
- Se solicitó corrección del contraste del foco. Outline final ocre de 3 px con separación visible.

## Pruebas de interacción

- Diálogo de lección: foco inicial dentro del diálogo; Shift+Tab lleva a la última acción; Tab vuelve al cierre; Escape cierra y devuelve foco a la fila de lección, en los tres tamaños.
- Formularios con etiquetas persistentes, correo/contraseña semánticos y nombre requerido. Acciones de cierre con nombre accesible.
- Formulario modificado + Escape: aparece confirmación; cancelar conserva formulario y contenido.
- Notas generales modificadas + navegación: aparece confirmación; cancelar conserva borrador.
- Notas de lección modificadas + cerrar: aparece confirmación; cancelar conserva contenido.
- Guardar notas de una lección conserva el borrador de notas generales de la ficha.
- Eliminación presenta confirmación y explica pérdida de encuentros/progreso/notas; conservar mantiene la ficha.
- Búsqueda sin coincidencias muestra estado vacío comprensible con indicación de cambiar nombre/filtro.
- Agenda ofrece encuentros identificados en lista y acceso a ficha; en móvil el calendario conserva horas y la lista presenta nombres/direcciones.
- Biblioteca y lección mantienen enlaces de fuente y explicación editorial; respuestas orientativas se despliegan y pendientes se identifican sin depender solo del color.

## Límites

Esta revisión comprueba interfaz y accesibilidad de los flujos descritos; la revisión de requisitos cubre Firebase, reglas, persistencia y autenticación real. No sustituye una auditoría completa con lectores de pantalla ni certifica conformidad integral WCAG.

## Revalidación final aprobada

Tras las correcciones, se repitieron las siete pantallas en 1440, 390 y 360 px: todos los anchos de documento coinciden con el viewport, los diálogos permanecen dentro de pantalla y el trap/restauración de foco y la confirmación de formulario modificado volvieron a pasar. Capturas finales regeneradas; para lectura sin reducción de página completa: `students-viewport-390.png`, `lesson-viewport-390.png`, `focus-390.png`.

El contraste computado final de texto operativo en acceso/listado/ficha/lección no presenta incidencias por debajo de 4.5:1 en los elementos muestreados. Los únicos elementos residuales señalados por el muestreo son las iniciales decorativas en avatares, redundantes con el nombre completo adyacente. Los índices de siguiente lección/preguntas y la acción de eliminación fueron oscurecidos y revalidados. Foco real con teclado verificado: «El estudio», `:focus-visible=true`, contorno ocre sólido de 3 px y separación de 4 px.

Versión revisada (SHA-256):

- `src/App.tsx`: `AC25DAF32789B603ECDCDD12F797CD84584AB33B25D87A8EED8C9A83E1CCDD3B`
- `src/styles.css`: `F86FC01C350BA70BCE9995159AFC79B5319BA1D6107C1945F16A60BEED3F172C`

**Veredicto independiente: APROBADO para los criterios de interfaz de `docs/ACCEPTANCE.md`.**
