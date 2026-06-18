export interface Exercise {
  id: string;
  name: string;
  description: string;
  targetReps: number;
  targetSets: number;
  orientation: 'portrait' | 'landscape';
  category: 'strength' | 'cardio' | 'flexibility';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const EXERCISES: Exercise[] = [
  {
    id: 'overhead',
    name: 'Overhead Press',
    description: 'Press weights overhead with full arm extension',
    targetReps: 12,
    targetSets: 3,
    orientation: 'portrait',
    category: 'strength',
    difficulty: 'intermediate',
  },
  {
    id: 'seatedSquats',
    name: 'Seated Squats',
    description: 'Perform squats from a seated starting position',
    targetReps: 15,
    targetSets: 3,
    orientation: 'landscape',
    category: 'strength',
    difficulty: 'beginner',
  },
  {
    id: 'situps',
    name: 'Sit-Ups',
    description: 'Core strengthening with controlled sit-up motion',
    targetReps: 20,
    targetSets: 3,
    orientation: 'portrait',
    category: 'strength',
    difficulty: 'beginner',
  },
  {
    id: 'walking',
    name: 'Walking',
    description: 'Steady-pace walking exercise',
    targetReps: 100,
    targetSets: 1,
    orientation: 'portrait',
    category: 'cardio',
    difficulty: 'beginner',
  },
  {
    id: 'marching',
    name: 'Marching in Place',
    description: 'High-knee marching exercise',
    targetReps: 30,
    targetSets: 3,
    orientation: 'landscape',
    category: 'cardio',
    difficulty: 'beginner',
  },
];

export function getExerciseById(id: string): Exercise | undefined {
  return EXERCISES.find(e => e.id === id);
}

export function getExercisesByCategory(category: Exercise['category']): Exercise[] {
  return EXERCISES.filter(e => e.category === category);
}

export function getExercisesByDifficulty(difficulty: Exercise['difficulty']): Exercise[] {
  return EXERCISES.filter(e => e.difficulty === difficulty);
}
