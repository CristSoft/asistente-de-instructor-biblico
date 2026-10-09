# Despliegue verificado

Publicado el **9 de octubre de 2026 a las 09:16:55 (America/Buenos_Aires)**.

- Sitio: https://instructor-biblico-pro.web.app
- Proyecto Firebase y Hosting: `instructor-biblico-pro`.
- Cuenta administrativa: `adventistasjosecpazsur@gmail.com`.
- Código publicado: commit `7b34fd8`, previamente enviado a `origin/main`.
- Release: `sites/instructor-biblico-pro/releases/1791548215242000`.
- Versión Hosting: `sites/instructor-biblico-pro/versions/5cb52b302a824d57`.

## Aprobaciones previas

Se leyeron y confirmaron los dos informes independientes antes de desplegar:

- `docs/REVIEW-REQUIREMENTS.md`: **APROBADO**.
- `docs/REVIEW-INTERFACE.md`: **APROBADO**.

Los hashes SHA-256 de `src/App.tsx`, `src/styles.css`, `src/lib/useStudents.ts`, `src/data/guide.ts`, `firestore.rules` y `package-lock.json` coincidían con los informes. El árbol Git estaba limpio. La compilación final contenía la corrección de contraste `#70511f` y las fuentes locales.

## Ejecución

```sh
firebase deploy --only firestore:rules,firestore:indexes,hosting --project instructor-biblico-pro --account adventistasjosecpazsur@gmail.com --non-interactive
```

**Salida 0.** Firebase compiló y publicó las reglas, desplegó los índices y publicó los diez archivos de `dist`. La verificación TLS permaneció habilitada; este equipo usó `NODE_EXTRA_CA_CERTS` con las raíces públicas confiables de Windows.

## Comprobaciones posteriores

`node scripts/test-production.mjs`: **salida 0**, seis comprobaciones aprobadas contra los servicios reales:

1. Registro de dos cuentas efímeras por correo y contraseña.
2. Guardado y lectura de estudiante, progreso y notas generales y por lección.
3. Lectura denegada a otro instructor.
4. Escritura denegada a otro instructor.
5. Lectura denegada a un visitante anónimo.
6. Eliminación del registro temporal.

La limpieza final eliminó ambas cuentas de Authentication. La consulta administrativa posterior no encontró colecciones en la base. No se enviaron correos de verificación ni recuperación.

Se verificó respuesta HTTPS 200 y coincidencia exacta SHA-256 entre el sitio publicado y `dist` para `index.html`, icono, JavaScript, CSS y las tres fuentes locales. La ruta `/estudiantes` respondió correctamente mediante la reescritura de la aplicación. La comprobación final de Hosting terminó con **salida 0**.

El agente principal ejecutó además `APP_BASE_URL=https://instructor-biblico-pro.web.app node scripts/test-app.mjs` sobre el Hosting publicado: **15/15 comprobaciones funcionales aprobadas**, salida 0, en Chromium real y sin errores JavaScript. Estas pruebas de interfaz utilizaron el modo demostración; las comprobaciones anteriores verificaron por separado la persistencia y el aislamiento reales de Firebase.

La configuración de Google está habilitada y sus dominios autorizados fueron verificados. El consentimiento interactivo de Google y la recepción de correo de recuperación no fueron automatizados, como consta en los informes de revisión.
