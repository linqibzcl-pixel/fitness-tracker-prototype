import type { ExerciseId } from './exercises';

export interface SetRecord {
  reps: number;
  timestamp: Date;
}

export interface SavedSession {
  id: string;
  endedAt: string;
  durationSec: number;
  /** 次数合计或秒数合计（由 exerciseId 对应动作的 mode 决定） */
  totalReps: number;
  sets: { reps: number; at: string }[];
  weightKg: number;
  caloriesEstimate: number;
  /** 训练动作；旧数据缺省视为深蹲 */
  exerciseId?: string;
}

export interface DayRecord {
  date: string;
  reps: number;
  sets: number;
  calories: number;
}

/** 单组完成时的结构化历史，独立于日历用的 DayRecord 聚合 */
export interface TrainingHistoryEntry {
  id: string;
  timestamp: string;
  exerciseId: string;
  mode: 'reps' | 'time';
  completedValue: number;
  targetValue: number;
  completed: boolean;
  estimatedKcal: number;
  weightKg: number;
}

export interface WorkoutPersistedState {
  sessions: SavedSession[];
  lifetimeDurationSec: number;
  weightKg: number;
  lastExerciseId?: ExerciseId;
  trainingHistory?: TrainingHistoryEntry[];
}
