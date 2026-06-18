import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '@/constants/theme';

interface PauseResumeButtonProps {
  isPaused: boolean;
  onPress: () => void;
  variant?: 'inline' | 'pill';
}

export function PauseResumeButton({
  isPaused,
  onPress,
  variant = 'inline',
}: PauseResumeButtonProps) {
  const isPill = variant === 'pill';
  return (
    <TouchableOpacity
      style={isPill ? styles.pill : styles.inline}
      onPress={onPress}
    >
      <Text style={isPill ? styles.pillText : styles.inlineText}>
        {isPaused ? '▶' : '⏸'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  inline: {
    padding: 8,
  } as ViewStyle,
  inlineText: {
    fontSize: 28,
    color: colors.accent,
  } as TextStyle,
  pill: {
    backgroundColor: colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  } as ViewStyle,
  pillText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  } as TextStyle,
});
