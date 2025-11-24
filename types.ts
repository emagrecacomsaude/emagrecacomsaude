
export enum AppTab {
  HOME = 'HOME',
  GUIDE = 'GUIDE',
  TABATA = 'TABATA',
  CALCULATOR = 'CALCULATOR',
  COACH = 'COACH',
  WATER = 'WATER'
}

export interface DailyMission {
  id: string;
  label: string;
  completed: boolean;
  xpReward: number;
}

export interface WeightGoal {
  current: number;
  target: number;
  start: number;
}

export interface WaterTracker {
  dailyGoal: number; // in ml
  consumed: number; // in cups (250ml approx)
  cupSize: number; // ml
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  daysInApp: number;
  lastLoginDate: string;
  sectionsRead: string[];
  calculationsDone: number;
  missions: DailyMission[];
  weight: WeightGoal;
  water: WaterTracker;
  startDate?: number; // Timestamp for the counter start (resettable)
  joinDate?: number; // Timestamp for first ever access (permanent)
}

export type CategoryType = 
  | 'tea' 
  | 'recipe' 
  | 'food' 
  | 'water' 
  | 'breakfast' 
  | 'avoid' 
  | 'sleep' 
  | 'tabata' 
  | 'bonus';

export interface GuideSection {
  id: string;
  title: string;
  subtitle?: string;
  category: CategoryType;
  icon: string; // Emoji or Lucide icon name
  content: string; // Markdown-like content
  image?: string; // Optional image placeholder
}

export interface CalculatorData {
  gender: 'male' | 'female';
  age: number | '';
  weight: number | ''; // kg
  height: number | ''; // cm
  activityLevel: number;
  goal: 'cut' | 'maintain' | 'bulk';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}
