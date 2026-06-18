import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

interface MotivationTextProps {
  message: string;
}

const MOTIVATION_COLORS: Record<string, string> = {
  'Paused': colors.accent,
  'Set complete!': colors.success,
  'Get ready!': colors.primaryLight,
};

export function MotivationText({ message }: MotivationTextProps) {
  const color = MOTIVATION_COLORS[message] || colors.purple;

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
