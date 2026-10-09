# Criterios de aceptación

La publicación requiere dos revisiones independientes aprobadas sobre la versión que se publica: requisitos y funcionamiento; interfaz y accesibilidad.

## Requisitos y funcionamiento

- [x] Autenticación real con Google y correo/contraseña; alta, ingreso, recuperación y cierre de sesión.
- [x] Registro, edición, consulta y eliminación confirmada de estudiantes.
- [x] Agenda con fecha/hora del próximo encuentro y acceso a la ficha.
- [x] Búsqueda y filtros con estados vacíos comprensibles.
- [x] Hoja actual y progreso individual de la guía.
- [x] Las 20 lecciones de la edición seleccionada, fuentes y criterio editorial identificados.
- [x] Ventana flotante con preguntas, referencias, respuestas, puntos clave y preguntas frecuentes.
- [x] Notas generales y por lección que se guardan independientemente por estudiante.
- [x] Completar/reabrir lecciones modifica el progreso correctamente.
- [x] Demostración identificada y separada de los datos reales.
- [x] Firestore restringe cada colección a su instructor y deniega acceso anónimo y cruzado.
- [x] Manejo de carga, fallo de conexión y errores de guardado sin éxito ficticio.
- [x] Compilación de producción satisfactoria.

## Interfaz

- [x] Paleta ocre/dorado/blanco, jerarquía clara, estilo Calma UI.
- [x] Icono e ilustraciones propios, profesionales y coherentes.
- [x] Inspección real renderizada en escritorio y móvil.
- [x] Sin desbordamiento horizontal ni controles críticos fuera de pantalla.
- [x] Foco visible, etiquetas de campos y uso por teclado.
- [x] Diálogos con foco inicial, cierre accesible y restauración de foco.
- [x] Pendientes visualmente atenuados, legibles e identificables sin depender solo del color.
- [x] Confirmación de eliminación y prevención de pérdida accidental de notas.

Los resultados, incidencias y correcciones deben registrarse en los informes de revisión. Este documento es la lista de criterios, no una afirmación de que las pruebas ya se realizaron.


Aprobaciones independientes registradas en REVIEW-REQUIREMENTS.md y REVIEW-INTERFACE.md. Google quedó configurado y su flujo conectado al SDK; el consentimiento interactivo del proveedor y la entrega de correos de recuperación tienen los límites de validación explicados en los informes.
