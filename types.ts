
export type UserRole = 'Child' | 'Parent' | 'Therapist' | 'Admin';

export interface SymbolItem {
  id: string;
  label: string;
  category: string;
  icon: string;
  color: string;
  parentId: string | null;
  isCategory?: boolean;
}

export interface Student {
  id: string;
  name: string;
  age: number;
  diagnosis: string;
  avatar: string;
  progress: number;
  lastSession: string;
  goals: Goal[];
}

export interface Goal {
  id: string;
  title: string;
  progress: number;
}

export interface SessionNote {
  id: string;
  date: string;
  content: string;
}
