import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

interface LiveCoachingProps {
  message: string;
}

export function LiveCoaching({ message }: LiveCoachingProps) {
  const isActionMessage = !['Paused', 'Get ready!', 'Detecting motion...'].includes(message);

  return (
    <View style={styles.container} testID="live-coaching">
      <Text
        style={[styles.message, isActionMessage && styles.actionMessage]}
        testID="coaching-message"
      >
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primaryLight,
    textAlign: 'center',
  },
  actionMessage: {
    color: colors.success,
    fontSize: 22,
  },
});
