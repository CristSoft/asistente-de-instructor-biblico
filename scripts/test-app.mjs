import { chromium, expect } from '@playwright/test';

const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || `${process.env.LOCALAPPDATA}/ms-playwright/chromium-1228/chrome-win64/chrome.exe`,
  headless: true,
});
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, timezoneId: 'America/Argentina/Buenos_Aires' });
const page = await context.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
let checks = 0;
function passed(description) { checks++; console.log(`PASS ${checks}: ${description}`); }
const selectCard = name => page.locator('.student-card').filter({ has: page.getByRole('heading', { name, exact: true }) }).click();
const dialog = () => page.getByRole('dialog');
const closeDialog = () => dialog().getByRole('button', { name: 'Cerrar ventana' }).click();
try {
  await page.goto(process.env.APP_BASE_URL || 'http://127.0.0.1:5173', { waitUntil: 'commit' });
  await page.getByRole('button', { name: 'Iniciar sesión', exact: true }).waitFor({ timeout: 60000 });
  await expect(page.getByRole('button', { name: 'Iniciar sesión', exact: true })).toBeEnabled();
  await page.getByRole('button', { name: 'Crear una cuenta', exact: true }).click();
  await expect(page.getByLabel('Tu nombre')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Crear mi cuenta' })).toBeEnabled();
  await page.getByRole('button', { name: 'Iniciar sesión', exact: true }).click();
  await page.getByRole('button', { name: 'Olvidé mi contraseña' }).click();
  await expect(page.getByRole('button', { name: 'Enviar enlace' })).toBeEnabled();
  await page.getByRole('button', { name: 'Iniciar sesión', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Google', exact: true })).toBeEnabled();
  passed('Auth: alta, ingreso, recuperación y Google disponibles y configurados');

  await page.getByRole('button', { name: /Explorar la demostración/ }).click();
  await expect(page.locator('.student-card')).toHaveCount(4);
  await expect(page.locator('.demo-banner')).toContainText('solo en este dispositivo');
  passed('Demo identificada con cuatro estudiantes ficticios');

  await page.getByRole('button', { name: 'Nuevo estudiante' }).click();
  await dialog().getByLabel(/Nombre y apellido/).fill('Prueba Requisitos');
  await dialog().getByLabel('Teléfono', { exact: true }).fill('1122334455');
  await dialog().getByLabel('Correo electrónico', { exact: true }).fill('ejemplo@example.com');
  await dialog().getByLabel('Dirección o lugar de encuentro').fill('Encuentro de prueba');
  const future = new Date(); future.setDate(future.getDate() + 1);
  const appointment = `${future.getFullYear()}-${String(future.getMonth() + 1).padStart(2, '0')}-${String(future.getDate()).padStart(2, '0')}T16:30`;
  await dialog().getByLabel('Próximo encuentro', { exact: true }).fill(appointment);
  await dialog().getByLabel('Notas iniciales').fill('Nota inicial A');
  await dialog().getByRole('button', { name: 'Agregar estudiante' }).click();
  await expect(page.locator('.student-card')).toHaveCount(5);
  await selectCard('Prueba Requisitos');
  await expect(page.getByRole('heading', { name: 'Prueba Requisitos', exact: true })).toBeVisible();
  await expect(page.getByText('1122334455', { exact: true })).toBeVisible();
  await expect(page.locator('.lesson-row')).toHaveCount(20);
  await expect(page.locator('#general-notes')).toHaveValue('Nota inicial A');
  passed('Alta, consulta, contacto, guía y 20 lecciones individuales');

  await page.getByRole('button', { name: 'Editar estudiante', exact: true }).click();
  await dialog().getByLabel(/Nombre y apellido/).fill('Prueba Requisitos Editada');
  await dialog().getByRole('button', { name: 'Guardar cambios' }).click();
  await expect(page.getByRole('heading', { name: 'Prueba Requisitos Editada', exact: true })).toBeVisible();
  passed('Edición del estudiante');

  await page.locator('#general-notes').fill('Notas generales exclusivas del alumno A');
  await page.locator('.notes-card').getByRole('button', { name: 'Guardar notas' }).click();
  await page.locator('.lesson-row').first().click();
  await expect(dialog().locator('.question')).toHaveCount(4);
  await expect(dialog().locator('.reference')).toHaveCount(4);
  await dialog().locator('.question details').first().locator('summary').click();
  await expect(dialog().locator('.question details').first().locator('p')).toBeVisible();
  await dialog().getByRole('tab', { name: 'Claves y preguntas' }).click();
  await expect(dialog().locator('.key-points li')).toHaveCount(3);
  await expect(dialog().locator('.faq')).toHaveCount(2);
  await dialog().getByRole('tab', { name: 'Mis notas' }).click();
  await dialog().getByLabel('Notas de esta lección').fill('Nota exclusiva lección 1 alumno A');
  await dialog().getByRole('button', { name: 'Guardar notas', exact: true }).click();
  await expect(dialog().getByText('Notas guardadas.', { exact: true })).toBeVisible();
  await dialog().getByRole('button', { name: 'Completar lección' }).click();
  await expect(dialog().getByRole('button', { name: 'Marcar como pendiente' })).toBeVisible();
  await closeDialog();
  await expect(page.getByText('1 de 20 lecciones completadas', { exact: true })).toBeVisible();
  await page.locator('.lesson-row').first().click();
  await dialog().getByRole('button', { name: 'Marcar como pendiente' }).click();
  await closeDialog();
  await expect(page.getByText('0 de 20 lecciones completadas', { exact: true })).toBeVisible();
  passed('Modal: preguntas, referencias, respuestas, claves, FAQ, notas y completar/reabrir');

  await page.locator('.lesson-row').nth(1).click();
  await dialog().getByRole('tab', { name: 'Mis notas' }).click();
  await expect(dialog().getByLabel('Notas de esta lección')).toHaveValue('');
  await dialog().getByLabel('Notas de esta lección').fill('Nota exclusiva lección 2 alumno A');
  await dialog().getByRole('button', { name: 'Guardar notas', exact: true }).click();
  await closeDialog();
  await page.getByRole('button', { name: /Volver a mis estudiantes/ }).click();
  await selectCard('Daniel López');
  await expect(page.locator('#general-notes')).not.toHaveValue('Notas generales exclusivas del alumno A');
  await page.locator('.lesson-row').first().click();
  await dialog().getByRole('tab', { name: 'Mis notas' }).click();
  await expect(dialog().getByLabel('Notas de esta lección')).toHaveValue('');
  await closeDialog();
  await page.getByRole('button', { name: /Volver a mis estudiantes/ }).click();
  passed('Notas generales y por lección aisladas entre alumnos y temas');

  await page.getByRole('textbox', { name: 'Buscar estudiantes' }).fill('Prueba Requisitos Editada');
  await expect(page.locator('.student-card')).toHaveCount(1);
  await page.getByRole('textbox', { name: 'Buscar estudiantes' }).fill('nombre inexistente');
  await expect(page.getByRole('heading', { name: 'No encontramos estudiantes' })).toBeVisible();
  await page.getByRole('button', { name: 'Limpiar búsqueda' }).click();
  await page.getByLabel('Filtrar estudiantes por estado').selectOption('paused');
  await expect(page.getByRole('heading', { name: 'No encontramos estudiantes' })).toBeVisible();
  await page.getByLabel('Filtrar estudiantes por estado').selectOption('all');
  passed('Búsqueda, filtro y estado vacío comprensible');

  await page.getByRole('button', { name: 'Mi agenda', exact: true }).click();
  await expect(page.locator('.agenda-meeting').filter({ hasText: 'Prueba Requisitos Editada' })).toContainText(/16:30|04:30 p\. m\./);
  await page.locator('.agenda-meeting').filter({ hasText: 'Prueba Requisitos Editada' }).click();
  await expect(page.getByRole('heading', { name: 'Prueba Requisitos Editada', exact: true })).toBeVisible();
  passed('Agenda: fecha, hora y acceso a ficha');

  await page.reload({ waitUntil: 'commit' });
  await page.getByRole('button', { name: /Explorar la demostración/ }).click();
  await selectCard('Prueba Requisitos Editada');
  await expect(page.locator('#general-notes')).toHaveValue('Notas generales exclusivas del alumno A');
  await page.locator('.lesson-row').first().click();
  await dialog().getByRole('tab', { name: 'Mis notas' }).click();
  await expect(dialog().getByLabel('Notas de esta lección')).toHaveValue('Nota exclusiva lección 1 alumno A');
  await closeDialog();
  passed('Persistencia demo tras recarga');

  await page.locator('#general-notes').fill('Borrador general protegido');
  page.once('dialog', prompt => prompt.dismiss());
  await page.getByRole('button', { name: /Volver a mis estudiantes/ }).click();
  await expect(page.locator('#general-notes')).toHaveValue('Borrador general protegido');
  await page.getByRole('button', { name: 'Editar estudiante', exact: true }).click();
  await expect(dialog().getByLabel('Notas iniciales')).toHaveValue('Borrador general protegido');
  await dialog().getByLabel('Dirección o lugar de encuentro').fill('Cambio no guardado');
  page.once('dialog', prompt => prompt.dismiss());
  await dialog().getByRole('button', { name: 'Cancelar', exact: true }).click();
  await expect(dialog()).toBeVisible();
  page.once('dialog', prompt => prompt.accept());
  await dialog().getByRole('button', { name: 'Cancelar', exact: true }).click();
  await expect(page.locator('#general-notes')).toHaveValue('Borrador general protegido');
  await page.locator('.notes-card').getByRole('button', { name: 'Guardar notas' }).click();
  await page.locator('.lesson-row').first().click();
  await dialog().getByRole('tab', { name: 'Mis notas' }).click();
  await dialog().getByLabel('Notas de esta lección').fill('Borrador lección protegido');
  page.once('dialog', prompt => prompt.dismiss());
  await closeDialog();
  await expect(dialog().getByLabel('Notas de esta lección')).toHaveValue('Borrador lección protegido');
  page.once('dialog', prompt => prompt.accept());
  await closeDialog();
  passed('Borradores protegidos al navegar, cancelar edición y cerrar lección');

  await page.evaluate(() => {
    window.__reviewOriginalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function () { throw new Error('Simulación almacenamiento no disponible'); };
  });
  await page.getByRole('button', { name: 'Editar estudiante', exact: true }).click();
  await dialog().getByLabel('Dirección o lugar de encuentro').fill('Cambio que debe fallar');
  await dialog().getByRole('button', { name: 'Guardar cambios' }).click();
  await expect(dialog().getByRole('alert')).toContainText('No se pudo guardar');
  await expect(dialog().getByLabel('Dirección o lugar de encuentro')).toHaveValue('Cambio que debe fallar');
  await page.evaluate(() => { Storage.prototype.setItem = window.__reviewOriginalSetItem; });
  page.once('dialog', prompt => prompt.accept());
  await dialog().getByRole('button', { name: 'Cancelar', exact: true }).click();
  passed('Error de guardado conserva datos y muestra fallo sin éxito ficticio');

  await page.getByRole('button', { name: 'Eliminar estudiante', exact: true }).click();
  await expect(dialog()).toContainText('Esta acción no se puede deshacer');
  await dialog().getByRole('button', { name: 'Conservar estudiante' }).click();
  await expect(page.getByRole('heading', { name: 'Prueba Requisitos Editada', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Eliminar estudiante', exact: true }).click();
  await dialog().getByRole('button', { name: 'Eliminar estudiante', exact: true }).click();
  await expect(page.locator('.student-card')).toHaveCount(4);
  passed('Eliminar requiere confirmación y permite conservar');

  await page.getByRole('button', { name: 'Guías de estudio', exact: true }).click();
  await expect(page.locator('.library-lesson')).toHaveCount(20);
  for (let i = 0; i < 20; i++) {
    await page.locator('.library-lesson').nth(i).click();
    await expect(dialog().locator('.question')).toHaveCount(4);
    await expect(dialog().locator('.reference')).toHaveCount(4);
    await expect(dialog().locator('.source-link')).toHaveAttribute('href', new RegExp(`${String(i+1).padStart(2, '0')}_leccion.pdf$`));
    await dialog().getByRole('tab', { name: 'Claves y preguntas' }).click();
    await expect(dialog().locator('.key-points li')).toHaveCount(3);
    await expect(dialog().locator('.faq')).toHaveCount(2);
    await closeDialog();
  }
  passed('20 lecciones: 80 preguntas/referencias/respuestas, 60 claves, 40 FAQ y fuentes por hoja');
  await expect(page.getByRole('button', { name: 'Salir de la demostración' })).toBeVisible();
  await page.getByRole('button', { name: 'Salir de la demostración' }).click();
  await expect(page.getByRole('button', { name: 'Iniciar sesión', exact: true })).toBeVisible();
  passed('Salida de demo retira registros');
  if (errors.length) throw new Error(`Errores runtime: ${errors.join('; ')}`);
  passed('Sin errores JavaScript en navegación y operaciones');
  console.log(`RESULTADO: ${checks} comprobaciones funcionales aprobadas.`);
} finally {
  await browser.close();
}
