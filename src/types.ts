export interface Student {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  guideId: string;
  status: 'active' | 'paused' | 'completed';
  nextMeeting: string;
  completedLessons: number[];
  lessonNotes: Record<string, string>;
  createdAt: string;
}

export interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  questions: { question: string; reference: string; answer: string }[];
  keyPoints: string[];
  faqs: { question: string; answer: string }[];
  sourceUrl: string;
}
