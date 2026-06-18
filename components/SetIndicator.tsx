import { View, Text, StyleSheet } from 'react-native';

interface SetIndicatorProps {
  currentSet: number;
  totalSets: number;
}

export function SetIndicator({ currentSet, totalSets }: SetIndicatorProps) {
  const dots = Array.from({ length: totalSets }, (_, i) => i);

  return (
    <View style={styles.container} testID="set-indicator">
      <Text style={styles.label} testID="set-label">
        Set {currentSet} of {totalSets}
      </Text>
      <View style={styles.dotsContainer}>
        {dots.map(i => (
          <View
            key={i}
            style={[styles.dot, i < currentSet && styles.completedDot]}
            testID={`set-dot-${i}`}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A5B4FC',
    marginBottom: 8,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2A2A4A',
  },
  completedDot: {
    backgroundColor: '#6366F1',
  },
});
