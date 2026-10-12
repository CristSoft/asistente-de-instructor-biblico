# Revisión independiente de interfaz — 12 de octubre de 2026

**Estado: APROBADO.** No quedan bloqueantes de interfaz en esta iteración.

Revisor: agente `review_interface`, independiente de implementación y revisión de requisitos. Se conservan los informes históricos del 9 de octubre.

## Alcance

Inspección renderizada real mediante Chromium/Playwright en `http://127.0.0.1:5173`: escritorio 1440 × 900, pantalla solicitada de 490 × 587 y móviles 390 × 844 y 360 × 800. Se usaron únicamente datos ficticios de demostración en contextos aislados. Se aplicaron los criterios de Calma UI y Calm Functional UI/UX.

## Criterios comprobados

- Marca «Instructor Bíblico Pro» en acceso, escritorio y pie; conserva icono, identidad ocre/dorado/blanco y lectura clara.
- «Continuar con Google» es la primera acción del acceso, antes del formulario de correo, con prioridad visual clara. El correo conserva acceso, registro y recuperación.
- Se eliminaron la tarjeta de bienvenida y el bloque lateral de promoción de guía.
- Encabezado de estudiantes con buscador y «Nuevo estudiante» a la derecha, en una única fila en los cuatro tamaños. Ambos controles miden 48 px de alto; en 490 px comparten y=150; en 360 px y=163,56. Se mantiene nombre de pantalla accesible para lectores de pantalla.
- Sin desbordamiento horizontal en acceso, estudiantes, agenda, biblioteca y diálogo de lección, incluidos enlace manual y pantalla de 360 px.
- Calendario: todos los días son botones con fecha completa accesible, cantidad de estudios, `aria-pressed` y fecha actual con `aria-current=date`. Selección visible por fondo/borde/peso; hoy también subrayado. Flechas del teclado mueven selección y foco, con contorno ocre de 3 px.
- Seleccionar día actualiza «Próximo estudio», fecha y estudios del día con su hora. Día vacío explica que no hay estudios y cómo continuar. Mes anterior/siguiente y «Hoy» funcionan.
- Navegación con flecha derecha desde el 31 de octubre pasa a noviembre, selecciona y enfoca el 1 de noviembre. Abrir la ficha del encuentro del 13 de octubre y volver conserva día y mes seleccionados.
- «Enviar lección» aparece arriba de la ventana, con acceso al video. Biblioteca ofrece introducción compartible y acceso al video. Se simuló ausencia de native share y fallo de permiso de portapapeles: aparece enlace de solo lectura, seleccionable y con etiqueta persistente para copiarlo manualmente; no se enviaron mensajes a personas.
- Cierre, compartir y enlace manual permanecen visibles al desplazar la lección hasta el final. En 490 × 587, el encabezado queda en y=15 y el cierre en y=30 después del scroll; la acción «Completar lección» sigue siendo alcanzable.
- Escape cierra la ventana y restaura foco a la lección de origen. La navegación de calendario y controles conserva foco visible.
- Regresión de notas: cancelar navegación con notas generales pendientes conserva el borrador; cancelar cierre de notas de lección conserva contenido; guardar notas de lección no sobrescribe el borrador de notas generales. Búsqueda sin coincidencias conserva estado vacío comprensible.

## Hallazgos corregidos y revalidados

1. El encabezado de la ventana salía de pantalla al desplazar. Se volvió sticky con superficie blanca. Revalidado en los cuatro tamaños, incluyendo fallback manual expandido.
2. Ingresar a demostración desde un acceso móvil desplazado conservaba scroll y ocultaba buscador. Se restablece scroll al entrar/cambiar pantalla o ficha, sin hacerlo al actualizar datos. Revalidado: buscador y alta visibles al ingresar en 490 × 587 y 360 px.
3. Se conservó el estado de calendario al consultar una ficha y volver. Revalidado con día 13 de octubre y salto de mes por teclado.

## Evidencia

Capturas finales en `.tools/screenshots/2026-10-12/`: `auth-360.png`, `students-1440.png`, `students-490.png`, `students-360.png`, `agenda-390.png`, `agenda-viewport-490.png`, `lesson-490.png`, `lesson-manual-490.png`, `lesson-scroll-490.png` y `library-390.png`. Los sufijos correspondientes a 1440, 490, 390 y 360 también están disponibles.

Las capturas de página completa muestran navegación fija en su posición del viewport; no representan un defecto de scroll. La revisión no certifica cumplimiento integral WCAG ni sustituye pruebas con lectores de pantalla. Los resultados de native share/cancelación y el mapeo completo de videos corresponden además a la revisión independiente de requisitos.

## Versión aprobada

SHA-256 App.tsx: 29AB16D070343D57DEA8EE289C115758A890AF8FD95049ABA8D3CB5AB06B3324
SHA-256 styles.css: 683630348BD546CD101488B84985EB554E0662B563315D420B4830869D2FEF11
SHA-256 shareLesson.ts: E74E43454DD080EDC48F8F5853A789C1B3D37EAA2FEBC08EE38BDB56FAB986F0

**Veredicto independiente: APROBADO.**
