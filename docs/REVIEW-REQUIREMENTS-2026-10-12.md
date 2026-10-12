# Revisión independiente de requisitos · 12 de octubre de 2026

Revisor: agente `review_requirements`, independiente de la implementación. Se revisaron los ocho comentarios del usuario y la asignación de introducción + veinte enlaces YouTube.

**Veredicto: APROBADO.** No quedan bloqueos de requisitos o funcionamiento para publicar esta iteración, sujeto a la aprobación independiente de interfaz.

## Correspondencia con lo solicitado

| Solicitud | Resultado comprobado |
| --- | --- |
| Marca «Instructor Bíblico Pro» | Marca visible en acceso, navegación y pie; título y descripción del documento actualizados. No quedan textos «El Camino» en la interfaz. |
| Google como primera opción | Primer botón de acceso, con estilo principal: «Continuar con Google». Correo/contraseña queda después y siguen disponibles alta y recuperación. |
| Quitar welcome-banner | No existe ese bloque en el DOM de estudiantes. |
| Encabezado solo con buscador y Nuevo estudiante a la derecha | Barra `.students-toolbar` contiene el buscador y el botón; conserva un encabezado solo para lectores de pantalla. La búsqueda funciona desde esa barra. |
| Quitar guide-mini | No existe ese bloque en el DOM. |
| Seleccionar fecha muestra agenda del día por hora | Selección explícita, indicador accesible y lista limitada a la fecha local elegida, ordenada por hora. Se verificaron fechas vacías, cambio de mes y vuelta a Hoy. |
| «Por delante» → «Próximo estudio» | Encabezado exacto en la agenda diaria. |
| Enviar lección arriba del modal mediante Share del dispositivo | Los veinte modales incluyen el botón en su encabezado; invocan directamente `navigator.share` desde el clic, con la URL YouTube correspondiente. |
| Introducción y veinte URLs | Los 21 payloads coinciden exactamente con los IDs entregados por el usuario, sin parámetros de seguimiento. La introducción tiene control independiente en la biblioteca. |

## Pruebas ejecutadas

- `node scripts/test-app.mjs`: **15/15 comprobaciones aprobadas**, salida 0, con la nueva marca, acceso Google primero y agenda diaria. Regresión de CRUD, contacto, búsqueda/filtro, progreso completar/reabrir, contenido de las veinte lecciones, notas por alumno y tema, persistencia demo, borradores y errores de guardado.
- `node scripts/test-updates.mjs`: **12/12 comprobaciones aprobadas**, salida 0. Ambas suites usan Chromium real en 1440 × 1000 y zona `America/Argentina/Buenos_Aires`.
- Sintaxis de ambos scripts comprobada con `node --check`.
- `npm run build`: **aprobado**, salida 0, comprobado independientemente; TypeScript y Vite procesaron 1.600 módulos. Archivos finales `index-CbMcnJTw.js` (981,84 kB; 261,89 kB gzip) e `index-Sx1cBdBu.css` (58,76 kB; 11,74 kB gzip). Advertencia informativa de tamaño del paquete, sin error de compilación.
- No hubo errores JavaScript en las operaciones verificadas.

La suite nueva prueba la integración por la interfaz renderizada, sin importar archivos TypeScript del servidor. Puede ejecutarse contra Vite o contra el Hosting mediante `APP_BASE_URL`.

### Compartir

Se instrumentaron `navigator.share` y el portapapeles dentro del navegador de prueba. No se enviaron mensajes ni se abrió una conversación con otra persona.

- Los veinte botones superiores entregan título, texto y URL exacta de su lección. La introducción entrega su URL independiente.
- Éxito nativo: se invoca Web Share; no se copia al portapapeles.
- Cancelación `AbortError`: se respeta; no se copia ni aparece la alternativa manual.
- Rechazo de Web Share: se intenta el portapapeles y se informa que el enlace se copió.
- Navegador sin Web Share: copia la URL y muestra el resultado.
- Portapapeles bloqueado: ofrece URL seleccionable y enlace «Abrir video».
- Rechazo nativo más portapapeles bloqueado: también ofrece copia manual.
- Compartir desde la ficha de un estudiante excluye nombre y notas del payload y deja idéntico el contenido persistido de estudiantes, notas y progreso.

Estas pruebas verifican las llamadas y respuestas de la API y la interfaz. El menú del sistema operativo está representado por un stub controlado; no se afirma una selección real de destinatario en un teléfono.

### Agenda

Se usó un reloj de prueba en `2026-10-12T02:30:00Z`, equivalente al 11 de octubre a las 23:30 en Buenos Aires. La app selecciona el día 11, sin confundirlo con la fecha UTC del 12. Dos encuentros del mismo día aparecen a las 09:00 y 23:00, aunque los datos de entrada estén desordenados.

Se verificó seleccionar el 12, abrir al estudiante y regresar conservando esa fecha y sus encuentros; seleccionar el 13 sin estudios; cambiar a noviembre, abrir el día 1 y volver con Hoy al 11 de octubre. Las citas de otro día no aparecen en la lista seleccionada.

## Hallazgos y alcance

Se detectó durante la revisión el riesgo de que el calendario perdiera la fecha elegida al abrir una ficha, por tener estado local en un componente que se desmontaba. El agente de interfaz elevó ese estado a `App`; la prueba de ida y vuelta aprobó después de la corrección.

Los datos existentes y Firebase mantienen su esquema y rutas: no cambiaron `Student`, `useStudents`, integración Auth/Firestore ni las reglas. Los campos de video son metadatos estáticos de la guía, sin migración de estudiantes. Se conserva deliberadamente la clave local `el-camino-demo-v1` para mantener la demostración guardada.

El agente de contenido verificó los 21 metadatos mediante YouTube oEmbed. La hoja 9 conserva el enlace numérico solicitado aunque el título de YouTube repite el tema de la hoja 7; la observación está documentada en `docs/CONTENT-SOURCES.md`. No se alteró la asignación del usuario ni se afirmó haber revisado los videos completos.

La revisión de interfaz y accesibilidad debe aprobar separadamente antes del despliegue. Este informe no realiza un nuevo consentimiento OAuth ni una nueva auditoría de reglas: esos componentes no fueron modificados en esta iteración.

## Identificación de la versión funcional revisada

SHA-256:

- `src/App.tsx`: `29AB16D070343D57DEA8EE289C115758A890AF8FD95049ABA8D3CB5AB06B3324`
- `src/lib/shareLesson.ts`: `E74E43454DD080EDC48F8F5853A789C1B3D37EAA2FEBC08EE38BDB56FAB986F0`
- `src/data/guide.ts`: `CFBF1F5CC0BE8A9653B6631A5ABD493D7AF3758E075CCB79B330AF4F61AF52AB`
- `src/styles.css`: `683630348BD546CD101488B84985EB554E0662B563315D420B4830869D2FEF11`
