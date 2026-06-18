import { View, Text, StyleSheet } from 'react-native';

interface MotivationTextProps {
  message: string;
}

const MOTIVATION_COLORS: Record<string, string> = {
  'Paused': '#F97316',
  'Set complete!': '#10B981',
  'Get ready!': '#A5B4FC',
};

export function MotivationText({ message }: MotivationTextProps) {
  const color = MOTIVATION_COLORS[message] || '#8B5CF6';

  return (
    <View style={styles.container} testID="motivation-text">
      <Text style={[styles.text, { color }]} testID="motivation-message">
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 12,
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
});
