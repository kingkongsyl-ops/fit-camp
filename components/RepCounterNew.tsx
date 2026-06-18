import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

interface RepCounterNewProps {
  repsLeft: number;
  repsDone: number;
}

export function RepCounterNew({ repsLeft, repsDone }: RepCounterNewProps) {
  return (
    <View style={styles.container} testID="rep-counter">
      <Text style={styles.repsLeft} testID="reps-left">
        {repsLeft}
      </Text>
      <Text style={styles.label}>reps left</Text>
      <Text style={styles.repsDone} testID="reps-done">
        {repsDone} done
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  repsLeft: {
    fontSize: 64,
    fontWeight: '800',
    color: colors.white,
    lineHeight: 72,
  },
  label: {
    fontSize: 14,
    color: colors.muted,
    marginTop: -4,
  },
  repsDone: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginTop: 8,
  },
});
