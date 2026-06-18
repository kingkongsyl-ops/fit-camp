import { View, StyleSheet, ViewStyle } from 'react-native';
import { ProgressRing } from '@/components/ProgressRing';
import { RepCounterNew } from '@/components/RepCounterNew';

interface RepProgressCircleProps {
  progress: number;
  repsLeft: number;
  repsDone: number;
  size?: number;
  strokeWidth?: number;
}

export function RepProgressCircle({
  progress,
  repsLeft,
  repsDone,
  size = 280,
  strokeWidth = 8,
}: RepProgressCircleProps) {
  return (
    <View style={styles.container}>
      <ProgressRing progress={progress} size={size} strokeWidth={strokeWidth} />
      <View style={styles.overlay}>
        <RepCounterNew repsLeft={repsLeft} repsDone={repsDone} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  overlay: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
});
