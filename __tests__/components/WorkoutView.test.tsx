import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react-native';
import { WorkoutView } from '@/components/WorkoutView';

jest.mock('expo-router', () => ({
  router: {
    back: jest.fn(),
  },
}));

jest.mock('expo-screen-orientation', () => ({
  lockAsync: jest.fn(),
  unlockAsync: jest.fn(),
  OrientationLock: {
    LANDSCAPE: 'LANDSCAPE',
    PORTRAIT: 'PORTRAIT',
  },
}));

jest.mock('@/components/LiveCoaching', () => {
  const { Text } = require('react-native');
  return {
    LiveCoaching: ({ message }: { message: string }) => (
      <Text testID="mock-live-coaching">{message}</Text>
    ),
  };
});

jest.mock('@/components/ProgressRing', () => {
  const { View } = require('react-native');
  return {
    ProgressRing: () => <View testID="mock-progress-ring" />,
  };
});

jest.mock('@/components/RepCounterNew', () => {
  const { Text } = require('react-native');
  return {
    RepCounterNew: ({ repsLeft, repsDone }: { repsLeft: number; repsDone: number }) => (
      <Text testID="mock-rep-counter">{repsLeft} left, {repsDone} done</Text>
    ),
  };
});

jest.mock('@/components/MotivationText', () => {
  const { Text } = require('react-native');
  return {
    MotivationText: ({ message }: { message: string }) => (
      <Text testID="mock-motivation-text">{message}</Text>
    ),
  };
});

jest.mock('@/components/SetIndicator', () => {
  const { Text } = require('react-native');
  return {
    SetIndicator: ({ currentSet, totalSets }: { currentSet: number; totalSets: number }) => (
      <Text testID="mock-set-indicator">{currentSet}/{totalSets}</Text>
    ),
  };
});

jest.mock('@/components/StatsRow', () => {
  const { Text } = require('react-native');
  return {
    StatsRow: ({ done, target }: { done: number; target: number }) => (
      <Text testID="mock-stats-row">{done}/{target}</Text>
    ),
  };
});

jest.mock('@/components/CelebrationModal', () => {
  const { View, Text } = require('react-native');
  return {
    CelebrationModal: ({ visible, exerciseName }: { visible: boolean; exerciseName: string }) => (
      visible ? <View testID="mock-celebration"><Text>{exerciseName}</Text></View> : null
    ),
  };
});

const mockStart = jest.fn();
const mockStop = jest.fn();
const mockReset = jest.fn();
const mockAddManualRep = jest.fn();

let mockCounterState = {
  repCount: 0,
  remainingReps: 12,
  isComplete: false,
  isDetecting: false,
  start: mockStart,
  stop: mockStop,
  reset: mockReset,
  addManualRep: mockAddManualRep,
};

jest.mock('@/hooks/useExerciseCounter', () => ({
  useExerciseCounter: () => mockCounterState,
}));

describe('WorkoutView - portrait mode (overhead)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCounterState = {
      repCount: 0,
      remainingReps: 12,
      isComplete: false,
      isDetecting: false,
      start: mockStart,
      stop: mockStop,
      reset: mockReset,
      addManualRep: mockAddManualRep,
    };
  });

  it('renders the exercise name in the header', () => {
    render(<WorkoutView exerciseId="overhead" />);
    expect(screen.getByText('Overhead Press')).toBeTruthy();
  });

  it('calls start on mount', () => {
    render(<WorkoutView exerciseId="overhead" />);
    expect(mockStart).toHaveBeenCalled();
  });

  it('renders the sub-components', () => {
    render(<WorkoutView exerciseId="overhead" />);
    expect(screen.getByTestId('mock-set-indicator')).toBeTruthy();
    expect(screen.getByTestId('mock-progress-ring')).toBeTruthy();
    expect(screen.getByTestId('mock-rep-counter')).toBeTruthy();
    expect(screen.getByTestId('mock-motivation-text')).toBeTruthy();
    expect(screen.getByTestId('mock-stats-row')).toBeTruthy();
  });

  it('shows Get ready! when not detecting and no reps done', () => {
    render(<WorkoutView exerciseId="overhead" />);
    expect(screen.getByTestId('mock-motivation-text')).toHaveTextContent('Get ready!');
  });

  it('navigates back when back button is pressed', () => {
    const { router } = require('expo-router');
    render(<WorkoutView exerciseId="overhead" />);
    const backButton = screen.getByText('←');
    fireEvent.press(backButton);
    expect(mockStop).toHaveBeenCalled();
    expect(router.back).toHaveBeenCalled();
  });

  it('does not show celebration modal when not complete', () => {
    render(<WorkoutView exerciseId="overhead" />);
    expect(screen.queryByTestId('mock-celebration')).toBeNull();
  });

  it('shows celebration modal when exercise is complete', () => {
    mockCounterState = {
      ...mockCounterState,
      isComplete: true,
      repCount: 12,
      remainingReps: 0,
    };
    render(<WorkoutView exerciseId="overhead" />);
    expect(screen.getByTestId('mock-celebration')).toBeTruthy();
  });
});

describe('WorkoutView - landscape mode (seatedSquats)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCounterState = {
      repCount: 0,
      remainingReps: 15,
      isComplete: false,
      isDetecting: false,
      start: mockStart,
      stop: mockStop,
      reset: mockReset,
      addManualRep: mockAddManualRep,
    };
  });

  it('renders landscape layout for landscape exercises', () => {
    render(<WorkoutView exerciseId="seatedSquats" />);
    expect(screen.getByText('LIVE COACH')).toBeTruthy();
  });

  it('renders the exercise name with emoji in landscape', () => {
    render(<WorkoutView exerciseId="seatedSquats" />);
    expect(screen.getByText(/Seated Squats/)).toBeTruthy();
  });

  it('renders a back button in landscape mode', () => {
    render(<WorkoutView exerciseId="seatedSquats" />);
    const backButtons = screen.getAllByText('←');
    expect(backButtons.length).toBeGreaterThan(0);
  });

  it('locks to landscape orientation', () => {
    const ScreenOrientation = require('expo-screen-orientation');
    render(<WorkoutView exerciseId="seatedSquats" />);
    expect(ScreenOrientation.lockAsync).toHaveBeenCalledWith('LANDSCAPE');
  });
});

describe('WorkoutView - feedback messages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows Paused when paused', () => {
    mockCounterState = {
      ...mockCounterState,
      repCount: 0,
      remainingReps: 12,
      isComplete: false,
      isDetecting: true,
    };
    render(<WorkoutView exerciseId="overhead" />);
    // Press pause button
    const pauseButton = screen.getByText('⏸');
    fireEvent.press(pauseButton);
    expect(screen.getByTestId('mock-motivation-text')).toHaveTextContent('Paused');
  });

  it('shows Set complete! when remainingReps is 0', () => {
    mockCounterState = {
      ...mockCounterState,
      repCount: 12,
      remainingReps: 0,
      isComplete: false,
      isDetecting: true,
    };
    render(<WorkoutView exerciseId="overhead" />);
    expect(screen.getByTestId('mock-motivation-text')).toHaveTextContent('Set complete!');
  });

  it('shows rep count when reps are done', () => {
    mockCounterState = {
      ...mockCounterState,
      repCount: 5,
      remainingReps: 7,
      isComplete: false,
      isDetecting: true,
    };
    render(<WorkoutView exerciseId="overhead" />);
    expect(screen.getByTestId('mock-motivation-text')).toHaveTextContent('Rep 5!');
  });

  it('shows exercise-specific messages when detecting with 0 reps', () => {
    mockCounterState = {
      ...mockCounterState,
      repCount: 0,
      remainingReps: 12,
      isComplete: false,
      isDetecting: true,
    };

    const { unmount } = render(<WorkoutView exerciseId="overhead" />);
    expect(screen.getByTestId('mock-motivation-text')).toHaveTextContent('Lift up!');
    unmount();
  });

  it('shows Sit back for seatedSquats when detecting', () => {
    mockCounterState = {
      ...mockCounterState,
      repCount: 0,
      remainingReps: 15,
      isComplete: false,
      isDetecting: true,
    };
    render(<WorkoutView exerciseId="seatedSquats" />);
    expect(screen.getByTestId('mock-live-coaching')).toHaveTextContent('Sit back');
  });

  it('shows Detecting motion... for unknown exercise when detecting', () => {
    mockCounterState = {
      ...mockCounterState,
      repCount: 0,
      remainingReps: 20,
      isComplete: false,
      isDetecting: true,
    };
    render(<WorkoutView exerciseId="unknownExercise" />);
    expect(screen.getByTestId('mock-motivation-text')).toHaveTextContent('Detecting motion...');
  });
});

describe('WorkoutView - pause/resume', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCounterState = {
      repCount: 0,
      remainingReps: 12,
      isComplete: false,
      isDetecting: true,
      start: mockStart,
      stop: mockStop,
      reset: mockReset,
      addManualRep: mockAddManualRep,
    };
  });

  it('pauses when pause button is pressed', () => {
    render(<WorkoutView exerciseId="overhead" />);
    const pauseButton = screen.getByText('⏸');
    fireEvent.press(pauseButton);
    expect(mockStop).toHaveBeenCalled();
  });

  it('shows play button after pausing', () => {
    render(<WorkoutView exerciseId="overhead" />);
    fireEvent.press(screen.getByText('⏸'));
    expect(screen.getByText('▶')).toBeTruthy();
  });

  it('resumes when play button is pressed after pause', () => {
    render(<WorkoutView exerciseId="overhead" />);
    fireEvent.press(screen.getByText('⏸'));
    fireEvent.press(screen.getByText('▶'));
    expect(mockStart).toHaveBeenCalled();
  });
});
