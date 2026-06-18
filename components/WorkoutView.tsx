import { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import { EXERCISES } from '@/constants/exercises';
import { colors } from '@/constants/theme';
import { getFeedbackMessage } from '@/utils/getFeedbackMessage';
import { useExerciseCounter } from '@/hooks/useExerciseCounter';
import { LiveCoaching } from '@/components/LiveCoaching';
import { MotivationText } from '@/components/MotivationText';
import { SetIndicator } from '@/components/SetIndicator';
import { StatsRow } from '@/components/StatsRow';
import { CelebrationModal } from '@/components/CelebrationModal';
import { BackButton } from '@/components/shared/BackButton';
import { PauseResumeButton } from '@/components/shared/PauseResumeButton';
import { RepProgressCircle } from '@/components/shared/RepProgressCircle';
import { WorkoutStatsRow } from '@/components/shared/WorkoutStatsRow';

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

  const feedbackMessage = getFeedbackMessage({
    isPaused,
    remainingReps,
    repCount,
    isDetecting,
    exerciseId,
  });

  const setProgress = 1 - (remainingReps / totalReps);
  const isLandscape = exercise?.orientation === 'landscape';

  if (isLandscape) {
    return (
      <View style={styles.landscapeContainer}>
        <BackButton onPress={handleBack} variant="floating" />

        <View style={styles.landscapeMainContent}>
          <View style={styles.landscapeLeftPanel}>
            <View style={styles.landscapeCoachBlock}>
              <View style={styles.landscapeCoachHeader}>
                <Text style={styles.landscapeCoachTitle}>LIVE COACH</Text>
              </View>
              <View style={styles.landscapeCoachContent}>
                <LiveCoaching message={feedbackMessage} />
              </View>
            </View>

            <View style={styles.landscapeMotivationContainer}>
              <Text style={styles.landscapeMotivationText}>Crushing it! 🏆</Text>
            </View>
          </View>

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
              <RepProgressCircle
                progress={setProgress}
                repsLeft={remainingReps}
                repsDone={repCount}
                size={260}
                strokeWidth={12}
              />
            </View>
          </View>
        </View>

        <View style={styles.landscapeBottomStatsRow}>
          <WorkoutStatsRow
            stats={[
              { label: 'Target', value: totalReps },
              { label: 'Done', value: repCount },
              { label: 'Set', value: `${currentSet}/${totalSets}` },
            ]}
          />
          <PauseResumeButton isPaused={isPaused} onPress={handlePauseResume} variant="pill" />
        </View>

        <CelebrationModal visible={isComplete} exerciseName={exercise?.name || 'Exercise'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={handleBack} />
        <Text style={styles.headerTitle}>{exercise?.name}</Text>
        <PauseResumeButton isPaused={isPaused} onPress={handlePauseResume} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.setIndicatorWrapper}>
          <SetIndicator currentSet={currentSet} totalSets={totalSets} />
        </View>

        <View style={styles.counterContainer}>
          <RepProgressCircle
            progress={setProgress}
            repsLeft={remainingReps}
            repsDone={repCount}
          />
        </View>

        <View style={styles.motivationWrapper}>
          <MotivationText message={feedbackMessage} />
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
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
  },
  content: {
    flexGrow: 1,
    padding: 24,
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 40,
  },
  counterContainer: {
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
  landscapeContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  landscapeMainContent: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
  },
  landscapeLeftPanel: {
    flex: 0.4,
    padding: 16,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.surface,
    gap: 28,
  },
  landscapeCoachBlock: {
    alignItems: 'flex-start',
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
    color: colors.white,
    marginBottom: 8,
  },
  landscapeProgressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  landscapeProgressBar: {
    width: 90,
    height: 4,
    backgroundColor: colors.surface,
    borderRadius: 2,
    overflow: 'hidden',
  },
  landscapeProgressFill: {
    height: '100%',
    backgroundColor: colors.progressGreen,
    borderRadius: 2,
  },
  landscapeSetProgressText: {
    fontSize: 12,
    color: colors.progressYellow,
    fontWeight: '600',
  },
  landscapeCircleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  landscapeMotivationContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  landscapeMotivationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  landscapeCoachHeader: {
    paddingBottom: 16,
  },
  landscapeCoachTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 2,
  },
  landscapeCoachContent: {
    alignSelf: 'stretch',
  },
  landscapeBottomStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: colors.surface,
    backgroundColor: colors.background,
  },
});
