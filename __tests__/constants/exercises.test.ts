import {
  EXERCISES,
  getExerciseById,
  getExercisesByCategory,
  getExercisesByDifficulty,
  Exercise,
} from '@/constants/exercises';

describe('EXERCISES constant', () => {
  it('contains at least one exercise', () => {
    expect(EXERCISES.length).toBeGreaterThan(0);
  });

  it('has unique IDs for every exercise', () => {
    const ids = EXERCISES.map(e => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every exercise has the required fields', () => {
    for (const ex of EXERCISES) {
      expect(typeof ex.id).toBe('string');
      expect(typeof ex.name).toBe('string');
      expect(typeof ex.description).toBe('string');
      expect(typeof ex.targetReps).toBe('number');
      expect(typeof ex.targetSets).toBe('number');
      expect(['portrait', 'landscape']).toContain(ex.orientation);
      expect(['strength', 'cardio', 'flexibility']).toContain(ex.category);
      expect(['beginner', 'intermediate', 'advanced']).toContain(ex.difficulty);
    }
  });

  it('has positive targetReps and targetSets for all exercises', () => {
    for (const ex of EXERCISES) {
      expect(ex.targetReps).toBeGreaterThan(0);
      expect(ex.targetSets).toBeGreaterThan(0);
    }
  });
});

describe('getExerciseById', () => {
  it('returns the correct exercise for a known ID', () => {
    const ex = getExerciseById('overhead');
    expect(ex).toBeDefined();
    expect(ex!.name).toBe('Overhead Press');
  });

  it('returns undefined for an unknown ID', () => {
    expect(getExerciseById('nonexistent')).toBeUndefined();
  });

  it('returns the correct exercise for every ID in the list', () => {
    for (const ex of EXERCISES) {
      expect(getExerciseById(ex.id)).toBe(ex);
    }
  });
});

describe('getExercisesByCategory', () => {
  it('returns only strength exercises', () => {
    const results = getExercisesByCategory('strength');
    expect(results.length).toBeGreaterThan(0);
    for (const ex of results) {
      expect(ex.category).toBe('strength');
    }
  });

  it('returns only cardio exercises', () => {
    const results = getExercisesByCategory('cardio');
    expect(results.length).toBeGreaterThan(0);
    for (const ex of results) {
      expect(ex.category).toBe('cardio');
    }
  });

  it('returns an empty array for a category with no exercises', () => {
    const results = getExercisesByCategory('flexibility');
    expect(results).toEqual([]);
  });
});

describe('getExercisesByDifficulty', () => {
  it('returns only beginner exercises', () => {
    const results = getExercisesByDifficulty('beginner');
    expect(results.length).toBeGreaterThan(0);
    for (const ex of results) {
      expect(ex.difficulty).toBe('beginner');
    }
  });

  it('returns only intermediate exercises', () => {
    const results = getExercisesByDifficulty('intermediate');
    expect(results.length).toBeGreaterThan(0);
    for (const ex of results) {
      expect(ex.difficulty).toBe('intermediate');
    }
  });

  it('returns an empty array for a difficulty with no exercises', () => {
    const results = getExercisesByDifficulty('advanced');
    expect(results).toEqual([]);
  });
});
