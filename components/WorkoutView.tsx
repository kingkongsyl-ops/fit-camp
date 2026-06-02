import { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import { EXERCISES } from '@/constants/exercises';
import { useExerciseCounter } from '@/hooks/useExerciseCounter';
import { LiveCoaching } from '@/components/LiveCoaching';
import { ProgressRing } from '@/components/ProgressRing';
import { RepCounterNew } from '@/components/RepCounterNew';
import { MotivationText } from '@/components/MotivationText';
import { SetIndicator } from '@/components/SetIndicator';
import { StatsRow } from '@/components/StatsRow';
import { CelebrationModal } from '@/components/CelebrationModal';

interface WorkoutViewProps {
  exerciseId: string;
}

export function WorkoutView({ exerciseId }: WorkoutViewProps) {
  const exercise = EXERCISES.find(e => e.id === exerciseId);
  const {
    repCount,
    remainingReps,
    isComplete,
    isDetecting,
    start,
    stop,
    reset,
    addManualRep
  } = useExerciseCounter(exerciseId);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSet, setCurrentSet] = useState(0);
  const [completedSets, setCompletedSets] = useState(0);
  const totalSets = exercise?.targetSets || 3;
  const totalReps = exercise?.targetReps || 20;

  useEffect(() => {
    start();
    return () => stop();
  }, []);

  useEffect(() => {
    const setOrientation = async () => {
      if (exercise?.orientation === 'landscape') {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      } else {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      }
    };

    setOrientation();

    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, [exercise?.orientation]);

  const handleBack = () => {
    stop();
    router.back();
  };

  const handlePauseResume = useCallback(() => {
    if (isPaused) {
      setIsPaused(false);
      start();
    } else {
      setIsPaused(true);
      stop();
    }
  }, [isPaused, start, stop]);

  const getFeedbackMessage = () => {
    if (isPaused) return 'Paused';
    if (remainingReps === 0) return 'Set complete!';
    if (repCount > 0) return `Rep ${repCount}!`;
    if (!isDetecting) return 'Get ready!';

    switch (exerciseId) {
      case 'overhead':
        return 'Lift up!';
      case 'seatedSquats':
        return 'Sit back';
      case 'situps':
        return 'Lift up';
      case 'walking':
        return 'Start walking';
      case 'marching':
        return 'Start marching';
      default:
        return 'Detecting motion...';
    }
  };

  const setProgress = 1 - (remainingReps / totalReps);
  const isLandscape = exercise?.orientation === 'landscape';

  if (isLandscape) {
    return (
      <View style={styles.landscapeContainer}>
        <View style={styles.landscapeMainContent}>
          {/* Left Panel - Live Coaching */}
          <View style={styles.landscapeLeftPanel}>
            <View style={styles.landscapeCoachHeader}>
              <Text style={styles.landscapeCoachTitle}>LIVE COACH</Text>
            </View>
            <View style={styles.landscapeCoachContent}>
              <LiveCoaching message={getFeedbackMessage()} />
            </View>
          </View>

          {/* Right Panel - Rep Counter + Progress Ring */}
          <View style={styles.landscapeRightPanel}>
            <View style={styles.landscapeHeader}>
              <Text style={styles.landscapeExerciseName}>🧘‍♂️ {exercise?.name}</Text>
              <View style={styles.landscapeProgressBarContainer}>
                <View style={styles.landscapeProgressBar}>
                  <View style={[styles.landscapeProgressFill, { width: `${setProgress * 100}%` }]} />
                </View>
                <Text style={styles.landscapeSetProgressText}>Set {currentSet}/{totalSets}</Text>
              </View>
            </View>

            <View style={styles.landscapeCircleContainer}>
              <ProgressRing progress={setProgress} size={180} strokeWidth={8} />
              <View style={styles.landscapeRepCounterOverlay}>
                <RepCounterNew repsLeft={remainingReps} repsDone={repCount} />
              </View>
            </View>

            <View style={styles.landscapeMotivationContainer}>
              <Text style={styles.landscapeMotivationText}>Crushing it! 🏆</Text>
            </View>
          </View>
        </View>

        {/* Bottom Stats Row */}
        <View style={styles.landscapeBottomStatsRow}>
          <View style={styles.landscapeStatItem}>
            <Text style={styles.landscapeStatLabel}>Target</Text>
            <Text style={styles.landscapeStatValue}>{totalReps}</Text>
          </View>
          <View style={styles.landscapeStatItem}>
            <Text style={styles.landscapeStatLabel}>Done</Text>
            <Text style={styles.landscapeStatValue}>{repCount}</Text>
          </View>
          <View style={styles.landscapeStatItem}>
            <Text style={styles.landscapeStatLabel}>Set</Text>
            <Text style={styles.landscapeStatValue}>{currentSet}/{totalSets}</Text>
          </View>
          <TouchableOpacity style={styles.landscapePauseButton} onPress={handlePauseResume}>
            <Text style={styles.landscapePauseButtonText}>{isPaused ? '▶' : '⏸'}</Text>
          </TouchableOpacity>
        </View>

        <CelebrationModal visible={isComplete} exerciseName={exercise?.name || 'Exercise'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{exercise?.name}</Text>
        <TouchableOpacity onPress={handlePauseResume} style={styles.pauseButton}>
          <Text style={styles.pauseButtonText}>{isPaused ? '▶' : '⏸'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.setIndicatorWrapper}>
          <SetIndicator currentSet={currentSet} totalSets={totalSets} />
        </View>

        <View style={styles.counterContainer}>
          <ProgressRing progress={setProgress} size={280} strokeWidth={8} />
          <RepCounterNew repsLeft={remainingReps} repsDone={repCount} />
        </View>

        <View style={styles.motivationWrapper}>
          <MotivationText message={getFeedbackMessage()} />
        </View>

        <View style={styles.statsWrapper}>
          <StatsRow done={repCount} target={totalReps} />
        </View>
      </ScrollView>

      <CelebrationModal visible={isComplete} exerciseName={exercise?.name || 'Exercise'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#020218',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  pauseButton: {
    padding: 8,
  },
  pauseButtonText: {
    fontSize: 28,
    color: '#F97316',
  },
  content: {
    flexGrow: 1,
    padding: 24,
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 40,
  },
  counterContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 32,
  },
  setIndicatorWrapper: {
    marginBottom: 24,
  },
  motivationWrapper: {
    marginBottom: 32,
    marginTop: 8,
  },
  statsWrapper: {
    marginTop: 16,
  },
  statsContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  statsText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  mutedText: {
    fontSize: 12,
    color: '#7D8AA3',
  },
  feedbackContainer: {
    marginBottom: 24,
  },
  feedbackText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#8B5CF6',
  },
  manualButton: {
    backgroundColor: '#6366F1',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 48,
    marginBottom: 12,
    minWidth: 200,
  },
  manualButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  stopButton: {
    backgroundColor: '#2A2A4A',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 48,
    minWidth: 200,
  },
  stopButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  landscapeContainer: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  landscapeMainContent: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
  },
  landscapeLeftPanel: {
    flex: 0.4,
    padding: 16,
    justifyContent: 'flex-start',
    borderRightWidth: 1,
    borderRightColor: '#1E1E2E',
  },
  landscapeRightPanel: {
    flex: 0.6,
    padding: 16,
    justifyContent: 'space-between',
  },
  landscapeHeader: {
    marginBottom: 16,
  },
  landscapeExerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  landscapeProgressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  landscapeProgressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#1E1E2E',
    borderRadius: 4,
    overflow: 'hidden',
  },
  landscapeProgressFill: {
    height: '100%',
    backgroundColor: '#acd205',
    borderRadius: 4,
  },
  landscapeSetProgressText: {
    fontSize: 14,
    color: '#e0ce12',
    fontWeight: '600',
  },
  landscapeCircleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  landscapeRepCounterOverlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  landscapeMotivationContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  landscapeMotivationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  landscapeCoachHeader: {
    paddingBottom: 16,
  },
  landscapeCoachTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6366F1',
    letterSpacing: 2,
  },
  landscapeCoachContent: {
    flex: 1,
  },
  landscapeBottomStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: '#1E1E2E',
    backgroundColor: '#0A0A0F',
  },
  landscapeStatItem: {
    alignItems: 'center',
  },
  landscapeStatLabel: {
    fontSize: 12,
    color: '#A5B4FC',
    marginBottom: 4,
  },
  landscapeStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  landscapePauseButton: {
    backgroundColor: '#F97316',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  landscapePauseButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
