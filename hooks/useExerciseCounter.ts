import { useState, useCallback, useRef } from 'react';
import { EXERCISES } from '@/constants/exercises';

export interface ExerciseCounterState {
  repCount: number;
  remainingReps: number;
  isComplete: boolean;
  isDetecting: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
  addManualRep: () => void;
}

export function useExerciseCounter(exerciseId: string): ExerciseCounterState {
  const exercise = EXERCISES.find(e => e.id === exerciseId);
  const targetReps = exercise?.targetReps || 20;

  const [repCount, setRepCount] = useState(0);
  const [isDetecting, setIsDetecting] = useState(false);
  const isDetectingRef = useRef(false);

  const remainingReps = Math.max(0, targetReps - repCount);
  const isComplete = remainingReps === 0;

  const start = useCallback(() => {
    setIsDetecting(true);
    isDetectingRef.current = true;
  }, []);

  const stop = useCallback(() => {
    setIsDetecting(false);
    isDetectingRef.current = false;
  }, []);

  const reset = useCallback(() => {
    setRepCount(0);
    setIsDetecting(false);
    isDetectingRef.current = false;
  }, []);

  const addManualRep = useCallback(() => {
    setRepCount(prev => {
      const next = prev + 1;
      if (next >= targetReps) {
        setIsDetecting(false);
        isDetectingRef.current = false;
      }
      return next;
    });
  }, [targetReps]);

  return {
    repCount,
    remainingReps,
    isComplete,
    isDetecting,
    start,
    stop,
    reset,
    addManualRep,
  };
}
