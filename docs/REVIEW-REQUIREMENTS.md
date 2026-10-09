# Revisión independiente de requisitos y funcionamiento

Fecha: 9 de octubre de 2026. Revisor: agente `review_requirements`, distinto de los agentes de implementación y de revisión visual.

**Veredicto: APROBADO.** No se encontraron bloqueos pendientes de requisitos o funcionamiento para el primer despliegue. Sigue siendo necesaria la aprobación independiente de interfaz antes de publicar.

## Evidencia ejecutada

- Lectura independiente de `docs/ACCEPTANCE.md`, `README.md`, `docs/CONTENT-SOURCES.md`, `docs/FIREBASE.md`, `src/App.tsx`, tipos, guía, integración Firebase, hook de estudiantes, reglas y pruebas de seguridad.
- Chromium real, escritorio 1440 × 1000, zona `America/Argentina/Buenos_Aires`, aplicación Vite en `http://127.0.0.1:5173`.
- `node scripts/test-app.mjs`: **15 comprobaciones funcionales aprobadas**, salida 0. Reejecutadas sobre la versión final con fuentes locales. Contexto del navegador nuevo; pruebas sobre estudiantes ficticios, sin mezclar cuentas ni datos reales.
- `npm run build`: TypeScript y Vite completados, salida 0; 1.599 módulos procesados, fuentes incluidas localmente y archivos de producción generados. Advertencia informativa de tamaño del paquete JavaScript (977,75 kB; 260,57 kB gzip), sin error de compilación.
- Seguridad: el agente `firebase_setup` informó **26/26 comprobaciones aprobadas** con Firestore Emulator v1.20.4 y Java 23, proyecto exclusivamente emulado `demo-el-camino`, y repitió las 26 satisfactoriamente después de fijar `@grpc/grpc-js` en 1.13.6. Se inspeccionaron independientemente las reglas y las 26 aserciones del script.
- Authentication real: `firebase_setup` ejecutó **6/6 comprobaciones aprobadas**, salida 0, mediante SDK en `instructor-biblico-pro`: alta efímera, perfil, cierre de sesión, nuevo ingreso con mismo UID y nombre, eliminación y rechazo posterior de acceso. La cuenta de prueba se eliminó; no se enviaron correos.

## Requisitos comprobados

| Requisito | Evidencia |
| --- | --- |
| Acceso y cuentas | Formularios de alta, ingreso y recuperación; botón Google habilitado con configuración real. Integración directa con Firebase Auth SDK, 6/6 pruebas reales del ciclo de cuenta; email/contraseña y Google habilitados mediante API administrativa. Recuperación revisada por código y formulario, sin enviar correos de prueba. |
| Estudiantes | Alta, lectura de contacto y ficha, edición de nombre, eliminación cancelada y luego confirmada, regreso al listado correcto. |
| Agenda | Encuentro futuro con fecha y hora local; aparece en agenda y abre la ficha correspondiente. |
| Búsqueda y filtros | Coincidencia por nombre; resultado inexistente y filtro sin estudiantes muestran estado vacío comprensible. |
| Hoja y progreso | Veinte filas individuales, próxima lección identificada; completar y reabrir cambia de 0/20 a 1/20 y de nuevo a 0/20. |
| Contenido | Inspección renderizada de las veinte lecciones: 80 preguntas con referencias y respuestas desplegables, 60 puntos clave, 40 FAQ; cada lección enlaza su PDF numerado. |
| Guía y fuentes | La edición DSA 2020 y su adaptación editorial están identificadas; la biblioteca informa que son apuntes de apoyo y enlaza el catálogo original. |
| Notas | Nota general y dos notas de lecciones distintas permanecen separadas. Otro alumno no recibe las notas del primero. |
| Persistencia demo | Recarga y nueva entrada en demo conservan alumno y notas. Demo claramente identificada como almacenamiento local. |
| Prevención de pérdida | Cancelar navegación, cancelar edición y cerrar lección con borradores permiten conservarlos. Editar estudiante recibe el borrador general actual. |
| Fallos de guardado | Simulación real de error de `localStorage.setItem`: el formulario conserva valores y muestra error; no cierra ni informa guardado exitoso. |
| Aislamiento real | Rutas `users/{uid}/students/{id}`, comprobación `request.auth.uid == uid`, denegación por defecto, validaciones de campos y notas. Hook retira datos al cambiar propietario o cerrar sesión. |
| Carga y conexión | Estados de carga y errores de suscripción; escrituras reales esperan `setDoc`/`deleteDoc`; modo sin conexión rechaza guardado y eliminación antes de enviarlos. |
| Ejecución | Ningún error JavaScript durante las quince comprobaciones. Salir de demo retira sus registros de la interfaz. |

## Hallazgos resueltos

La revisión detectó ausencia de protección de borradores en el formulario de estudiante y riesgo de sobrescribir notas generales al actualizar una ficha. El agente de interfaz agregó confirmación para cerrar/cancelar el formulario, preservación del borrador general e inclusión de ese borrador al editar. Las regresiones de navegador posteriores aprobaron.

La carga inicial dependía de fuentes de Google; ciertas navegaciones esperando `DOMContentLoaded` quedaban pendientes aunque React podía renderizar. El agente principal sustituyó esa dependencia por fuentes locales incluidas en la compilación. La suite final volvió a aprobar las quince comprobaciones. Espera la respuesta del documento y después los controles reales, sin usar `networkidle` para una aplicación con conexiones Firestore.

## Alcance y cierre

El ciclo real de correo/contraseña, las reglas emuladas, la compilación y las operaciones de la interfaz aprobaron antes del despliegue. El consentimiento Google con una cuenta humana y la recepción de un correo de recuperación no se automatizaron; se verificaron proveedor, dominios y conexión correcta de sus controles al SDK. Esto no se presenta como una prueba de consentimiento OAuth completo.

El script `scripts/test-production.mjs` fue inspeccionado: está limitado al proyecto confirmado, utiliza cuentas efímeras y comprueba persistencia y acceso real denegado a terceros. Se ejecutará después del despliegue autorizado, porque antes las reglas aún no están publicadas. Ese smoke comprueba la infraestructura publicada y no sustituye el presente gate.

Identificación de la versión revisada (SHA-256):

- `src/App.tsx`: `AC25DAF32789B603ECDCDD12F797CD84584AB33B25D87A8EED8C9A83E1CCDD3B`
- `src/lib/useStudents.ts`: `E2C77872D9E1C13723137A0598D7B97658438E4041797B3C62133B74F50972B9`
- `src/data/guide.ts`: `6147378C8A316767B09CB1050DCD70E5E665F64B52DEFD123870AF5D5F73BF36`
- `firestore.rules`: `4DDB7095E7D671582BB19D9EF07278F8A4EE0A5568AEA5398A490B80FF20F95B`
- `package-lock.json`: `53144C2D6BAE0397D987C5DD7F5F50D9EA2BF892AD3E29EEE594B00BE6F7921C`

La autorización de despliegue requiere además el informe visual independiente aprobado. Este informe no constituye una revisión pastoral completa de las explicaciones doctrinales.
