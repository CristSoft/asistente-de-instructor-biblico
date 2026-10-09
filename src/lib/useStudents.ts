import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import type { Student } from '../types';
import { db } from './firebase';

const DEMO_KEY = 'el-camino-demo-v1';
const todayAt = (days: number, time: string) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${time}`;
};
function demoStudents(): Student[] {
  return [
    { name: 'Lucía Fernández', count: 6, days: 0, time: '17:00', notes: 'Le gusta conversar al terminar cada lectura. Repasar juntos las referencias antes de avanzar.' },
    { name: 'Mateo González', count: 2, days: 1, time: '18:30', notes: 'Prefiere los encuentros por la tarde. Quiere aprender a encontrar los textos en su Biblia.' },
    { name: 'Elena Rodríguez', count: 11, days: 3, time: '16:00', notes: 'Reservar tiempo para sus preguntas sobre el descanso y la vida cotidiana.' },
    { name: 'Daniel López', count: 0, days: 5, time: '19:00', notes: 'Primer encuentro: escuchar su historia y presentar la guía.' },
  ].map((sample, index) => ({
    id: `demo-${index + 1}`, name: sample.name, phone: '', email: '', address: '', notes: sample.notes,
    guideId: 'la-fe-de-jesus', status: 'active', nextMeeting: todayAt(sample.days, sample.time),
    completedLessons: Array.from({ length: sample.count }, (_, n) => n + 1), lessonNotes: {}, createdAt: new Date().toISOString(),
  }));
}
function readDemo(): Student[] {
  try {
    const value = JSON.parse(localStorage.getItem(DEMO_KEY) || 'null');
    if (Array.isArray(value) && value.every(s => s && typeof s.id === 'string' && typeof s.name === 'string' && Array.isArray(s.completedLessons) && s.lessonNotes && typeof s.nextMeeting === 'string')) return value;
  } catch { /* Recover an invalid demo without affecting account data. */ }
  return demoStudents();
}

export function useStudents(user: User | null, demo: boolean) {
  const [state, setState] = useState<{ owner: string; students: Student[] }>({ owner: '', students: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const owner = demo ? 'demo' : user?.uid || '';
  const students = state.owner === owner ? state.students : [];

  useEffect(() => {
    setError('');
    if (demo) {
      setState({ owner: 'demo', students: readDemo() });
      setLoading(false);
      return;
    }
    setState({ owner, students: [] });
    if (!user || !db) { setLoading(false); return; }
    setLoading(true);
    return onSnapshot(collection(db, 'users', user.uid, 'students'), snapshot => {
      const records = snapshot.docs.map(d => ({ ...d.data(), id: d.id }) as Student);
      records.sort((a, b) => a.name.localeCompare(b.name, 'es'));
      setState({ owner: user.uid, students: records });
      setLoading(false);
    }, () => {
      setError('No pudimos cargar tus estudiantes. Revisá tu conexión y volvé a ingresar.');
      setLoading(false);
    });
  }, [demo, user?.uid, owner]);

  async function saveStudent(student: Student) {
    if (!student.name.trim()) throw new Error('Escribí el nombre del estudiante.');
    if (demo) {
      const current = state.owner === 'demo' ? state.students : readDemo();
      const next = current.some(s => s.id === student.id) ? current.map(s => s.id === student.id ? student : s) : [...current, student];
      localStorage.setItem(DEMO_KEY, JSON.stringify(next));
      setState({ owner: 'demo', students: next });
      return;
    }
    if (!user || !db) throw new Error('Ingresá a tu cuenta para guardar tus estudiantes.');
    if (!navigator.onLine) throw new Error('No hay conexión. Conservá esta ventana abierta e intentá guardar cuando vuelva internet.');
    await setDoc(doc(db, 'users', user.uid, 'students', student.id), student);
  }

  async function deleteStudent(id: string) {
    if (demo) {
      const next = students.filter(s => s.id !== id);
      localStorage.setItem(DEMO_KEY, JSON.stringify(next));
      setState({ owner: 'demo', students: next });
      return;
    }
    if (!user || !db) throw new Error('Ingresá a tu cuenta para realizar este cambio.');
    if (!navigator.onLine) throw new Error('Necesitás conexión para eliminar un estudiante.');
    await deleteDoc(doc(db, 'users', user.uid, 'students', id));
  }
  return { students, loading, error, saveStudent, deleteStudent };
}
