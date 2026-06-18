interface FeedbackMessageParams {
  isPaused: boolean;
  remainingReps: number;
  repCount: number;
  isDetecting: boolean;
  exerciseId: string;
}

const exercisePrompts: Record<string, string> = {
  overhead: 'Lift up!',
  seatedSquats: 'Sit back',
  situps: 'Lift up',
  walking: 'Start walking',
  marching: 'Start marching',
};

export function getFeedbackMessage({
  isPaused,
  remainingReps,
  repCount,
  isDetecting,
  exerciseId,
}: FeedbackMessageParams): string {
  if (isPaused) return 'Paused';
  if (remainingReps === 0) return 'Set complete!';
  if (repCount > 0) return `Rep ${repCount}!`;
  if (!isDetecting) return 'Get ready!';
  return exercisePrompts[exerciseId] ?? 'Detecting motion...';
}
