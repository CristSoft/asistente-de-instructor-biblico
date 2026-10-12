import { chromium, expect } from '@playwright/test';

const baseURL = process.env.APP_BASE_URL || 'http://127.0.0.1:5173';
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || `${process.env.LOCALAPPDATA}/ms-playwright/chromium-1228/chrome-win64/chrome.exe`, headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, timezoneId: 'America/Argentina/Buenos_Aires' });
const page = await context.newPage();
page.setDefaultTimeout(60000);
const errors = [];
page.on('pageerror', error => errors.push(error.message));
let checks = 0;
function passed(label) { console.log(`PASS ${++checks}: ${label}`); }
const videoIds = ['dsdjHEMnFJs', 'yCIyxcDc5Z4', '_yl_pItOdTw', '8w3sjVY7bRQ', 'A6w0d7LF5ww', 'iaF_vSdc-ZQ', 'fuLlTdP1P14', '4ln-8_VU8F0', '833vgB1ANtw', 'NkI67z22dgk', 't-u3fhpCSiM', 'TGj8mUZ3hY8', 'DgfG73uVqY4', 'EEdFcIuU0UY', '46Bi3O6PXgg', 'AWUqBauQ0d8', 'tFASI5zUCTQ', 'Cq3Vj1as4eg', '4na8QssOUeI', '1jaOPCGNTxk'];
const introURL = 'https://youtu.be/8Avps3cOQJU';

await context.addInitScript(() => {
  window.__shareCalls = [];
  window.__clipboardCalls = [];
  window.__shareMode = 'success';
  Object.defineProperty(navigator, 'share', { configurable: true, value: async data => {
    window.__shareCalls.push({ ...data });
    if (window.__shareMode === 'cancel') throw new DOMException('Cancelación de prueba', 'AbortError');
    if (['reject', 'reject-copy-fail'].includes(window.__shareMode)) throw new DOMException('Rechazo de prueba', 'NotAllowedError');
  }});
  window.__reviewNativeShare = navigator.share;
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async text => {
    window.__clipboardCalls.push(text);
    if (['clipboard-fail', 'reject-copy-fail'].includes(window.__shareMode)) throw new Error('Portapapeles no disponible');
  } }});
});

try {
  await page.goto(baseURL, { waitUntil: 'commit' });
  await page.getByRole('button', { name: 'Continuar con Google', exact: true }).waitFor();
  await page.getByRole('button', { name: /Explorar la demostración/ }).click();
  await page.getByRole('button', { name: 'Guías de estudio', exact: true }).click();
  await expect(page.locator('.library-lesson')).toHaveCount(20);
  for (let index = 0; index < 20; index++) {
    await page.locator('.library-lesson').nth(index).click();
    const modal = page.getByRole('dialog');
    const lessonTitle = await modal.locator('.lesson-intro h2').innerText();
    const send = modal.getByRole('button', { name: 'Enviar lección', exact: true });
    await expect(send).toBeVisible();
    await expect(modal.locator('.modal-header').getByRole('button', { name: 'Enviar lección', exact: true })).toBeVisible();
    await send.click();
    await expect.poll(() => page.evaluate(() => window.__shareCalls.length)).toBe(index + 1);
    const payload = await page.evaluate(() => window.__shareCalls.at(-1));
    expect(payload.url).toBe(`https://youtu.be/${videoIds[index]}`);
    expect(payload.title).toContain(lessonTitle);
    expect(Object.keys(payload).sort()).toEqual(['text', 'title', 'url']);
    expect(payload.text).toBe(payload.title);
    await modal.getByRole('button', { name: 'Cerrar ventana' }).click();
  }
  expect(await page.evaluate(() => window.__clipboardCalls.length)).toBe(0);
  passed('20 botones superiores comparten título y YouTube exacto, sin datos personales ni portapapeles');

  await page.getByRole('button', { name: 'Enviar introducción', exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.__shareCalls.length)).toBe(21);
  expect((await page.evaluate(() => window.__shareCalls.at(-1))).url).toBe(introURL);
  passed('Introducción comparte su URL independiente');

  await page.locator('.library-lesson').first().click();
  const beforeCancel = await page.evaluate(() => { window.__shareMode = 'cancel'; return window.__clipboardCalls.length; });
  await page.getByRole('dialog').getByRole('button', { name: 'Enviar lección', exact: true }).click();
  await expect(page.getByRole('dialog').getByRole('button', { name: 'Enviar lección', exact: true })).toBeEnabled();
  expect(await page.evaluate(() => window.__clipboardCalls.length)).toBe(beforeCancel);
  await expect(page.getByRole('dialog').getByLabel('Enlace para copiar')).toHaveCount(0);
  passed('Cancelar diálogo nativo respeta intención: UI no copia ni abre fallback manual');

  let beforeCopy = await page.evaluate(() => { window.__shareMode = 'reject'; return window.__clipboardCalls.length; });
  await page.getByRole('dialog').getByRole('button', { name: 'Enviar lección', exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.__clipboardCalls.length)).toBe(beforeCopy + 1);
  expect(await page.evaluate(() => window.__clipboardCalls.at(-1))).toBe(`https://youtu.be/${videoIds[0]}`);
  await expect(page.getByRole('dialog').getByRole('status')).toHaveText('Enlace copiado. Ya puedes enviarlo.');
  passed('Rechazo Web Share copia URL correcta y confirma fallback en interfaz');

  beforeCopy = await page.evaluate(() => {
    Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
    window.__shareMode = 'success';
    return window.__clipboardCalls.length;
  });
  await page.getByRole('dialog').getByRole('button', { name: 'Enviar lección', exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.__clipboardCalls.length)).toBe(beforeCopy + 1);
  expect(await page.evaluate(() => window.__clipboardCalls.at(-1))).toBe(`https://youtu.be/${videoIds[0]}`);
  await expect(page.getByRole('dialog').getByRole('status')).toHaveText('Enlace copiado. Ya puedes enviarlo.');
  passed('Dispositivo sin Web Share utiliza portapapeles e informa resultado');
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'share', { configurable: true, value: undefined });
    window.__shareMode = 'clipboard-fail';
  });
  await page.getByRole('dialog').getByRole('button', { name: 'Enviar lección', exact: true }).click();
  await expect(page.getByRole('dialog').getByLabel('Enlace para copiar')).toHaveValue(`https://youtu.be/${videoIds[0]}`);
  await expect(page.getByRole('dialog').getByRole('link', { name: 'Abrir video' })).toHaveAttribute('href', `https://youtu.be/${videoIds[0]}`);
  passed('Fallback manual visible con URL correcta y enlace accesible para abrir video');
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'share', { configurable: true, value: window.__reviewNativeShare });
    window.__shareMode = 'reject-copy-fail';
  });
  await page.getByRole('dialog').getByRole('button', { name: 'Enviar lección', exact: true }).click();
  await expect(page.getByRole('dialog').getByLabel('Enlace para copiar')).toHaveValue(`https://youtu.be/${videoIds[0]}`);
  await page.getByRole('dialog').getByRole('button', { name: 'Cerrar ventana' }).click();
  passed('Rechazo nativo y clipboard fallido también permiten copia manual');

  await page.getByRole('button', { name: /^Mis estudiantes/ }).click();
  await page.locator('.student-card').first().click();
  const studentName = await page.locator('.student-title h1').innerText();
  const studentNote = await page.locator('#general-notes').inputValue();
  const beforeShareData = await page.evaluate(() => { window.__shareMode = 'success'; return localStorage.getItem('el-camino-demo-v1'); });
  await page.locator('.lesson-row').first().click();
  await page.getByRole('dialog').getByRole('button', { name: 'Enviar lección', exact: true }).click();
  await expect(page.getByRole('dialog').getByRole('status')).toHaveText('Se abrió el menú para compartir.');
  const studentPayload = JSON.stringify(await page.evaluate(() => window.__shareCalls.at(-1)));
  expect(studentPayload).not.toContain(studentName);
  expect(studentPayload).not.toContain(studentNote);
  expect(await page.evaluate(() => localStorage.getItem('el-camino-demo-v1'))).toBe(beforeShareData);
  await page.getByRole('dialog').getByRole('button', { name: 'Cerrar ventana' }).click();
  passed('Compartir desde alumno conserva progreso/notas y excluye nombre y notas del payload');

  const agendaPage = await context.newPage();
  agendaPage.setDefaultTimeout(60000);
  agendaPage.on('pageerror', error => errors.push(error.message));
  await agendaPage.clock.install({ time: new Date('2026-10-12T02:30:00.000Z') });
  await agendaPage.addInitScript(() => {
    const record = (id, name, nextMeeting) => ({ id, name, nextMeeting, phone: '', email: '', address: '', notes: '', guideId: 'la-fe-de-jesus', status: 'active', completedLessons: [], lessonNotes: {}, createdAt: '2026-10-01T12:00:00Z' });
    localStorage.setItem('el-camino-demo-v1', JSON.stringify([
      record('review-late', 'Alumna Tarde', '2026-10-12T02:00:00.000Z'),
      record('review-early', 'Alumno Mañana', '2026-10-11T12:00:00.000Z'),
      record('review-tomorrow', 'Alumno Día Siguiente', '2026-10-12T12:15:00.000Z'),
      record('review-november', 'Alumno Noviembre', '2026-11-01T15:00:00.000Z'),
    ]));
  });
  await agendaPage.goto(baseURL, { waitUntil: 'commit' });
  await agendaPage.getByRole('button', { name: 'Continuar con Google', exact: true }).waitFor();
  await agendaPage.getByRole('button', { name: /Explorar la demostración/ }).click();
  await agendaPage.getByRole('button', { name: 'Mi agenda', exact: true }).click();
  await expect(agendaPage.locator('.calendar-date[data-date="2026-10-11"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(agendaPage.locator('.day-agenda').getByRole('heading', { name: 'Próximo estudio', exact: true })).toBeVisible();
  await expect(agendaPage.locator('.agenda-meeting h3')).toHaveText(['Alumno Mañana', 'Alumna Tarde']);
  await expect(agendaPage.locator('.agenda-meeting').first()).toContainText(/09:00|9:00/);
  await expect(agendaPage.locator('.agenda-meeting').last()).toContainText(/23:00|11:00 p\. m\./);
  passed('Agenda inicia en fecha local: 11oct23:30 aunque UTC sea12oct; encuentros ordenados por hora');

  await agendaPage.locator('.calendar-date[data-date="2026-10-12"]').click();
  await expect(agendaPage.locator('.agenda-meeting h3')).toHaveText(['Alumno Día Siguiente']);
  await expect(agendaPage.locator('.calendar-date[data-date="2026-10-12"]')).toHaveAttribute('aria-pressed', 'true');
  await agendaPage.locator('.agenda-meeting').click();
  await expect(agendaPage.getByRole('heading', { name: 'Alumno Día Siguiente', exact: true })).toBeVisible();
  await agendaPage.getByRole('button', { name: /Volver a mi agenda/ }).click();
  await expect(agendaPage.locator('.calendar-date[data-date="2026-10-12"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(agendaPage.locator('.agenda-meeting h3')).toHaveText(['Alumno Día Siguiente']);
  await agendaPage.locator('.calendar-date[data-date="2026-10-13"]').click();
  await expect(agendaPage.locator('.agenda-meeting')).toHaveCount(0);
  await expect(agendaPage.locator('.day-agenda')).toContainText('No hay estudios para este día');
  passed('Selección de fecha filtra el día exacto, abre ficha y comunica días sin encuentros');

  await agendaPage.getByRole('button', { name: 'Mes siguiente' }).click();
  await agendaPage.locator('.calendar-date[data-date="2026-11-01"]').click();
  await expect(agendaPage.locator('.agenda-meeting h3')).toHaveText(['Alumno Noviembre']);
  await agendaPage.getByRole('button', { name: 'Hoy', exact: true }).click();
  await expect(agendaPage.locator('.calendar-date[data-date="2026-10-11"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(agendaPage.locator('.agenda-meeting h3')).toHaveText(['Alumno Mañana', 'Alumna Tarde']);
  passed('Cambio de mes y Hoy mantienen fecha seleccionada y citas correspondientes');

  expect(errors).toEqual([]);
  passed('Sin errores JavaScript en nuevos flujos');
  console.log(`RESULTADO: ${checks} comprobaciones de actualización aprobadas.`);
} finally {
  await browser.close();
}
