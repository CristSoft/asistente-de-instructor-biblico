# Firebase de El Camino

## Proyecto conectado

- Cuenta administrativa confirmada: `adventistasjosecpazsur@gmail.com`.
- Proyecto y sitio Hosting: `instructor-biblico-pro`.
- Aplicación web: `1:142637325069:web:6eec51048722a65193ee44`.
- Firestore: base `(default)`, modo Native, región multirregión `nam5`.
- Authentication: correo/contraseña y Google habilitados; correos de Firebase en español.
- Dominios autorizados: `localhost`, `instructor-biblico-pro.firebaseapp.com`, `instructor-biblico-pro.web.app`.
- URL del sitio: https://instructor-biblico-pro.web.app

Se reutilizó este proyecto porque estaba vacío (sin aplicaciones web, releases Hosting ni colecciones de Firestore) y su nombre corresponde al producto. No se modificaron otros proyectos.

## Configuración local

Copiar `.env.example` a `.env.local` y completar la configuración pública de la aplicación web desde Firebase Console → Configuración del proyecto. La configuración real del entorno de trabajo está en `.env.local`, ignorado por Git. Nunca guardar claves de cuentas de servicio, credenciales administrativas ni tokens en variables `VITE_*`.

```sh
npm install
npm run dev
npm run build
```

Vite incorpora estas variables al compilar: es necesario volver a compilar cuando cambian. Los campos web de Firebase no son secretos; la protección de los registros depende de Authentication y de `firestore.rules`.

## Datos y aislamiento

Cada instructor tiene sus registros en `users/{uid}/students/{studentId}`. El documento contiene datos de contacto, próxima reunión, notas generales, lecciones completadas y notas por lección. Las reglas exigen que `request.auth.uid` corresponda al propietario de la ruta. Otros instructores y visitantes anónimos no pueden leer, listar, crear, modificar ni eliminar registros ajenos.

Las reglas validan campos admitidos, tipos, longitudes, guía, estados y progreso 1–20 sin duplicados. Las notas por lección aceptan únicamente claves `1` a `20` y hasta 10.000 caracteres por nota. La fecha de creación es inmutable. Todas las demás rutas se deniegan por defecto.

La demostración se guarda únicamente en `localStorage`; no escribe en la cuenta del instructor ni en Firestore. Los datos sincronizados de la cuenta requieren conexión para guardar y eliminar.

## Pruebas de seguridad

Con Java 21 o superior y Firebase CLI instalados:

```sh
firebase emulators:exec --only firestore --project demo-el-camino "node scripts/test-firestore-rules.mjs"
```

Las pruebas utilizan exclusivamente el proyecto emulado `demo-el-camino`. Verifican CRUD propio, aislamiento entre instructores, acceso anónimo denegado, listado, validación de notas y progreso, campos no autorizados y rutas cerradas.

Validación ejecutada el 9 de octubre de 2026: **26/26 comprobaciones aprobadas**, salida 0, Firestore Emulator 1.20.4 y Java 23. Los mensajes `PERMISSION_DENIED` durante la prueba son las denegaciones esperadas de los casos negativos.

Authentication también se comprobó contra el proyecto real: **6/6 comprobaciones aprobadas** para registro por correo y contraseña, actualización de nombre, cierre de sesión, nuevo ingreso conservando identidad y nombre, eliminación de la cuenta temporal y rechazo del ingreso posterior a eliminarla. La cuenta de prueba se eliminó al finalizar; no se enviaron correos. La configuración de Google está habilitada; esta prueba automatizada no simula el consentimiento interactivo de una cuenta Google.

En este equipo Windows, Java del PATH apunta a una versión antigua. Para ejecutar las pruebas:

```powershell
$env:JAVA_HOME = 'C:\Program Files\Java\jdk-23'
$env:PATH = "$env:JAVA_HOME\bin;$env:PATH"
firebase emulators:exec --only firestore --project demo-el-camino --account adventistasjosecpazsur@gmail.com "node scripts/test-firestore-rules.mjs"
```

Si Node no reconoce el certificado raíz de la red, configurar `NODE_EXTRA_CA_CERTS` con el certificado público confiable de la organización o del sistema. En esta sesión se usa `.tools/windows-trusted-roots.pem` (ignorado por Git). No deshabilitar la verificación TLS.

## Despliegue

El primer despliegue está condicionado a dos aprobaciones independientes: revisión de requisitos y revisión de interfaz. No desplegar reglas ni Hosting antes de ambas aprobaciones.

Tras obtenerlas:

```sh
npm run build
firebase deploy --only firestore:rules,firestore:indexes,hosting --project instructor-biblico-pro --account adventistasjosecpazsur@gmail.com --non-interactive
```

El comando usa explícitamente proyecto y cuenta; no cambia la cuenta global del CLI. Hosting sirve `dist`, reescribe navegación a `index.html`, agrega cabeceras básicas y mantiene los archivos compilados con nombre hash en caché. Verificar después la URL pública, acceso con una cuenta y persistencia de los cambios tras recargar.
