import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

interface StatsRowProps {
  done: number;
  target: number;
}

export function StatsRow({ done, target }: StatsRowProps) {
  const percentage = target > 0 ? Math.round((done / target) * 100) : 0;

  return (
    <View style={styles.container} testID="stats-row">
      <View style={styles.stat}>
        <Text style={styles.statValue} testID="stats-done">{done}</Text>
        <Text style={styles.statLabel}>Done</Text>
      </View>
      <View style={styles.stat}>
        <Text style={styles.statValue} testID="stats-target">{target}</Text>
        <Text style={styles.statLabel}>Target</Text>
      </View>
      <View style={styles.stat}>
        <Text style={styles.statValue} testID="stats-percentage">{percentage}%</Text>
        <Text style={styles.statLabel}>Complete</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 16,
    backgroundColor: colors.surface,
    borderRadius: 12,
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
  },
  statLabel: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 4,
  },
});
