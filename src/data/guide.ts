import type { Lesson } from '../types';

const sourceUrl = 'https://downloads.adventistas.org/es/ministerio-personal/estudios-biblicos/guia-interactiva-la-fe-de-jesus/';
const pdf = (id: number) => `https://s3.amazonaws.com/deptos.adventistas.org/ministeriopersonal/estudio_biblico/interactivo/fe_de_jesus/${String(id).padStart(2, '0')}_leccion.pdf`;

export const guide = {
  id: 'la-fe-de-jesus',
  title: 'La fe de Jesús',
  edition: 'Guía interactiva · División Sudamericana · 2020 · 20 estudios',
  description: 'Apuntes de acompañamiento redactados para esta app, organizados según la guía interactiva oficial de 20 estudios. Las preguntas, respuestas y sugerencias son una adaptación de apoyo; consultá el material original enlazado en cada tema.',
  sourceUrl,
};

// Contenido de apoyo original. No reproduce íntegramente el cuestionario editorial.
// El orden corresponde a los PDF de la edición DSA de 2020, no a otras ediciones.
export const lessons: Lesson[] = [
  {
    id: 1, title: 'La Biblia', subtitle: 'Una palabra para conocer a Jesús y orientar la vida.',
    questions: [
      { question: '¿Qué aporta la Escritura a nuestro crecimiento?', reference: '2 Timoteo 3:15-17', answer: 'Nos conduce a la salvación en Cristo, enseña y forma para hacer el bien.' },
      { question: '¿Cuál es el centro del testimonio bíblico?', reference: 'Juan 5:39; Juan 20:31', answer: 'Jesús. La lectura busca una relación de fe con él, no solamente reunir información.' },
      { question: '¿Cómo abordar un pasaje difícil?', reference: 'Hechos 17:11; Lucas 24:27', answer: 'Leer su contexto, compararlo con otros pasajes y examinar con atención lo que se enseña.' },
      { question: '¿Cómo llevar la lectura a la práctica?', reference: 'Santiago 1:22', answer: 'Elegir una enseñanza concreta y responder con una acción durante la semana.' },
    ],
    keyPoints: ['Cristo es el centro de la lectura.', 'Leer el contexto antes de sacar conclusiones.', 'Escuchar, comprender y practicar.'],
    faqs: [
      { question: '¿Por dónde puedo comenzar?', answer: 'Un Evangelio permite conocer a Jesús. Leé un pasaje breve y anotá una pregunta para conversar.' },
      { question: '¿Está mal tener preguntas?', answer: 'No. Registrarlas y estudiarlas con paciencia ayuda a construir una fe comprendida.' },
    ], sourceUrl: pdf(1),
  },
  {
    id: 2, title: 'Dios', subtitle: 'Conocer al Padre que nos ama.',
    questions: [
      { question: '¿Cómo describe la Biblia el carácter de Dios?', reference: '1 Juan 4:8-10', answer: 'Su carácter es amor; la misión de Jesús expresa ese amor hacia nosotros.' },
      { question: '¿Qué revela Jesús acerca del Padre?', reference: 'Juan 14:8-9', answer: 'Su vida nos permite conocer la bondad y el carácter del Padre.' },
      { question: '¿Cómo aparece Dios en el bautismo cristiano?', reference: 'Mateo 28:19', answer: 'El mandato reúne al Padre, al Hijo y al Espíritu Santo. Los adventistas creen en un solo Dios en tres personas.' },
      { question: '¿Podemos acercarnos con nuestras preocupaciones?', reference: '1 Pedro 5:7', answer: 'Sí. Podemos confiarlas a Dios porque se interesa personalmente por nosotros.' },
    ],
    keyPoints: ['Dios se da a conocer en Jesús.', 'Padre, Hijo y Espíritu Santo.', 'Su amor invita a una relación de confianza.'],
    faqs: [
      { question: '¿Necesito entender todo para creer?', answer: 'La confianza puede crecer mientras estudiamos. Las preguntas sinceras tienen lugar en el camino de fe.' },
      { question: '¿Dios se interesa por mi vida cotidiana?', answer: 'Sí. Compartí también tus alegrías, decisiones y necesidades, no solo las situaciones difíciles.' },
    ], sourceUrl: pdf(2),
  },
  {
    id: 3, title: 'La oración y la fe', subtitle: 'Conversar con Dios con confianza y sinceridad.',
    questions: [
      { question: '¿Qué actitud enseña Jesús al orar?', reference: 'Mateo 6:6-8', answer: 'Sinceridad ante el Padre, sin exhibición ni repetición vacía.' },
      { question: '¿Qué podemos incluir en una oración?', reference: 'Mateo 6:9-13', answer: 'Adoración, entrega, necesidades, perdón y ayuda frente a la tentación.' },
      { question: '¿Cómo enfrentar la inquietud?', reference: 'Filipenses 4:6-7', answer: 'Presentar nuestras peticiones con gratitud y recibir la paz de Dios en Cristo.' },
      { question: '¿Cómo crece la fe?', reference: 'Romanos 10:17', answer: 'Al escuchar el mensaje de Cristo y aprender a confiar en él.' },
    ],
    keyPoints: ['Orar es abrir el corazón.', 'La fe confía también durante la espera.', 'Reservar un momento cotidiano.'],
    faqs: [
      { question: '¿Debo usar palabras especiales?', answer: 'Podés hablar con tus propias palabras. La sinceridad importa más que la elocuencia.' },
      { question: '¿Toda petición se cumple como espero?', answer: 'No. Jesús enseñó a buscar la voluntad del Padre; una demora no demuestra falta de fe (Mateo 26:39).' },
    ], sourceUrl: pdf(3),
  },
  {
    id: 4, title: 'El origen del mal', subtitle: 'Comprender el conflicto y elegir el bien.',
    questions: [
      { question: '¿A quién identifica Apocalipsis como engañador?', reference: 'Apocalipsis 12:7-9', answer: 'A Satanás, adversario de Dios y responsable de engañar al mundo.' },
      { question: '¿Qué ocurrió cuando la humanidad desconfió de Dios?', reference: 'Génesis 3:1-13', answer: 'La desobediencia trajo vergüenza, temor y ruptura de relaciones.' },
      { question: '¿Es Dios quien nos induce al mal?', reference: 'Santiago 1:13-17', answer: 'No. El pasaje distingue la tentación del carácter bueno y generoso de Dios.' },
      { question: '¿Cómo responder ante la tentación?', reference: 'Santiago 4:7-8', answer: 'Acercarnos a Dios, someternos a su dirección y resistir al mal.' },
    ],
    keyPoints: ['El mal contradice el carácter de Dios.', 'La libertad implica responsabilidad.', 'Buscar ayuda y resistir en Cristo.'],
    faqs: [
      { question: '¿Todo sufrimiento es un castigo personal?', answer: 'No. Jesús rechazó esa explicación simplista ante un hombre ciego (Juan 9:1-3).' },
      { question: '¿Terminará el sufrimiento?', answer: 'La esperanza bíblica anuncia una creación restaurada sin muerte ni dolor (Apocalipsis 21:4).' },
    ], sourceUrl: pdf(4),
  },
  {
    id: 5, title: 'La salvación', subtitle: 'Recibir el regalo de una vida nueva en Cristo.',
    questions: [
      { question: '¿Cuál es nuestra necesidad compartida?', reference: 'Romanos 3:23', answer: 'Todos necesitamos la gracia de Dios porque el pecado alcanza a toda la humanidad.' },
      { question: '¿Cómo respondió Dios a esa necesidad?', reference: 'Juan 3:16-17', answer: 'Envió a su Hijo para salvar y ofrecer vida eterna a quienes creen.' },
      { question: '¿Podemos ganar la salvación con méritos?', reference: 'Efesios 2:8-10', answer: 'Es un regalo recibido por fe. Las buenas obras son fruto de esa nueva vida.' },
      { question: '¿Qué hizo Jesús por nosotros?', reference: 'Romanos 5:8; 1 Corintios 15:3-4', answer: 'Murió por nuestros pecados y resucitó; su victoria sostiene nuestra esperanza.' },
    ],
    keyPoints: ['La iniciativa es del amor de Dios.', 'Salvación por gracia mediante la fe.', 'La gratitud se expresa en una vida transformada.'],
    faqs: [
      { question: '¿Debo cambiar antes de acercarme?', answer: 'Jesús invita a venir a él. Su gracia nos recibe y nos ayuda a cambiar (Mateo 11:28).' },
      { question: '¿La fe elimina la obediencia?', answer: 'No. Una relación viva con Cristo produce amor y servicio; no compra su aceptación.' },
    ], sourceUrl: pdf(5),
  },
  {
    id: 6, title: 'El perdón', subtitle: 'Volver a empezar con una conciencia en paz.',
    questions: [
      { question: '¿Qué podemos hacer cuando reconocemos una falta?', reference: '1 Juan 1:9', answer: 'Confesarla a Dios con sinceridad y confiar en su perdón y limpieza.' },
      { question: '¿Qué diferencia al arrepentimiento de una excusa?', reference: 'Proverbios 28:13', answer: 'Reconoce el daño y busca abandonar la conducta, en lugar de ocultarla.' },
      { question: '¿Quién intercede por quien ha pecado?', reference: '1 Juan 2:1-2', answer: 'Jesucristo es nuestro abogado y la base de nuestra reconciliación con Dios.' },
      { question: '¿Qué respuesta inspira el perdón recibido?', reference: 'Efesios 4:32', answer: 'Tratar al prójimo con bondad y aprender a perdonar.' },
    ],
    keyPoints: ['Confesar sin justificar el daño.', 'Confiar en la gracia de Cristo.', 'Reparar lo posible y buscar un cambio real.'],
    faqs: [
      { question: '¿Y si todavía siento culpa?', answer: 'Los sentimientos pueden tardar. Volvé a la promesa y conversá con alguien de confianza.' },
      { question: '¿Perdonar significa permitir más daño?', answer: 'No. El perdón es compatible con límites, protección y responsabilidad por las consecuencias.' },
    ], sourceUrl: pdf(6),
  },
  {
    id: 7, title: 'La segunda venida de Jesús', subtitle: 'Una esperanza para vivir el presente.',
    questions: [
      { question: '¿Qué futuro promete Jesús a sus discípulos?', reference: 'Juan 14:1-3', answer: 'Volverá para reunirlos consigo; su promesa responde al temor con esperanza.' },
      { question: '¿Cómo describe la Biblia su regreso?', reference: 'Hechos 1:9-11; Apocalipsis 1:7', answer: 'Como un regreso personal y visible, no una presencia secreta.' },
      { question: '¿Qué sucederá con quienes murieron en Cristo?', reference: '1 Tesalonicenses 4:16-17', answer: 'Resucitarán y se reunirán con los creyentes vivos para estar con el Señor.' },
      { question: '¿Cómo influye esta esperanza en la vida?', reference: 'Tito 2:11-13', answer: 'Nos anima a vivir con sensatez, justicia y fidelidad mientras esperamos.' },
    ],
    keyPoints: ['Jesús cumplirá su promesa.', 'Regreso visible y glorioso.', 'Esperar con servicio y esperanza.'],
    faqs: [
      { question: '¿Podemos calcular una fecha?', answer: 'No. Jesús afirmó que no conocemos el día ni la hora (Mateo 24:36).' },
      { question: '¿Esperar significa abandonar proyectos?', answer: 'No. La fidelidad cotidiana y el cuidado de otros forman parte de una espera activa.' },
    ], sourceUrl: pdf(7),
  },
  {
    id: 8, title: 'Las señales de su regreso', subtitle: 'Discernir con serenidad y mantener la esperanza.',
    questions: [
      { question: '¿Qué advertencia abre el discurso de Jesús?', reference: 'Mateo 24:4-6', answer: 'Cuidarnos del engaño y no dejarnos dominar por el miedo ante noticias alarmantes.' },
      { question: '¿Qué misión acompaña la espera?', reference: 'Mateo 24:14', answer: 'Compartir el evangelio con todos los pueblos.' },
      { question: '¿Conocemos el momento exacto?', reference: 'Mateo 24:36, 42', answer: 'No. La respuesta es estar atentos, no establecer fechas.' },
      { question: '¿Qué significa velar en la práctica?', reference: 'Mateo 24:45-46', answer: 'Ser responsables y cuidar fielmente a quienes nos fueron confiados.' },
    ],
    keyPoints: ['Discernimiento antes que alarmismo.', 'Evitar fechas y predicciones sensacionalistas.', 'Compartir esperanza y servir hoy.'],
    faqs: [
      { question: '¿Cada noticia cumple una profecía?', answer: 'No conviene asociarlas automáticamente. Leé el contexto bíblico y verificá la información.' },
      { question: '¿Cómo estudiar este tema sin temor?', answer: 'Poné el foco en Jesús, su promesa y el servicio. Anotá dudas para abordarlas con calma.' },
    ], sourceUrl: pdf(8),
  },
  {
    id: 9, title: 'La muerte y la resurrección', subtitle: 'Consuelo ante la pérdida, esperanza en Jesús.',
    questions: [
      { question: '¿De dónde proviene la vida humana?', reference: 'Génesis 2:7', answer: 'Dios forma al ser humano y le da aliento; la vida es su regalo.' },
      { question: '¿Cómo se describe la conciencia de los muertos?', reference: 'Eclesiastés 9:5-6', answer: 'Los adventistas entienden este pasaje como ausencia de conciencia durante la muerte.' },
      { question: '¿Qué imagen usó Jesús al hablar de Lázaro?', reference: 'Juan 11:11-14', answer: 'Comparó la muerte con un sueño, del que lo despertaría.' },
      { question: '¿En qué se apoya nuestra esperanza?', reference: 'Juan 11:25; 1 Tesalonicenses 4:13-18', answer: 'En Jesús y la resurrección cuando regrese. Esa promesa permite acompañarnos en el duelo.' },
    ],
    keyPoints: ['La vida depende de Dios.', 'La muerte es un descanso hasta la resurrección.', 'Acompañar el duelo con ternura.'],
    faqs: [
      { question: '¿Tener esperanza impide llorar?', answer: 'No. Jesús también lloró ante una pérdida (Juan 11:35). El dolor necesita tiempo y compañía.' },
      { question: '¿Debemos buscar contacto con los muertos?', answer: 'La Biblia lo desaconseja; invita a buscar dirección en Dios (Deuteronomio 18:10-12).' },
    ], sourceUrl: pdf(9),
  },
  {
    id: 10, title: 'El juicio de Dios', subtitle: 'Justicia y confianza en nuestro Salvador.',
    questions: [
      { question: '¿Quedan ocultas las injusticias para siempre?', reference: 'Eclesiastés 12:14', answer: 'Dios tomará en cuenta toda obra; también conoce lo que otros no ven.' },
      { question: '¿Quién ocupa el centro del juicio?', reference: 'Juan 5:22', answer: 'El Padre confió el juicio al Hijo, nuestro Salvador.' },
      { question: '¿Qué ayuda ofrece Cristo?', reference: '1 Juan 2:1; Hebreos 7:25', answer: 'Intercede por quienes se acercan a Dios por medio de él.' },
      { question: '¿Cómo responder al anuncio del juicio?', reference: 'Apocalipsis 14:6-7', answer: 'Recibir el evangelio y adorar al Creador con una vida que lo honre.' },
    ],
    keyPoints: ['Dios hace justicia con pleno conocimiento.', 'Cristo es Salvador e intercesor.', 'La gracia nos llama a una vida responsable.'],
    faqs: [
      { question: '¿El juicio contradice la gracia?', answer: 'No. La confianza descansa en Cristo, y la vida muestra nuestra respuesta a su gracia.' },
      { question: '¿Debo vivir aterrorizado?', answer: 'Jesús invita a confiar en su promesa de vida (Juan 5:24). Estudiá este tema desde esa seguridad.' },
    ], sourceUrl: pdf(10),
  },
  {
    id: 11, title: 'La ley de Dios', subtitle: 'El amor expresado en nuestra manera de vivir.',
    questions: [
      { question: '¿Qué relaciones orientan los Diez Mandamientos?', reference: 'Éxodo 20:1-17', answer: 'Nuestra relación con Dios y con las demás personas.' },
      { question: '¿Cómo resume Jesús la voluntad de Dios?', reference: 'Mateo 22:37-40', answer: 'Amar a Dios con todo el ser y al prójimo como a uno mismo.' },
      { question: '¿Qué relación hay entre amor y obediencia?', reference: 'Juan 14:15', answer: 'La obediencia nace de amar a Jesús y escuchar su enseñanza.' },
      { question: '¿La ley puede salvarnos?', reference: 'Romanos 3:20; Efesios 2:8-10', answer: 'Revela el pecado; la salvación viene por gracia. Obedecemos como respuesta agradecida.' },
    ],
    keyPoints: ['El amor da sentido a la obediencia.', 'Los mandamientos protegen relaciones.', 'La gracia transforma desde el corazón.'],
    faqs: [
      { question: '¿Basta con cumplir por fuera?', answer: 'Jesús también atiende las intenciones del corazón, como muestra Mateo 5:21-28.' },
      { question: '¿Qué hago si vuelvo a fallar?', answer: 'Acercate a Cristo, reconocé la falta y buscá ayuda para crecer. El fracaso no termina su invitación.' },
    ], sourceUrl: pdf(11),
  },
  {
    id: 12, title: 'El sábado', subtitle: 'Un regalo de descanso, encuentro y adoración.',
    questions: [
      { question: '¿Dónde comienza el descanso del séptimo día?', reference: 'Génesis 2:1-3', answer: 'En la creación: Dios descansó, bendijo y apartó el séptimo día.' },
      { question: '¿Qué recuerda el cuarto mandamiento?', reference: 'Éxodo 20:8-11', answer: 'Apartar el sábado para Dios, recordándolo como Creador y dando descanso a todos.' },
      { question: '¿Para quién se hizo el sábado?', reference: 'Marcos 2:27-28', answer: 'Para beneficio humano; Jesús es Señor del sábado.' },
      { question: '¿Qué ejemplo encontramos en Jesús?', reference: 'Lucas 4:16', answer: 'Se reunía para adorar y escuchar la Escritura en sábado.' },
    ],
    keyPoints: ['El séptimo día es el sábado.', 'Un tiempo dedicado a Dios y al prójimo.', 'El descanso expresa confianza.'],
    faqs: [
      { question: '¿Guardar el sábado compra la salvación?', answer: 'No. Es una respuesta de amor a Dios, que nos salva por gracia.' },
      { question: '¿Cómo comenzar si trabajo ese día?', answer: 'Conversá con tu instructor y explorá opciones reales de organización y diálogo, sin presiones ni decisiones apresuradas.' },
    ], sourceUrl: pdf(12),
  },
  {
    id: 13, title: 'Cómo vivir el sábado', subtitle: 'Preparar un tiempo de paz y misericordia.',
    questions: [
      { question: '¿Cómo ayuda la preparación anticipada?', reference: 'Éxodo 16:22-23', answer: 'Organizar las tareas antes permite dedicar el sábado al descanso y al encuentro con Dios.' },
      { question: '¿Qué principio bíblico orienta sus límites?', reference: 'Levítico 23:32; Marcos 1:32', answer: 'El cómputo de tarde a tarde orienta la práctica adventista: del ocaso del viernes al del sábado.' },
      { question: '¿Qué lugar tiene hacer el bien?', reference: 'Mateo 12:9-12', answer: 'Es apropiado atender necesidades y aliviar el sufrimiento también en sábado.' },
      { question: '¿Qué actitud propone Isaías?', reference: 'Isaías 58:13-14', answer: 'Vivir este tiempo como alegría y honra a Dios.' },
    ],
    keyPoints: ['Preparar con anticipación.', 'Adorar, descansar y compartir.', 'La misericordia forma parte del descanso.'],
    faqs: [
      { question: '¿Qué podemos hacer en familia?', answer: 'Orar, leer, compartir alimentos, pasear en la naturaleza y visitar a alguien que necesite compañía.' },
      { question: '¿Qué pasa ante una urgencia?', answer: 'La enseñanza de Jesús pone en valor ayudar y preservar la vida. Acompañá la necesidad con responsabilidad.' },
    ], sourceUrl: pdf(13),
  },
  {
    id: 14, title: 'La iglesia de Cristo', subtitle: 'Crecer en una comunidad de fe y servicio.',
    questions: [
      { question: '¿Quién sostiene a la iglesia?', reference: 'Efesios 2:19-22', answer: 'Jesucristo es su piedra principal; los creyentes forman juntos una familia espiritual.' },
      { question: '¿Qué hábitos tenía la primera comunidad?', reference: 'Hechos 2:42-47', answer: 'Aprender, orar, compartir y atender las necesidades de los demás.' },
      { question: '¿Cómo se reconoce el discipulado?', reference: 'Juan 13:34-35', answer: 'Por el amor mutuo, visible en la manera de relacionarse.' },
      { question: '¿Qué misión recibe la iglesia?', reference: 'Mateo 28:18-20; Apocalipsis 14:6-12', answer: 'Formar discípulos y compartir el evangelio. Los adventistas vinculan su misión con los mensajes de Apocalipsis 14.' },
    ],
    keyPoints: ['Cristo es el fundamento.', 'Aprender y servir en comunidad.', 'La identidad se expresa en amor y fidelidad.'],
    faqs: [
      { question: '¿Puedo asistir antes de bautizarme?', answer: 'Sí. Podés participar, conocer la comunidad y hacer preguntas durante tu proceso de estudio.' },
      { question: '¿Por qué hay personas imperfectas?', answer: 'La iglesia reúne personas que necesitan gracia y crecimiento. Los errores deben reconocerse y repararse.' },
    ], sourceUrl: pdf(14),
  },
  {
    id: 15, title: 'El bautismo', subtitle: 'Una decisión consciente de seguir a Jesús.',
    questions: [
      { question: '¿Qué ejemplo dejó Jesús?', reference: 'Mateo 3:13-17', answer: 'Fue bautizado al comenzar su ministerio público.' },
      { question: '¿Qué representa el bautismo?', reference: 'Romanos 6:3-4', answer: 'La unión con la muerte y resurrección de Cristo para comenzar una vida nueva.' },
      { question: '¿Qué preparación acompaña esa decisión?', reference: 'Hechos 2:37-38; Mateo 28:19-20', answer: 'Escuchar el evangelio, arrepentirse y aprender a seguir a Jesús.' },
      { question: '¿Por qué los adventistas bautizan por inmersión?', reference: 'Hechos 8:36-39; Romanos 6:4', answer: 'Reconocen en ella el ejemplo bíblico y el símbolo de sepultura y nueva vida.' },
    ],
    keyPoints: ['Una respuesta personal y libre.', 'Fe, arrepentimiento y aprendizaje.', 'El comienzo de un camino acompañado.'],
    faqs: [
      { question: '¿Debo ser perfecto para bautizarme?', answer: 'No. Se busca una fe comprendida y el deseo sincero de seguir creciendo con Cristo.' },
      { question: '¿Quién puede ayudarme a prepararme?', answer: 'Tu instructor y el pastor pueden revisar tus preguntas y acompañar la decisión, respetando tu libertad.' },
    ], sourceUrl: pdf(15),
  },
  {
    id: 16, title: 'La vida cristiana', subtitle: 'Seguir creciendo después de la decisión.',
    questions: [
      { question: '¿Qué novedad trae nuestra unión con Cristo?', reference: '2 Corintios 5:17', answer: 'Una nueva identidad y orientación de vida.' },
      { question: '¿Cómo permanecemos unidos a Jesús?', reference: 'Juan 15:4-5', answer: 'Dependiendo de él diariamente; el fruto nace de esa relación.' },
      { question: '¿Qué fruto produce el Espíritu?', reference: 'Gálatas 5:22-23', answer: 'Amor, alegría, paz y un carácter paciente, bondadoso y dueño de sí.' },
      { question: '¿Cómo contribuye la comunidad?', reference: 'Hebreos 10:24-25', answer: 'Nos anima a perseverar, amar y realizar buenas obras.' },
    ],
    keyPoints: ['El crecimiento continúa toda la vida.', 'Crear hábitos de oración y lectura.', 'Servir según los dones recibidos.'],
    faqs: [
      { question: '¿Qué hacer después del curso?', answer: 'Acordá un plan de acompañamiento: estudio, participación comunitaria y una oportunidad de servicio.' },
      { question: '¿Y si el cambio parece lento?', answer: 'La madurez es un proceso. Reconocé pequeños avances y confiá en la obra de Dios (Filipenses 1:6).' },
    ], sourceUrl: pdf(16),
  },
  {
    id: 17, title: 'Salud y estilo de vida', subtitle: 'Cuidar integralmente la vida que recibimos.',
    questions: [
      { question: '¿Qué valor tiene nuestro cuerpo?', reference: '1 Corintios 6:19-20', answer: 'Pertenece a Dios y merece respeto y cuidado.' },
      { question: '¿Qué principio orienta las decisiones cotidianas?', reference: '1 Corintios 10:31', answer: 'Comer, beber y actuar procurando honrar a Dios.' },
      { question: '¿Qué enseña la Biblia sobre el alcohol?', reference: 'Proverbios 20:1', answer: 'Advierte de su capacidad de engañar y descontrolar. Los adventistas promueven la abstinencia.' },
      { question: '¿Qué distinción alimentaria estudia la guía?', reference: 'Levítico 11:1-23', answer: 'La distinción bíblica entre animales limpios e inmundos, incluida en la práctica alimentaria adventista.' },
    ],
    keyPoints: ['Cuidar cuerpo, mente y relaciones.', 'Practicar hábitos sostenibles.', 'Acompañar sin juzgar la salud de otros.'],
    faqs: [
      { question: '¿Una enfermedad indica poca fe?', answer: 'No. Evitá culpar a quien está enfermo; necesita cuidado y compañía.' },
      { question: '¿El estudio reemplaza la atención médica?', answer: 'No. Para cambios relacionados con tratamientos o condiciones de salud, consultá al profesional que te atiende.' },
    ], sourceUrl: pdf(17),
  },
  {
    id: 18, title: 'Administrar con Dios', subtitle: 'Gratitud y generosidad con lo que recibimos.',
    questions: [
      { question: '¿Cómo cambia nuestra mirada sobre las posesiones?', reference: 'Salmos 24:1', answer: 'Reconocemos a Dios como dueño y a nosotros como responsables de cuidar sus regalos.' },
      { question: '¿Qué enseña la Biblia acerca del diezmo?', reference: 'Levítico 27:30; Malaquías 3:10', answer: 'Lo presenta como una porción apartada para Dios; diezmo significa la décima parte.' },
      { question: '¿Qué actitud debe acompañar la generosidad?', reference: '2 Corintios 9:7', answer: 'Una decisión de corazón y con alegría, sin presión.' },
      { question: '¿La administración incluye más que dinero?', reference: '1 Pedro 4:10', answer: 'Sí. También administramos capacidades y oportunidades de servicio.' },
    ],
    keyPoints: ['Administrar con gratitud y responsabilidad.', 'Distinguir diezmos y ofrendas.', 'Respetar decisiones personales y evitar presiones.'],
    faqs: [
      { question: '¿Ofrendar garantiza riqueza?', answer: 'No. La generosidad expresa confianza y solidaridad; no es una transacción para obtener prosperidad.' },
      { question: '¿Cómo aprender la práctica local?', answer: 'Pedí a la iglesia información clara sobre destino, administración y rendición de cuentas de los recursos.' },
    ], sourceUrl: pdf(18),
  },
  {
    id: 19, title: 'El don de profecía', subtitle: 'Discernir los dones a la luz de la Biblia.',
    questions: [
      { question: '¿Para qué concede Dios dones a la iglesia?', reference: 'Efesios 4:11-13', answer: 'Para capacitar para el servicio y ayudar a la comunidad a madurar en Cristo.' },
      { question: '¿Cómo debemos recibir una afirmación profética?', reference: '1 Tesalonicenses 5:19-21', answer: 'Sin despreciarla automáticamente, pero examinándolo todo y reteniendo lo bueno.' },
      { question: '¿Qué criterio ofrece la Escritura?', reference: 'Isaías 8:20; 1 Juan 4:1-3', answer: 'Comparar la enseñanza con la revelación de Dios y su testimonio acerca de Cristo.' },
      { question: '¿Qué otros aspectos ayudan a discernir?', reference: 'Mateo 7:15-20', answer: 'Examinar los frutos de la vida y del mensaje, no solo sus afirmaciones.' },
    ],
    keyPoints: ['La Biblia es la norma de evaluación.', 'Los dones sirven a la comunidad.', 'Los adventistas reconocen este don en Elena de White.'],
    faqs: [
      { question: '¿Sus escritos sustituyen la Biblia?', answer: 'No. La posición adventista mantiene a la Biblia como norma de fe y criterio para toda enseñanza.' },
      { question: '¿Cómo comenzar a conocer su obra?', answer: 'Leé un texto centrado en Cristo y contrastá sus referencias bíblicas con tu instructor.' },
    ], sourceUrl: pdf(19),
  },
  {
    id: 20, title: 'Una respuesta personal', subtitle: 'Elegir el próximo paso con fe y libertad.',
    questions: [
      { question: '¿Qué invitación personal hace Jesús?', reference: 'Apocalipsis 3:20', answer: 'Recibirlo y vivir en comunión con él.' },
      { question: '¿Cómo responder a lo aprendido?', reference: 'Hechos 2:37-41', answer: 'Con arrepentimiento, fe y una decisión consciente de incorporarse a la comunidad mediante el bautismo.' },
      { question: '¿Cómo contar lo que Dios ha hecho?', reference: 'Marcos 5:19', answer: 'Compartiendo con sencillez nuestra experiencia con quienes nos rodean.' },
      { question: '¿Con qué ayuda contamos para continuar?', reference: 'Mateo 28:20; Filipenses 1:6', answer: 'Con la presencia de Cristo y su obra paciente en nuestra vida.' },
    ],
    keyPoints: ['Repasar las preguntas pendientes.', 'Respetar el ritmo y la libertad personal.', 'Acordar acompañamiento y un próximo paso.'],
    faqs: [
      { question: '¿Qué pasa si aún tengo dudas?', answer: 'Anotalas y acordá encuentros para estudiarlas. Una decisión de fe necesita comprensión y libertad.' },
      { question: '¿El seguimiento termina aquí?', answer: 'No. El instructor puede continuar acompañando la integración, el crecimiento espiritual y el servicio.' },
    ], sourceUrl: pdf(20),
  },
];
