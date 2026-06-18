import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '@/constants/theme';

interface StatItem {
  label: string;
  value: string | number;
}

interface WorkoutStatsRowProps {
  stats: StatItem[];
}

export function WorkoutStatsRow({ stats }: WorkoutStatsRowProps) {
  return (
    <View style={styles.row}>
      {stats.map((stat) => (
        <View key={stat.label} style={styles.item}>
          <Text style={styles.label}>{stat.label}</Text>
          <Text style={styles.value}>{stat.value}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  } as ViewStyle,
  item: {
    alignItems: 'center',
  } as ViewStyle,
  label: {
    fontSize: 12,
    color: colors.primaryLight,
    marginBottom: 4,
  } as TextStyle,
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  } as TextStyle,
});
