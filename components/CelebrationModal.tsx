import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

interface CelebrationModalProps {
  visible: boolean;
  exerciseName: string;
}

export function CelebrationModal({ visible, exerciseName }: CelebrationModalProps) {
  const handleDone = () => {
    router.back();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" testID="celebration-modal">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.emoji}>🎉</Text>
          <Text style={styles.title} testID="celebration-title">Great Job!</Text>
          <Text style={styles.subtitle} testID="celebration-subtitle">
            You completed {exerciseName}!
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleDone} testID="celebration-done-button">
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#1E1E2E',
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    width: '80%',
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#A5B4FC',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#6366F1',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
