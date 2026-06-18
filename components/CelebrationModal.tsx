import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { colors } from '@/constants/theme';

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
    backgroundColor: colors.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.surface,
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
    color: colors.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.primaryLight,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 12,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});
