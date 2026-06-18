import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { CelebrationModal } from '@/components/CelebrationModal';

jest.mock('expo-router', () => ({
  router: {
    back: jest.fn(),
  },
}));

describe('CelebrationModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders when visible is true', () => {
    render(<CelebrationModal visible={true} exerciseName="Overhead Press" />);
    expect(screen.getByTestId('celebration-title')).toHaveTextContent('Great Job!');
  });

  it('displays the exercise name in the subtitle', () => {
    render(<CelebrationModal visible={true} exerciseName="Sit-Ups" />);
    expect(screen.getByTestId('celebration-subtitle')).toHaveTextContent('You completed Sit-Ups!');
  });

  it('renders the Done button', () => {
    render(<CelebrationModal visible={true} exerciseName="Walking" />);
    expect(screen.getByTestId('celebration-done-button')).toBeTruthy();
  });

  it('calls router.back when Done is pressed', () => {
    const { router } = require('expo-router');
    render(<CelebrationModal visible={true} exerciseName="Walking" />);
    fireEvent.press(screen.getByTestId('celebration-done-button'));
    expect(router.back).toHaveBeenCalledTimes(1);
  });

  it('renders celebration modal with testID', () => {
    render(<CelebrationModal visible={true} exerciseName="Test" />);
    expect(screen.getByTestId('celebration-modal')).toBeTruthy();
  });
});
