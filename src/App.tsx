import { useEffect, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type { User } from 'firebase/auth';
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays, Check, CheckCheck, ChevronLeft, ChevronRight, Clock3, ExternalLink, Feather, LayoutGrid, LogOut, Mail, MapPin, Pencil, Plus, Search, Share2, Sprout, StickyNote, Trash2, Users, X } from 'lucide-react';
import { auth, firebaseConfigured, login, logout, register, resetPassword, signInWithGoogle } from './lib/firebase';
import { useStudents } from './lib/useStudents';
import type { Lesson, Student } from './types';
import { guide, lessons } from './data/guide';
import { shareLesson } from './lib/shareLesson';

const statusLabels = { active: 'En camino', paused: 'En pausa', completed: 'Completado' };
const initials = (name: string) => name.trim().split(/\s+/).slice(0, 2).map(n => n[0]).join('').toUpperCase();
const dateFormat = (date: string, full = false) => date ? new Date(date).toLocaleDateString('es-AR', { day: 'numeric', month: full ? 'long' : 'short', ...(full ? { weekday: 'long' as const } : {}) }) : 'Sin fecha';
const timeFormat = (date: string) => date ? new Date(date).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }) : '';
const localDay = (date: string | Date) => new Date(date).toLocaleDateString('en-CA');
const nextLesson = (student: Student) => lessons.find(l => !student.completedLessons.includes(l.id));
const progress = (student: Student) => Math.round(student.completedLessons.length / Math.max(lessons.length, 1) * 100);
function Brand() { return <div className="brand"><img src="/icon.svg" alt=""/><div><strong>Instructor Bíblico Pro</strong><small>ASISTENTE BÍBLICO</small></div></div>; }
function Modal({ children, title, onClose, wide = false, dirty = false, actions }: { children: ReactNode; title: string; onClose: () => void; wide?: boolean; dirty?: boolean; actions?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose); const dirtyRef = useRef(dirty); closeRef.current = onClose; dirtyRef.current = dirty;
  function requestClose() { if (!dirtyRef.current || window.confirm('Tienes cambios sin guardar. ¿Quieres descartarlos y cerrar?')) closeRef.current(); }
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    const old = document.body.style.overflow; document.body.style.overflow = 'hidden';
    const target = ref.current; target?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.stopImmediatePropagation(); requestClose(); }
      if (e.key === 'Tab' && target) {
        const items = Array.from(target.querySelectorAll<HTMLElement>('button:not(:disabled), a[href], input, select, textarea, [tabindex="0"]'));
        if (!items.length) return;
        if (e.shiftKey && (document.activeElement === items[0] || document.activeElement === target)) { e.preventDefault(); items.at(-1)?.focus(); }
        else if (!e.shiftKey && document.activeElement === items.at(-1)) { e.preventDefault(); items[0].focus(); }
      }
    }; document.addEventListener('keydown', key);
    return () => { document.body.style.overflow = old; document.removeEventListener('keydown', key); previous?.focus(); };
  }, []);
  useEffect(() => { const leave = (e: BeforeUnloadEvent) => { if (dirtyRef.current) e.preventDefault(); }; window.addEventListener('beforeunload', leave); return () => window.removeEventListener('beforeunload', leave); }, []);
  return <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && requestClose()}><div ref={ref} tabIndex={-1} className={`modal ${wide ? 'modal-wide' : ''}`} role="dialog" aria-modal="true" aria-label={title}><div className="modal-header"><h2>{title}</h2><div className="modal-header-actions">{actions}<button className="icon-button" aria-label="Cerrar ventana" onClick={requestClose}><X size={22}/></button></div></div>{children}</div></div>;
}
function AuthScreen({ onDemo }: { onDemo: () => void }) {
  const [mode, setMode] = useState<'login'|'register'|'reset'>('login'); const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [name, setName] = useState(''); const [busy, setBusy] = useState(false); const [message, setMessage] = useState('');
  async function submit(e: FormEvent) { e.preventDefault(); setBusy(true); setMessage(''); try { if (mode === 'reset') { await resetPassword(email); setMessage('Si este correo tiene una cuenta, recibirás un enlace para restablecer la contraseña.'); } else if (mode === 'register') await register(email, password, name); else await login(email, password); } catch { setMessage('No pudimos completar la solicitud. Revisa tus datos y la conexión e inténtalo nuevamente.'); } finally { setBusy(false); } }
  async function google() { setBusy(true); setMessage(''); try { await signInWithGoogle(); } catch { setMessage('No se pudo iniciar sesión con Google. Puedes ingresar con tu correo o volver a intentarlo.'); } finally { setBusy(false); } }
  return (
    <main className="auth-page">
      <section className="auth-story">
        <Brand />
        <div>
          <span className="eyebrow">CADA PERSONA. CADA ENCUENTRO.</span>
          <h1>Acompañar la fe,<br /><em>paso a paso.</em></h1>
          <p>Un lugar para cuidar tus estudios bíblicos y recordar lo que hace único a cada estudiante.</p>
          <img className="auth-illustration" src="/growing.svg" alt="Un libro abierto del que brota una planta" />
        </div>
        <small>Hecho para acompañar tu ministerio.</small>
      </section>
      <section className="auth-content">
        <div className="auth-form">
          <span className="eyebrow">BIENVENIDO A INSTRUCTOR BÍBLICO PRO</span>
          <h2>{mode === 'login' ? 'Tu próximo encuentro empieza aquí.' : mode === 'register' ? 'Un nuevo camino comienza.' : 'Recupera tu acceso.'}</h2>
          <p>{mode === 'login' ? 'Ingresa para continuar acompañando a tus estudiantes.' : mode === 'register' ? 'Crea tu espacio personal de estudios bíblicos.' : 'Te enviaremos un enlace a tu correo electrónico.'}</p>
          {mode === 'login' && (
            <div className="google-first">
              <button className="button primary full" disabled={busy || !firebaseConfigured} onClick={google}>
                <svg width="21" height="21" viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M19 10.2c0-.6 0-1.2-.2-1.8H10v3.5h5.1a4.5 4.5 0 0 1-1.9 2.9c-.9.6-2 .9-3.2.9a5.7 5.7 0 1 1 0-11.4c1.4 0 2.5.5 3.4 1.3l2.6-2.5A9.3 9.3 0 1 0 10 19.3c2.5 0 4.6-.8 6.1-2.2 1.8-1.6 2.9-4 2.9-6.9" /></svg>
                {busy ? 'Un momento…' : 'Continuar con Google'}
              </button>
              <div className="divider"><span>o ingresa con tu correo</span></div>
            </div>
          )}
          <form onSubmit={submit}>
            {mode === 'register' && <label>Tu nombre<input autoComplete="name" required value={name} onChange={e => setName(e.target.value)} /></label>}
            <label>Correo electrónico<input type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@correo.com" /></label>
            {mode !== 'reset' && <label>Contraseña<input type="password" minLength={6} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} required value={password} onChange={e => setPassword(e.target.value)} placeholder="Al menos 6 caracteres" /></label>}
            {message && <div className="notice" role="status">{message}</div>}
            {!firebaseConfigured && <p className="notice">Estamos preparando el acceso a las cuentas. Mientras tanto, puedes explorar la demostración.</p>}
            <button className={`button full ${mode === 'login' ? '' : 'primary'}`} disabled={busy || !firebaseConfigured}>
              {busy ? 'Un momento…' : mode === 'login' ? 'Ingresar con correo' : mode === 'register' ? 'Crear mi cuenta' : 'Enviar enlace'}<ArrowRight size={18} />
            </button>
          </form>
          {mode === 'login' && <button className="text-button forgot" onClick={() => { setMode('reset'); setMessage(''); }}>Olvidé mi contraseña</button>}
          <p className="auth-switch">{mode === 'login' ? '¿Es tu primera vez? ' : '¿Ya tienes una cuenta? '}<button className="text-button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setMessage(''); }}>{mode === 'login' ? 'Crear una cuenta' : 'Iniciar sesión'}</button></p>
          <div className="demo-entry"><button className="text-button" onClick={onDemo}>Explorar la demostración <ArrowRight size={16} /></button><small>Con estudiantes de ejemplo, sin crear una cuenta.</small></div>
        </div>
      </section>
    </main>
  );
}


function ShareResource({ title, url, label }: { title: string; url: string; label: string }) {
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<'shared' | 'copied' | 'manual' | 'cancelled' | null>(null);

  async function send() {
    setBusy(true);
    setResult(null);
    try {
      setResult(await shareLesson({ title, url }));
    } catch {
      setResult('manual');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="share-resource">
      <button className="button primary share-button" onClick={send} disabled={busy}>
        <Share2 size={17} />{busy ? 'Preparando…' : label}
      </button>
      {result === 'shared' && <p className="share-status" role="status">Se abrió el menú para compartir.</p>}
      {result === 'copied' && <p className="share-status" role="status">Enlace copiado. Ya puedes enviarlo.</p>}
      {result === 'manual' && (
        <div className="share-manual">
          <p role="status">Copia este enlace para enviarlo.</p>
          <label>Enlace para copiar<input readOnly value={url} onFocus={e => e.currentTarget.select()} /></label>
          <a href={url} target="_blank" rel="noreferrer" className="text-button">Abrir video <ExternalLink size={15} /></a>
        </div>
      )}
    </div>
  );
}

function CalendarAgenda({
  students, onSelectStudent, onSchedule, selectedDay, setSelectedDay, month, setMonth,
}: {
  students: Student[];
  onSelectStudent: (id: string) => void;
  onSchedule: () => void;
  selectedDay: Date;
  setSelectedDay: (date: Date) => void;
  month: Date;
  setMonth: (date: Date) => void;
}) {

  const dateButtons = useRef<Map<string, HTMLButtonElement>>(new Map());
  const today = new Date();
  const meetings = students.filter(student => student.nextMeeting && localDay(student.nextMeeting) === localDay(selectedDay))
    .sort((first, second) => new Date(first.nextMeeting).getTime() - new Date(second.nextMeeting).getTime());

  function selectDate(date: Date, focus = false) {
    setSelectedDay(date);
    setMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    if (focus) requestAnimationFrame(() => dateButtons.current.get(localDay(date))?.focus());
  }

  return (
    <>
      <div className="page-heading">
        <div><span className="eyebrow">TIEMPO PARA ENCONTRARSE</span><h1>Mi agenda</h1><p>Elige un día para ver tus estudios, ordenados por hora.</p></div>
        <button className="button primary" onClick={onSchedule}><Plus size={18} />Programar encuentro</button>
      </div>
      <div className="agenda-grid">
        <section className="card calendar" aria-label="Calendario de estudios">
          <div className="calendar-heading">
            <h2 aria-live="polite">{month.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })}</h2>
            <div>
              <button className="text-button calendar-today" onClick={() => selectDate(new Date())}>Hoy</button>
              <button className="icon-button" aria-label="Mes anterior" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}><ChevronLeft size={21} /></button>
              <button className="icon-button" aria-label="Mes siguiente" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}><ChevronRight size={21} /></button>
            </div>
          </div>
          <div className="calendar-grid" aria-label="Seleccionar día">
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => <span className="weekday" key={day}>{day}</span>)}
            {Array.from({ length: (new Date(month.getFullYear(), month.getMonth(), 1).getDay() + 6) % 7 }, (_, index) => <span key={`empty${index}`} />)}
            {Array.from({ length: new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate() }, (_, index) => {
              const day = new Date(month.getFullYear(), month.getMonth(), index + 1);
              const dayKey = localDay(day);
              const count = students.filter(student => student.nextMeeting && localDay(student.nextMeeting) === dayKey).length;
              const isToday = dayKey === localDay(today);
              const isSelected = dayKey === localDay(selectedDay);
              return (
                <button
                  key={dayKey}
                  ref={element => { if (element) dateButtons.current.set(dayKey, element); else dateButtons.current.delete(dayKey); }}
                  className={`calendar-date ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                  data-date={dayKey}
                  aria-label={`${day.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}${count ? `, ${count} ${count === 1 ? 'estudio' : 'estudios'}` : ', sin estudios'}`}
                  aria-pressed={isSelected}
                  aria-current={isToday ? 'date' : undefined}
                  onClick={() => selectDate(day)}
                  onKeyDown={event => {
                    const offset = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[event.key];
                    if (offset !== undefined) { event.preventDefault(); selectDate(new Date(day.getFullYear(), day.getMonth(), day.getDate() + offset), true); }
                  }}
                >
                  <span>{index + 1}</span>
                  {count > 0 && <span className="calendar-event-count" aria-hidden="true">{count}<span> {count === 1 ? 'estudio' : 'estudios'}</span></span>}
                </button>
              );
            })}
          </div>
          <p className="calendar-help">Selecciona una fecha. También puedes moverte con las flechas del teclado.</p>
        </section>
        <section className="agenda-list day-agenda" aria-label="Estudios del día seleccionado">
          <div className="day-agenda-heading"><h2>Próximo estudio</h2><p className="selected-day-label" aria-live="polite">{selectedDay.toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}</p></div>
          {meetings.length ? meetings.map(student => (
            <button className="card agenda-meeting" key={student.id} onClick={() => onSelectStudent(student.id)}>
              <span className="agenda-hour"><Clock3 size={18} /><time dateTime={student.nextMeeting}>{timeFormat(student.nextMeeting)} h</time></span>
              <h3>{student.name}</h3>
              <p><BookOpen size={16} />{nextLesson(student) ? `Lección ${nextLesson(student)!.id} · ${nextLesson(student)!.title}` : 'Guía completada'}</p>
              {student.address && <p><MapPin size={16} />{student.address}</p>}
              <span className="text-button">Ver estudio <ArrowRight size={15} /></span>
            </button>
          )) : <div className="card empty-state"><CalendarDays size={30} /><h3>No hay estudios para este día</h3><p>Elige otra fecha o programa un encuentro desde la ficha de un estudiante.</p></div>}
        </section>
      </div>
    </>
  );
}

function StudentForm({ student, onSave, onClose }: { student?: Student; onSave: (student: Student) => Promise<void>; onClose: () => void }) {
  const [value, setValue] = useState<Student>(student || { id: crypto.randomUUID(), name: '', phone: '', email: '', address: '', notes: '', guideId: 'la-fe-de-jesus', status: 'active', nextMeeting: '', completedLessons: [], lessonNotes: {}, createdAt: new Date().toISOString() }); const [busy, setBusy] = useState(false); const [error, setError] = useState('');
  const initialValue = useRef(JSON.stringify(value));
  const dirty = JSON.stringify(value) !== initialValue.current;
  function cancel() { if (!dirty || window.confirm('Tienes cambios sin guardar. ¿Quieres descartarlos y cerrar?')) onClose(); }
  const field = (name: keyof Student, val: string) => setValue(v => ({ ...v, [name]: val }));
  const dateValue = value.nextMeeting ? new Date(new Date(value.nextMeeting).getTime() - new Date(value.nextMeeting).getTimezoneOffset() * 60000).toISOString().slice(0, 16) : '';
  async function submit(e: FormEvent) { e.preventDefault(); if (!value.name.trim()) { setError('Escribe el nombre del estudiante.'); return; } setBusy(true); try { await onSave({ ...value, name: value.name.trim() }); onClose(); } catch { setError('No se pudo guardar. Tus cambios siguen aquí; vuelve a intentarlo.'); } finally { setBusy(false); } }
  return <Modal title={student ? 'Editar estudiante' : 'Un nuevo estudiante'} onClose={onClose} dirty={dirty}><form className="student-form" onSubmit={submit}><p>Cada camino comienza con un primer encuentro.</p><label>Nombre y apellido <span className="required">*</span><input maxLength={120} required autoComplete="name" value={value.name} onChange={e => field('name', e.target.value)} placeholder="¿A quién vas a acompañar?"/></label><div className="form-row"><label>Teléfono<input maxLength={60} type="tel" value={value.phone} onChange={e => field('phone', e.target.value)} placeholder="11 2345 6789"/></label><label>Correo electrónico<input maxLength={254} type="email" value={value.email} onChange={e => field('email', e.target.value)} placeholder="Opcional"/></label></div><label>Dirección o lugar de encuentro<input maxLength={500} value={value.address} onChange={e => field('address', e.target.value)} placeholder="En su casa, en la iglesia, por videollamada…"/></label><div className="form-row"><label>Próximo encuentro<input type="datetime-local" value={dateValue} onChange={e => field('nextMeeting', e.target.value ? new Date(e.target.value).toISOString() : '')}/></label><label>Estado<select value={value.status} onChange={e => field('status', e.target.value)}><option value="active">En camino</option><option value="paused">En pausa</option><option value="completed">Completado</option></select></label></div><label>Guía de estudio<select value={value.guideId} onChange={e => field('guideId', e.target.value)}><option value="la-fe-de-jesus">La fe de Jesús · 20 lecciones</option></select></label><label>Notas iniciales<textarea maxLength={10000} rows={3} value={value.notes} onChange={e => field('notes', e.target.value)} placeholder="Algo que te gustaría recordar de esta persona…"/></label>{error && <p className="notice error" role="alert">{error}</p>}<div className="modal-actions"><button type="button" className="button" onClick={cancel}>Cancelar</button><button className="button primary" disabled={busy}>{busy ? 'Guardando…' : student ? 'Guardar cambios' : 'Agregar estudiante'}</button></div></form></Modal>;
}

function LessonModal({ lesson, student, onClose, onSave }: { lesson: Lesson; student?: Student; onClose: () => void; onSave: (s: Student) => Promise<void> }) {
  const [tab, setTab] = useState<'study'|'keys'|'notes'>('study'); const [note, setNote] = useState(student?.lessonNotes[lesson.id] || ''); const [busy, setBusy] = useState(false); const [feedback, setFeedback] = useState(''); const completed = !!student?.completedLessons.includes(lesson.id);
  async function save(toggle = false) { if (!student) return; setBusy(true); setFeedback(''); try { const completedLessons = toggle ? completed ? student.completedLessons.filter(id => id !== lesson.id) : [...student.completedLessons, lesson.id] : student.completedLessons; await onSave({ ...student, lessonNotes: { ...student.lessonNotes, [lesson.id]: note }, completedLessons, status: completedLessons.length === lessons.length ? 'completed' : student.status === 'completed' && toggle ? 'active' : student.status }); setFeedback(toggle ? completed ? 'Lección marcada como pendiente.' : '¡Un paso más! Lección completada.' : 'Notas guardadas.'); } catch { setFeedback('No se pudo guardar. Vuelve a intentarlo.'); } finally { setBusy(false); } }
  return <Modal title={`Lección ${String(lesson.id).padStart(2, '0')}`} onClose={onClose} wide dirty={note !== (student?.lessonNotes[lesson.id] || '')} actions={<ShareResource title={`La fe de Jesús · Lección ${lesson.id}: ${lesson.title}`} url={lesson.videoUrl} label="Enviar lección" />}><div className="lesson-intro"><span className="eyebrow">LA FE DE JESÚS</span><h2>{lesson.title}</h2><p>{lesson.subtitle}</p><a className="text-button lesson-video-link" href={lesson.videoUrl} target="_blank" rel="noreferrer">Ver video de la lección <ExternalLink size={16}/></a>{student && <span className="student-context"><Users size={15}/> Estudiando con {student.name}</span>}</div><div className="tabs" role="tablist" aria-label="Contenido de la lección"><button role="tab" aria-selected={tab === 'study'} className={tab === 'study' ? 'selected' : ''} onClick={() => setTab('study')}>El estudio</button><button role="tab" aria-selected={tab === 'keys'} className={tab === 'keys' ? 'selected' : ''} onClick={() => setTab('keys')}>Claves y preguntas</button>{student && <button role="tab" aria-selected={tab === 'notes'} className={tab === 'notes' ? 'selected' : ''} onClick={() => setTab('notes')}>Mis notas</button>}</div><div className="lesson-body" role="tabpanel">{tab === 'study' && <><p className="reading-hint"><BookOpen size={18}/> Lean juntos cada referencia en su Biblia.</p>{lesson.questions.map((q, i) => <article className="question" key={i}><span className="question-number">{i + 1}</span><div><h3>{q.question}</h3><span className="reference"><BookOpen size={15}/>{q.reference}</span><details><summary>Ver respuesta orientativa</summary><p>{q.answer}</p></details></div></article>)}<a className="source-link" href={lesson.sourceUrl} target="_blank" rel="noreferrer">Consultar la guía original <ExternalLink size={14}/></a><small className="editorial-note">Apoyo didáctico original basado en los temas de la guía. Las respuestas orientan la conversación y no sustituyen la lectura bíblica.</small></>}{tab === 'keys' && <><h3 className="section-subtitle"><Sprout size={20}/> Lo que queremos recordar</h3><ul className="key-points">{lesson.keyPoints.map((point, i) => <li key={i}><Check size={18}/>{point}</li>)}</ul><h3 className="section-subtitle">Preguntas que pueden surgir</h3>{lesson.faqs.map((faq, i) => <details className="faq" key={i}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</>}{tab === 'notes' && <><h3>Un espacio para recordar</h3><p>Registra preguntas, experiencias o ideas para reforzar en el próximo encuentro con {student?.name.split(' ')[0]}.</p><label>Notas de esta lección<textarea maxLength={10000} rows={8} value={note} onChange={e => setNote(e.target.value)} placeholder="¿Qué le llamó la atención? ¿Qué necesita repasar?"/></label><button className="button primary" onClick={() => save()} disabled={busy}>Guardar notas</button></>}</div>{feedback && <p className="inline-feedback" role="status">{feedback}</p>}{student && <div className="lesson-footer"><span className={`badge ${completed ? 'completed' : ''}`}>{completed ? <CheckCheck size={15}/> : <Clock3 size={15}/>} {completed ? 'Estudio completado' : 'Pendiente de estudiar'}</span><button className={`button ${completed ? '' : 'primary'}`} onClick={() => save(true)} disabled={busy}>{completed ? 'Marcar como pendiente' : <><Check size={18}/>Completar lección</>}</button></div>}</Modal>;
}

export default function App() {
  const [selectedAgendaDay, setSelectedAgendaDay] = useState(() => new Date());
  const [agendaMonth, setAgendaMonth] = useState(() => new Date());
  const [user, setUser] = useState<User | null>(null); const [authReady, setAuthReady] = useState(!auth); const [demo, setDemo] = useState(false); const [view, setView] = useState<'students'|'agenda'|'library'>('students'); const [selectedId, setSelectedId] = useState<string | null>(null); const [query, setQuery] = useState(''); const [filter, setFilter] = useState('all'); const [editing, setEditing] = useState<Student | 'new' | null>(null); const [lessonId, setLessonId] = useState<number | null>(null); const [deleteConfirm, setDeleteConfirm] = useState(false); const [notes, setNotes] = useState(''); const [feedback, setFeedback] = useState(''); const [saving, setSaving] = useState(false);
  const { students, loading, error, saveStudent, deleteStudent } = useStudents(user, demo);
  useEffect(() => { window.scrollTo(0, 0); }, [view, selectedId, user?.uid, demo]);
  useEffect(() => { if (!auth) return; return onAuthStateChanged(auth, u => { setUser(u); setAuthReady(true); if (u) setDemo(false); }); }, []);
  const selected = students.find(s => s.id === selectedId);
  const previousNotes = useRef<{ id?: string; notes?: string }>({});
  useEffect(() => { const before = previousNotes.current; const after = { id: selected?.id, notes: selected?.notes || '' }; setNotes(current => before.id !== after.id || current === (before.notes || '') ? after.notes : current); previousNotes.current = after; }, [selected?.id, selected?.notes]);
  useEffect(() => { const leave = (e: BeforeUnloadEvent) => { if (selected && notes !== selected.notes) e.preventDefault(); }; window.addEventListener('beforeunload', leave); return () => window.removeEventListener('beforeunload', leave); }, [selected, notes]);
  useEffect(() => { if (!feedback) return; const timer = setTimeout(() => setFeedback(''), 4000); return () => clearTimeout(timer); }, [feedback]);
  const active = students.filter(s => s.status === 'active');
  const upcoming = students.filter(s => s.nextMeeting && new Date(s.nextMeeting) >= new Date(new Date().setHours(0, 0, 0, 0)) && s.status === 'active').sort((a, b) => new Date(a.nextMeeting).getTime() - new Date(b.nextMeeting).getTime());
  const filtered = students.filter(s => (filter === 'all' || s.status === filter) && `${s.name} ${s.phone} ${s.email}`.toLowerCase().includes(query.toLowerCase()));
  const todayCount = upcoming.filter(s => localDay(s.nextMeeting) === localDay(new Date())).length;
  const now = new Date();
  function guardNotes() { return !selected || notes === selected.notes || window.confirm('Tienes notas sin guardar. ¿Quieres descartarlas y salir?'); }
  function navigate(next: typeof view) { if (!guardNotes()) return; setView(next); setSelectedId(null); setLessonId(null); }
  async function save(s: Student) { await saveStudent(s); setFeedback('Cambios guardados'); }
  async function signOut() { if (!guardNotes()) return; try { if (user) await logout(); setDemo(false); setSelectedId(null); setView('students'); } catch { setFeedback('No se pudo cerrar sesión. Inténtalo nuevamente.'); } }
  if (!authReady) return <div className="loading-screen"><Brand/><p>Cargando tu espacio…</p></div>;
  if (!user && !demo) return <AuthScreen onDemo={() => setDemo(true)}/>;
  return <div className="app-shell"><aside className="sidebar"><Brand/><div className="workspace-label">TU ESPACIO DE MINISTERIO</div><nav aria-label="Navegación principal"><button className={view === 'students' ? 'active' : ''} onClick={() => navigate('students')}><Users size={21}/><span>Mis estudiantes</span><span className="nav-count">{students.length}</span></button><button className={view === 'agenda' ? 'active' : ''} onClick={() => navigate('agenda')}><CalendarDays size={21}/><span>Mi agenda</span>{todayCount > 0 && <span className="nav-dot"/>}</button><button className={view === 'library' ? 'active' : ''} onClick={() => navigate('library')}><BookOpen size={21}/><span>Guías de estudio</span></button></nav><div className="sidebar-verse"><Sprout size={23}/><p>“Y he aquí yo estoy con vosotros todos los días.”</p><small>MATEO 28:20 · RVR 1909</small></div><div className="profile"><span className="avatar profile-avatar">{demo ? 'DE' : initials(user?.displayName || user?.email || 'IB')}</span><div><strong>{demo ? 'Espacio de ejemplo' : user?.displayName || 'Mi cuenta'}</strong><small>{demo ? 'Modo demostración' : 'Instructor bíblico'}</small></div><button className="icon-button" aria-label={demo ? 'Salir de la demostración' : 'Cerrar sesión'} title={demo ? 'Salir de la demostración' : 'Cerrar sesión'} onClick={signOut}><LogOut size={19}/></button></div></aside><div className="main-shell"><header className="topbar"><div className="breadcrumb"><span>Mi ministerio</span><ChevronRight size={15}/><strong>{selected ? selected.name : view === 'students' ? 'Mis estudiantes' : view === 'agenda' ? 'Mi agenda' : 'Guías de estudio'}</strong></div><span className="topbar-date"><CalendarDays size={16}/>{now.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}</span><button className="icon-button mobile-signout" aria-label={demo ? "Salir de la demostración" : "Cerrar sesión"} onClick={signOut}><LogOut size={19}/></button></header>{demo && <div className="demo-banner"><span><span className="demo-dot"/> Estás explorando una demostración. Los cambios se guardan solo en este dispositivo.</span><button onClick={signOut}>Ingresar a mi cuenta <ArrowRight size={14}/></button></div>}<main className="main-content" id="main-content">{error && <div className="notice error" role="alert">{error}</div>}{loading ? <div className="empty-state"><Sprout size={32}/><h2>Cargando tus estudiantes…</h2></div> : selected ? <><button className="back-link" onClick={() => { if (guardNotes()) setSelectedId(null); }}><ArrowLeft size={17}/> Volver a {view === 'agenda' ? 'mi agenda' : 'mis estudiantes'}</button><div className="detail-heading"><div className="student-title"><span className="avatar large">{initials(selected.name)}</span><div><span className="eyebrow">UN CAMINO DE FE</span><h1>{selected.name}</h1><span className={`badge ${selected.status}`}>{statusLabels[selected.status]}</span></div></div><button className="button" onClick={() => setEditing({ ...selected, notes })}><Pencil size={17}/>Editar estudiante</button></div><div className="detail-grid"><section><div className="guide-progress card"><div><span className="eyebrow">GUÍA DE ESTUDIO</span><h2>La fe de Jesús</h2><p>{selected.completedLessons.length} de {lessons.length} lecciones completadas</p></div><div className="progress-ring" style={{ background: `conic-gradient(var(--ochre) ${progress(selected)}%, var(--line) 0)` }}><span>{progress(selected)}<small>%</small></span></div><div className="progress-track"><span style={{ width: `${progress(selected)}%` }}/></div></div><div className="section-heading lesson-list-heading"><h2>Pasos en su estudio</h2><span>{lessons.length} lecciones</span></div><div className="lesson-list">{lessons.map(l => { const done = selected.completedLessons.includes(l.id); const next = nextLesson(selected)?.id === l.id; return <button key={l.id} className={`lesson-row ${done ? 'done' : next ? 'next' : 'pending'}`} onClick={() => setLessonId(l.id)}><span className="lesson-index">{done ? <Check size={18}/> : String(l.id).padStart(2, '0')}</span><span className="lesson-text"><strong>{l.title}</strong><small>{done ? 'Completada' : next ? 'Siguiente encuentro' : 'Pendiente'}{selected.lessonNotes[l.id] ? ' · Con notas' : ''}</small></span>{next && <span className="next-label">SIGUIENTE</span>}<ChevronRight size={18}/></button>; })}</div></section><aside className="detail-aside"><section className="card next-meeting"><div className="section-heading"><h3>Próximo encuentro</h3><CalendarDays size={19}/></div>{selected.nextMeeting ? <><p className="meeting-date">{dateFormat(selected.nextMeeting, true)}</p><span className="meeting-time"><Clock3 size={17}/>{timeFormat(selected.nextMeeting)} h</span></> : <p>Todavía no hay un encuentro programado.</p>}{selected.address && <p className="contact-line"><MapPin size={16}/>{selected.address}</p>}<button className="text-button" onClick={() => setEditing({ ...selected, notes })}>{selected.nextMeeting ? 'Cambiar encuentro' : 'Programar encuentro'}<ArrowRight size={15}/></button></section><section className="card"><h3>Datos de contacto</h3>{selected.phone ? <a className="contact-line" href={`tel:${selected.phone.replace(/[^+\d]/g, '')}`}>{selected.phone}</a> : <p className="muted">Sin teléfono registrado</p>}{selected.email && <a className="contact-line" href={`mailto:${selected.email}`}><Mail size={16}/>{selected.email}</a>}</section><section className="card notes-card"><h3><StickyNote size={19}/>Notas personales</h3><p>Pequeños detalles que ayudan a acompañar mejor.</p><label className="sr-only" htmlFor="general-notes">Notas generales de {selected.name}</label><textarea id="general-notes" maxLength={10000} rows={7} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Motivos de oración, intereses, dudas para retomar…"/><button className="button full" disabled={saving || notes === selected.notes} onClick={async () => { setSaving(true); try { await save({ ...selected, notes }); } catch { setFeedback('No se pudo guardar. Inténtalo otra vez.'); } finally { setSaving(false); } }}>{saving ? 'Guardando…' : 'Guardar notas'}</button></section><button className="text-button danger delete-student" onClick={() => setDeleteConfirm(true)}><Trash2 size={15}/>Eliminar estudiante</button></aside></div></> : view === 'students' ? <>
        <h1 className="sr-only">Mis estudiantes</h1>
        <div className="students-toolbar">
          <label className="search-field"><Search size={18}/><input aria-label="Buscar estudiantes" placeholder="Buscar estudiante…" value={query} onChange={e => setQuery(e.target.value)}/>{query && <button className="icon-button" onClick={() => setQuery('')} aria-label="Limpiar búsqueda"><X size={16}/></button>}</label>
          <button className="button primary" onClick={() => setEditing('new')}><Plus size={19}/>Nuevo estudiante</button>
        </div>
        <div className="stats"><div><span className="stat-icon"><Users size={21}/></span><div><strong>{active.length}</strong><span>Estudiantes en camino</span></div></div><div><span className="stat-icon"><CalendarDays size={21}/></span><div><strong>{todayCount}<small>{todayCount === 1 ? ' encuentro' : ' encuentros'}</small></strong><span>Para acompañar hoy</span></div></div><div><span className="stat-icon"><BookOpen size={21}/></span><div><strong>{students.reduce((n, s) => n + s.completedLessons.length, 0)}</strong><span>Lecciones compartidas</span></div></div></div><div className="dashboard-grid"><section className="student-section"><div className="section-heading"><h2>Personas que acompañas <span className="count-label">{students.length}</span></h2><LayoutGrid size={18}/></div><div className="list-controls"><label className="filter-select"><span className="sr-only">Filtrar estudiantes por estado</span><select value={filter} onChange={e => setFilter(e.target.value)}><option value="all">Todos los estados</option><option value="active">En camino</option><option value="paused">En pausa</option><option value="completed">Completados</option></select></label></div>{filtered.length ? <div className="student-grid">{filtered.map((s, i) => <button className="student-card" key={s.id} onClick={() => setSelectedId(s.id)}><div className="student-card-top"><span className={`avatar avatar-${i % 3}`}>{initials(s.name)}</span><span className={`badge ${s.status}`}>{statusLabels[s.status]}</span></div><h3>{s.name}</h3><p className="student-guide"><BookOpen size={14}/>La fe de Jesús</p><div className="card-progress-label"><span>{s.completedLessons.length === lessons.length ? '¡Guía completada!' : `Lección ${String(nextLesson(s)?.id || 1).padStart(2, '0')} · ${nextLesson(s)?.title || ''}`}</span><strong>{progress(s)}%</strong></div><div className="progress-track"><span style={{ width: `${progress(s)}%` }}/></div><div className="student-card-bottom"><span><CalendarDays size={15}/>{s.nextMeeting ? `${dateFormat(s.nextMeeting)} · ${timeFormat(s.nextMeeting)} h` : 'Coordinar próximo encuentro'}</span><ArrowRight size={17}/></div></button>)}</div> : <div className="empty-state"><Users size={32}/><h3>{query || filter !== 'all' ? 'No encontramos estudiantes' : 'Tu primer encuentro empieza aquí'}</h3><p>{query || filter !== 'all' ? 'Prueba con otro nombre o cambia el filtro.' : 'Agrega una persona para acompañar su estudio de la Biblia.'}</p>{!query && filter === 'all' && <button className="button primary" onClick={() => setEditing('new')}><Plus size={17}/>Agregar estudiante</button>}</div>}</section><aside className="dashboard-aside"><section className="upcoming-card card"><div className="section-heading"><h3>Próximos encuentros</h3><CalendarDays size={18}/></div>{upcoming.length ? upcoming.slice(0, 3).map(s => <button className="upcoming-item" key={s.id} onClick={() => { setView('agenda'); setSelectedId(s.id); }}><span className="date-tile"><small>{new Date(s.nextMeeting).toLocaleDateString('es-AR', { month: 'short' }).replace('.', '')}</small><strong>{new Date(s.nextMeeting).getDate()}</strong></span><span><strong>{s.name}</strong><small>{timeFormat(s.nextMeeting)} h · Lección {nextLesson(s)?.id || 'finalizada'}</small></span><ChevronRight size={15}/></button>) : <div className="small-empty"><CalendarDays size={26}/><p>Un espacio para tu próximo encuentro.</p><small>Programa una fecha en la ficha de un estudiante.</small></div>}<button className="text-button" onClick={() => navigate('agenda')}>Ver mi agenda<ArrowRight size={15}/></button></section></aside></div></> : view === 'agenda' ? <CalendarAgenda students={students} selectedDay={selectedAgendaDay} setSelectedDay={setSelectedAgendaDay} month={agendaMonth} setMonth={setAgendaMonth} onSelectStudent={setSelectedId} onSchedule={() => { navigate('students'); setFeedback('Abre un estudiante y elige «Programar encuentro».'); }}/> : <><div className="page-heading"><div><span className="eyebrow">LA BIBLIA, EN EL CENTRO</span><h1>Guías de estudio</h1><p>Recursos para preparar conversaciones que dejan huella.</p></div><span className="library-count">1 guía disponible</span></div><section className="library-hero"><div className="book-cover"><span>EDICIÓN DSA 2020</span><BookOpen size={63} strokeWidth={1}/><h2>La fe<br/>de Jesús</h2><div className="book-rule"/><small>UNA VIDA CON PROPÓSITO</small></div><div><span className="eyebrow">TU GUÍA PARA ACOMPAÑAR</span><h2>La fe de Jesús</h2><p>Un recorrido por las enseñanzas fundamentales de la Biblia, pensado para descubrir la fe en conversación.</p><div className="guide-metadata"><span><BookOpen size={17}/>{lessons.length} lecciones</span><span><Users size={17}/>Estudio personal y acompañado</span></div><p className="editorial-note">{guide.edition}. {guide.description}</p><a className="text-button" href={guide.sourceUrl} target="_blank" rel="noreferrer">Consultar fuente original <ExternalLink size={16}/></a></div></section><section className="intro-video card"><div><span className="eyebrow">ANTES DEL PRIMER ESTUDIO</span><h2>Introducción a La fe de Jesús</h2><p>Comparte este video para dar el primer paso juntos.</p><a className="text-button" href={guide.introVideoUrl} target="_blank" rel="noreferrer">Ver video de introducción <ExternalLink size={16}/></a></div><ShareResource title="La fe de Jesús · Introducción" url={guide.introVideoUrl} label="Enviar introducción" /></section><div className="section-heading"><h2>Un recorrido, paso a paso</h2><span>Elige una lección para prepararla</span></div><div className="library-lessons">{lessons.map(l => <button className="library-lesson" key={l.id} onClick={() => setLessonId(l.id)}><span>{String(l.id).padStart(2, '0')}</span><div><h3>{l.title}</h3><small>{l.questions.length} preguntas · Referencias bíblicas</small></div><ArrowRight size={17}/></button>)}</div><div className="library-bottom"><Feather size={21}/><p>Seguiremos sumando nuevas guías para acompañar cada etapa del camino.</p></div></>}<footer className="page-footer"><span>Instructor Bíblico Pro</span><span>Acompañar con propósito.</span><Sprout size={16}/></footer></main></div>{feedback && <div className="toast" role="status"><Check size={18}/>{feedback}</div>}{editing && <StudentForm student={editing === 'new' ? undefined : editing} onClose={() => setEditing(null)} onSave={save}/>} {lessonId !== null && lessons.find(l => l.id === lessonId) && <LessonModal lesson={lessons.find(l => l.id === lessonId)!} student={selected} onClose={() => setLessonId(null)} onSave={save}/>} {deleteConfirm && selected && <Modal title="Eliminar estudiante" onClose={() => setDeleteConfirm(false)}><div className="confirm-body"><p>¿Quieres eliminar a <strong>{selected.name}</strong>? Se eliminarán su progreso, encuentros y notas. Esta acción no se puede deshacer.</p><div className="modal-actions"><button className="button" onClick={() => setDeleteConfirm(false)}>Conservar estudiante</button><button className="button danger-button" disabled={saving} onClick={async () => { setSaving(true); try { await deleteStudent(selected.id); setDeleteConfirm(false); setSelectedId(null); setFeedback('Estudiante eliminado'); } catch { setFeedback('No se pudo eliminar. Inténtalo nuevamente.'); } finally { setSaving(false); } }}>Eliminar estudiante</button></div></div></Modal>}</div>;
}
