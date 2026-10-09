# El Camino · Asistente bíblico

Una agenda de acompañamiento para instructores bíblicos adventistas. Construida con React, TypeScript y Firebase, con una interfaz calma en ocre, dorado y blanco.

## Funciones

- Registro de estudiantes, datos de contacto y próximos encuentros.
- Seguimiento individual de las 20 lecciones de **La fe de Jesús**.
- Notas generales y notas independientes para cada tema de cada estudiante.
- Preguntas de apoyo, referencias bíblicas, respuestas orientativas, puntos clave y preguntas frecuentes.
- Biblioteca de estudios y agenda de encuentros.
- Cuentas con Firebase Authentication y datos privados por instructor en Cloud Firestore.
- Demostración explícita con personas ficticias; sus cambios permanecen solo en este navegador y no se mezclan con cuentas reales.

## Desarrollo

Requisitos: Node.js 22 o superior y npm.

```sh
npm ci
cp .env.example .env.local
# Completar los valores VITE_FIREBASE_* de la aplicación web Firebase.
npm run dev
```

```sh
npm run build
npm run preview
```

Con el servidor de desarrollo en marcha, `npm run test:ui` verifica los flujos principales en Chromium. El script acepta `APP_BASE_URL` para probar el sitio publicado y `PLAYWRIGHT_CHROMIUM_PATH` para indicar otro ejecutable. Las pruebas de reglas se ejecutan con `npm run test:rules` y requieren Firebase CLI y Java 21 o superior. Los resultados de las revisiones independientes están en [requisitos](docs/REVIEW-REQUIREMENTS.md) e [interfaz](docs/REVIEW-INTERFACE.md).

DM Sans y Lora se sirven desde la aplicación; sus licencias se incluyen en `public/licenses`.

La configuración web Firebase identifica el proyecto y no es una credencial administrativa. La autorización depende de Authentication y de las reglas de Firestore. No incorporar claves de cuentas de servicio, tokens de CLI ni archivos privados al repositorio.

## Datos y privacidad

Los estudiantes se guardan en `users/{uid}/students/{studentId}`. Solo el usuario autenticado propietario puede acceder a su colección. Las notas de cada tema están en `lessonNotes`, indexadas por el número de lección. Las citas usan fecha y hora local del instructor. El modo demostración usa exclusivamente `localStorage` con la clave `el-camino-demo-v1`.

La aplicación no habilita caché persistente de Firestore en el dispositivo. Para guardar datos reales se necesita conexión. Al cerrar sesión se retiran los estudiantes de la interfaz. Evitar incluir en notas información personal que no sea necesaria para el acompañamiento.

## Material de estudio

La edición inicial contiene 20 temas siguiendo la guía **La fe de Jesús**. Las preguntas y explicaciones de apoyo son una elaboración editorial propia y se distinguen del material oficial; cada lección enlaza a su fuente. Las explicaciones se ofrecen desde la perspectiva adventista. Ver [fuentes y criterio editorial](docs/CONTENT-SOURCES.md).

El nombre, símbolo e ilustraciones de El Camino son propios de esta aplicación y no representan una publicación oficial de la Iglesia Adventista del Séptimo Día.

## Firebase y publicación

Ver [configuración de Firebase](docs/FIREBASE.md). El proyecto debe tener habilitados Cloud Firestore, Authentication (correo/contraseña y Google) y Hosting. Antes de desplegar se requiere una compilación satisfactoria y la aprobación de las revisiones de requisitos e interfaz documentadas en `docs/`.

```sh
firebase deploy --only firestore:rules,firestore:indexes,hosting --account CUENTA_CONFIRMADA --project ID_DEL_PROYECTO
```

Nunca ejecutar el comando de ejemplo sin reemplazar ambos identificadores por los valores confirmados del proyecto.
