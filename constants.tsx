
import { SymbolItem, Student } from './types';

export const AAC_SYMBOLS: SymbolItem[] = [
  // --- ROOT LEVEL ---
  { id: 'want', label: 'I want', category: 'Root', icon: 'front_hand', color: 'text-primary', parentId: 'root', isCategory: true },
  { id: 'feel', label: 'I feel', category: 'Root', icon: 'mood', color: 'text-amber-500', parentId: 'root', isCategory: true },
  { id: 'action', label: 'Actions', category: 'Root', icon: 'directions_run', color: 'text-green-500', parentId: 'root', isCategory: true },
  { id: 'help', label: 'Help', category: 'Root', icon: 'medical_services', color: 'text-red-500', parentId: 'root' },
  { id: 'toilet', label: 'Toilet', category: 'Root', icon: 'wc', color: 'text-blue-400', parentId: 'root' },

  // --- I WANT -> SUB-CATEGORIES ---
  { id: 'cat_fruits', label: 'Fruits', category: 'Want', icon: 'nutrition', color: 'text-orange-500', parentId: 'want', isCategory: true },
  { id: 'cat_food', label: 'Food', category: 'Want', icon: 'restaurant', color: 'text-yellow-600', parentId: 'want', isCategory: true },
  { id: 'cat_toys', label: 'Toys', category: 'Want', icon: 'smart_toy', color: 'text-purple-500', parentId: 'want', isCategory: true },
  { id: 'cat_drinks', label: 'Drinks', category: 'Want', icon: 'local_drink', color: 'text-blue-500', parentId: 'want', isCategory: true },

  // --- I WANT -> FRUITS ---
  { id: 'apple', label: 'Apple', category: 'Fruits', icon: 'apple', color: 'text-red-600', parentId: 'cat_fruits' },
  { id: 'banana', label: 'Banana', category: 'Fruits', icon: 'eco', color: 'text-yellow-400', parentId: 'cat_fruits' },
  { id: 'grapes', label: 'Grapes', category: 'Fruits', icon: 'grain', color: 'text-purple-600', parentId: 'cat_fruits' },

  // --- I WANT -> FOOD ---
  { id: 'pizza', label: 'Pizza', category: 'Food', icon: 'local_pizza', color: 'text-orange-400', parentId: 'cat_food' },
  { id: 'pasta', label: 'Pasta', category: 'Food', icon: 'dinner_dining', color: 'text-yellow-700', parentId: 'cat_food' },
  { id: 'sandwich', label: 'Sandwich', category: 'Food', icon: 'lunch_dining', color: 'text-amber-800', parentId: 'cat_food' },

  // --- I FEEL -> ITEMS ---
  { id: 'happy', label: 'Happy', category: 'Feelings', icon: 'mood', color: 'text-yellow-500', parentId: 'feel' },
  { id: 'sad', label: 'Sad', category: 'Feelings', icon: 'mood_bad', color: 'text-blue-500', parentId: 'feel' },
  { id: 'angry', label: 'Angry', category: 'Feelings', icon: 'sentiment_very_dissatisfied', color: 'text-red-600', parentId: 'feel' },
  { id: 'sleepy', label: 'Sleepy', category: 'Feelings', icon: 'bedtime', color: 'text-indigo-400', parentId: 'feel' },
  { id: 'scared', label: 'Scared', category: 'Feelings', icon: 'error', color: 'text-slate-500', parentId: 'feel' },

  // --- ACTIONS -> ITEMS ---
  { id: 'play', label: 'Play', category: 'Actions', icon: 'sports_esports', color: 'text-purple-400', parentId: 'action' },
  { id: 'stop', label: 'Stop', category: 'Actions', icon: 'stop_circle', color: 'text-red-500', parentId: 'action' },
  { id: 'more', label: 'More', category: 'Actions', icon: 'add_circle', color: 'text-primary', parentId: 'action' },
  { id: 'go', label: 'Go', category: 'Actions', icon: 'directions_walk', color: 'text-green-600', parentId: 'action' },
];

export const CATEGORIES = ['Main', 'Actions', 'Feelings', 'People', 'Places'];

export const MOCK_STUDENTS: Student[] = [
  {
    id: 's1',
    name: 'Jamie L.',
    age: 7,
    diagnosis: 'Speech Delay / ASD',
    avatar: 'https://picsum.photos/seed/jamie/200',
    progress: 72,
    lastSession: 'Oct 24, 2023',
    goals: [
      { id: 'g1', title: 'Sentence structure', progress: 60 },
      { id: 'g2', title: "Pronunciation of 'S' sounds", progress: 45 }
    ]
  },
  {
    id: 's2',
    name: 'Liam M.',
    age: 5,
    diagnosis: 'Social Interaction',
    avatar: 'https://picsum.photos/seed/liam/200',
    progress: 85,
    lastSession: 'Oct 22, 2023',
    goals: [
      { id: 'g3', title: 'Eye contact', progress: 90 },
      { id: 'g4', title: 'Requesting help', progress: 80 }
    ]
  }
];
