import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '@/constants/theme';

interface BackButtonProps {
  onPress: () => void;
  variant?: 'inline' | 'floating';
}

export function BackButton({ onPress, variant = 'inline' }: BackButtonProps) {
  const isFloating = variant === 'floating';
  return (
    <TouchableOpacity
      onPress={onPress}
      style={isFloating ? styles.floating : styles.inline}
    >
      <Text style={isFloating ? styles.floatingText : styles.inlineText}>
        ←
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  inline: {
    padding: 8,
  } as ViewStyle,
  inlineText: {
    fontSize: 24,
    color: colors.white,
    fontWeight: '600',
  } as TextStyle,
  floating: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  } as ViewStyle,
  floatingText: {
    fontSize: 24,
    color: colors.white,
    fontWeight: '600',
    lineHeight: 26,
  } as TextStyle,
});
