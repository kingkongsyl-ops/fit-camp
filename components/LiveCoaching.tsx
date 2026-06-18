import { View, Text, StyleSheet } from 'react-native';

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
    backgroundColor: '#1E1E2E',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    fontWeight: '600',
    color: '#A5B4FC',
    textAlign: 'center',
  },
  actionMessage: {
    color: '#10B981',
    fontSize: 22,
  },
});
