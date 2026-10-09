import { readFile } from 'node:fs/promises';
import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

const environment = await initializeTestEnvironment({
  projectId: 'demo-el-camino',
  firestore: { rules: await readFile(new URL('../firestore.rules', import.meta.url), 'utf8') },
});
let checks = 0;
async function verify(description, assertion) {
  await assertion;
  checks += 1;
  console.log(`PASS ${description}`);
}
try {
  await environment.clearFirestore();
  const owner = environment.authenticatedContext('instructor-a').firestore();
  const other = environment.authenticatedContext('instructor-b').firestore();
  const anonymous = environment.unauthenticatedContext().firestore();
  const path = 'users/instructor-a/students/student-1';
  const record = {
    id: 'student-1', name: 'Estudiante de prueba', phone: '', email: '', address: '',
    notes: 'Nota privada', guideId: 'la-fe-de-jesus', status: 'active', nextMeeting: '',
    completedLessons: [1, 2], lessonNotes: { '1': 'Repasar la referencia' }, createdAt: '2026-10-09T12:00:00.000Z',
  };
  await verify('anonymous cannot create', assertFails(setDoc(doc(anonymous, path), record)));
  await verify('owner can create', assertSucceeds(setDoc(doc(owner, path), record)));
  await verify('owner can read', assertSucceeds(getDoc(doc(owner, path))));
  await verify('owner can list own students', assertSucceeds(getDocs(collection(owner, 'users/instructor-a/students'))));
  await verify('anonymous cannot read', assertFails(getDoc(doc(anonymous, path))));
  await verify('another instructor cannot read', assertFails(getDoc(doc(other, path))));
  await verify('another instructor cannot list', assertFails(getDocs(collection(other, 'users/instructor-a/students'))));
  await verify('another instructor cannot update', assertFails(updateDoc(doc(other, path), { notes: 'Cambio ajeno' })));
  await verify('another instructor cannot delete', assertFails(deleteDoc(doc(other, path))));
  await verify('owner can update progress and lesson notes', assertSucceeds(updateDoc(doc(owner, path), { completedLessons: [1, 2, 3], lessonNotes: { '3': 'Reforzar' } })));
  const invalid = [
    ['empty name', { name: '' }], ['oversized name', { name: 'x'.repeat(121) }],
    ['unknown field', { ownerUid: 'instructor-b' }], ['invalid guide', { guideId: 'unknown' }],
    ['invalid status', { status: 'unknown' }], ['invalid lesson', { completedLessons: [21] }],
    ['duplicate progress', { completedLessons: [1, 1] }], ['string lesson', { completedLessons: ['1'] }],
    ['invalid lesson note key', { lessonNotes: { '21': 'invalid' } }],
    ['invalid lesson note type', { lessonNotes: { '1': 42 } }],
    ['oversized lesson note', { lessonNotes: { '1': 'x'.repeat(10001) } }],
    ['oversized general note', { notes: 'x'.repeat(10001) }],
    ['changed id', { id: 'student-2' }], ['changed creation date', { createdAt: 'other' }],
  ];
  for (const [description, change] of invalid) {
    await verify(`reject ${description}`, assertFails(updateDoc(doc(owner, path), change)));
  }
  await verify('undeclared collections stay private', assertFails(setDoc(doc(owner, 'public/test'), { message: 'no' })));
  await verify('owner can delete', assertSucceeds(deleteDoc(doc(owner, path))));
  console.log(`All ${checks} Firestore security checks passed.`);
} finally {
  await environment.cleanup();
}
