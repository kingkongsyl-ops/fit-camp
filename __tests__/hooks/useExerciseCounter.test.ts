import { renderHook, act } from '@testing-library/react-native';
import { useExerciseCounter } from '@/hooks/useExerciseCounter';

describe('useExerciseCounter', () => {
  describe('initial state', () => {
    it('starts with repCount 0', () => {
      const { result } = renderHook(() => useExerciseCounter('overhead'));
      expect(result.current.repCount).toBe(0);
    });

    it('starts with remainingReps equal to targetReps', () => {
      const { result } = renderHook(() => useExerciseCounter('overhead'));
      // overhead has targetReps = 12
      expect(result.current.remainingReps).toBe(12);
    });

    it('starts as not complete', () => {
      const { result } = renderHook(() => useExerciseCounter('overhead'));
      expect(result.current.isComplete).toBe(false);
    });

    it('starts as not detecting', () => {
      const { result } = renderHook(() => useExerciseCounter('overhead'));
      expect(result.current.isDetecting).toBe(false);
    });

    it('uses default targetReps of 20 for unknown exercise', () => {
      const { result } = renderHook(() => useExerciseCounter('unknown'));
      expect(result.current.remainingReps).toBe(20);
    });
  });

  describe('start and stop', () => {
    it('sets isDetecting to true on start', () => {
      const { result } = renderHook(() => useExerciseCounter('overhead'));
      act(() => result.current.start());
      expect(result.current.isDetecting).toBe(true);
    });

    it('sets isDetecting to false on stop', () => {
      const { result } = renderHook(() => useExerciseCounter('overhead'));
      act(() => result.current.start());
      act(() => result.current.stop());
      expect(result.current.isDetecting).toBe(false);
    });
  });

  describe('addManualRep', () => {
    it('increments repCount by 1', () => {
      const { result } = renderHook(() => useExerciseCounter('overhead'));
      act(() => result.current.addManualRep());
      expect(result.current.repCount).toBe(1);
      expect(result.current.remainingReps).toBe(11);
    });

    it('decrements remainingReps correctly', () => {
      const { result } = renderHook(() => useExerciseCounter('overhead'));
      act(() => result.current.addManualRep());
      act(() => result.current.addManualRep());
      act(() => result.current.addManualRep());
      expect(result.current.repCount).toBe(3);
      expect(result.current.remainingReps).toBe(9);
    });

    it('marks as complete when all reps are done', () => {
      // overhead has targetReps = 12
      const { result } = renderHook(() => useExerciseCounter('overhead'));
      for (let i = 0; i < 12; i++) {
        act(() => result.current.addManualRep());
      }
      expect(result.current.repCount).toBe(12);
      expect(result.current.remainingReps).toBe(0);
      expect(result.current.isComplete).toBe(true);
    });

    it('stops detecting when exercise is complete', () => {
      const { result } = renderHook(() => useExerciseCounter('overhead'));
      act(() => result.current.start());
      expect(result.current.isDetecting).toBe(true);
      for (let i = 0; i < 12; i++) {
        act(() => result.current.addManualRep());
      }
      expect(result.current.isDetecting).toBe(false);
    });

    it('does not go below 0 remainingReps', () => {
      const { result } = renderHook(() => useExerciseCounter('overhead'));
      for (let i = 0; i < 15; i++) {
        act(() => result.current.addManualRep());
      }
      expect(result.current.remainingReps).toBe(0);
    });
  });

  describe('reset', () => {
    it('resets repCount to 0', () => {
      const { result } = renderHook(() => useExerciseCounter('overhead'));
      act(() => result.current.addManualRep());
      act(() => result.current.addManualRep());
      act(() => result.current.reset());
      expect(result.current.repCount).toBe(0);
      expect(result.current.remainingReps).toBe(12);
    });

    it('resets isDetecting to false', () => {
      const { result } = renderHook(() => useExerciseCounter('overhead'));
      act(() => result.current.start());
      act(() => result.current.reset());
      expect(result.current.isDetecting).toBe(false);
    });

    it('resets isComplete to false', () => {
      const { result } = renderHook(() => useExerciseCounter('overhead'));
      for (let i = 0; i < 12; i++) {
        act(() => result.current.addManualRep());
      }
      expect(result.current.isComplete).toBe(true);
      act(() => result.current.reset());
      expect(result.current.isComplete).toBe(false);
    });
  });
});
