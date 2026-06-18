import { getFeedbackMessage } from '@/utils/getFeedbackMessage';

const baseParams = {
  isPaused: false,
  remainingReps: 10,
  repCount: 0,
  isDetecting: false,
  exerciseId: 'overhead',
};

describe('getFeedbackMessage', () => {
  it('returns Paused when isPaused is true', () => {
    expect(getFeedbackMessage({ ...baseParams, isPaused: true })).toBe('Paused');
  });

  it('returns Set complete! when remainingReps is 0', () => {
    expect(getFeedbackMessage({ ...baseParams, remainingReps: 0 })).toBe('Set complete!');
  });

  it('returns rep count when reps are done', () => {
    expect(getFeedbackMessage({ ...baseParams, repCount: 5 })).toBe('Rep 5!');
  });

  it('returns Get ready! when not detecting', () => {
    expect(getFeedbackMessage(baseParams)).toBe('Get ready!');
  });

  it('returns exercise-specific prompt when detecting with 0 reps', () => {
    const detecting = { ...baseParams, isDetecting: true };
    expect(getFeedbackMessage({ ...detecting, exerciseId: 'overhead' })).toBe('Lift up!');
    expect(getFeedbackMessage({ ...detecting, exerciseId: 'seatedSquats' })).toBe('Sit back');
    expect(getFeedbackMessage({ ...detecting, exerciseId: 'situps' })).toBe('Lift up');
    expect(getFeedbackMessage({ ...detecting, exerciseId: 'walking' })).toBe('Start walking');
    expect(getFeedbackMessage({ ...detecting, exerciseId: 'marching' })).toBe('Start marching');
  });

  it('returns Detecting motion... for unknown exercise', () => {
    expect(
      getFeedbackMessage({ ...baseParams, isDetecting: true, exerciseId: 'unknown' })
    ).toBe('Detecting motion...');
  });

  it('prioritizes isPaused over other conditions', () => {
    expect(
      getFeedbackMessage({ ...baseParams, isPaused: true, remainingReps: 0, repCount: 10 })
    ).toBe('Paused');
  });
});
