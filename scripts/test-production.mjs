// Runs only against the explicitly confirmed project after both review approvals.
// Uses two temporary client accounts; removes the owned test record and accounts.
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, deleteDoc, terminate } from 'firebase/firestore';

const env = Object.fromEntries((await readFile('.env.local', 'utf8')).split(/\r?\n/)
  .filter(line => line.startsWith('VITE_FIREBASE_')).map(line => {
    const split = line.indexOf('=');
    return [line.slice(0, split), line.slice(split + 1).replace(/^['"]|['"]$/g, '')];
  }));
if (env.VITE_FIREBASE_PROJECT_ID !== 'instructor-biblico-pro') throw new Error('Unexpected production project.');
const config = { apiKey: env.VITE_FIREBASE_API_KEY, projectId: env.VITE_FIREBASE_PROJECT_ID, appId: env.VITE_FIREBASE_APP_ID };
const apps = [0, 1, 2].map(i => initializeApp(config, `production-check-${i}-${randomUUID()}`));
const databases = apps.map(app => getFirestore(app));
const accounts = [];
let record;
async function denied(promise, label) {
  try { await promise; } catch (error) {
    if (error.code === 'permission-denied') { console.log(`PASS ${label}`); return; }
    throw error;
  }
  throw new Error(`Access unexpectedly allowed: ${label}`);
}
try {
  for (let i = 0; i < 2; i++) {
    const credential = await createUserWithEmailAndPassword(getAuth(apps[i]), `qa-${randomUUID()}@example.com`, `QA!${randomUUID()}`);
    accounts.push(credential.user);
  }
  console.log('PASS real email/password registration');
  const id = `qa-${randomUUID()}`;
  const path = ['users', accounts[0].uid, 'students', id];
  record = doc(databases[0], ...path);
  const student = { id, name: 'Verificación temporal', phone: '', email: '', address: '', notes: 'Prueba temporal', guideId: 'la-fe-de-jesus', status: 'active', nextMeeting: '', completedLessons: [1], lessonNotes: { '1': 'Nota temporal' }, createdAt: new Date().toISOString() };
  await setDoc(record, student);
  const saved = (await getDoc(record)).data();
  if (saved.notes !== student.notes || saved.lessonNotes['1'] !== student.lessonNotes['1']) throw new Error('Persistence mismatch.');
  console.log('PASS real Firestore save and read of progress and both notes');
  await denied(getDoc(doc(databases[1], ...path)), 'another instructor cannot read');
  await denied(setDoc(doc(databases[1], ...path), student), 'another instructor cannot write');
  await denied(getDoc(doc(databases[2], ...path)), 'anonymous user cannot read');
  await deleteDoc(record);
  record = undefined;
  console.log('PASS temporary record removed');
} finally {
  const cleanupErrors = [];
  if (record) await deleteDoc(record).catch(error => cleanupErrors.push(error));
  const accountCleanup = await Promise.allSettled(accounts.map(account => deleteUser(account)));
  for (const result of accountCleanup) if (result.status === 'rejected') cleanupErrors.push(result.reason);
  await Promise.all(databases.map(terminate));
  await Promise.all(apps.map(deleteApp));
  if (cleanupErrors.length) throw new AggregateError(cleanupErrors, 'No se pudo completar la limpieza de la prueba.');
  console.log('Temporary test accounts removed.');
}
