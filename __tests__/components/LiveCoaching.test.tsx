import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { LiveCoaching } from '@/components/LiveCoaching';

describe('LiveCoaching', () => {
  it('renders the message text', () => {
    render(<LiveCoaching message="Lift up!" />);
    expect(screen.getByTestId('coaching-message')).toHaveTextContent('Lift up!');
  });

  it('renders the container with testID', () => {
    render(<LiveCoaching message="Go!" />);
    expect(screen.getByTestId('live-coaching')).toBeTruthy();
  });

  it('renders action messages differently from status messages', () => {
    const { rerender } = render(<LiveCoaching message="Paused" />);
    const pausedMessage = screen.getByTestId('coaching-message');
    const pausedStyles = pausedMessage.props.style;

    rerender(<LiveCoaching message="Rep 5!" />);
    const repMessage = screen.getByTestId('coaching-message');
    const repStyles = repMessage.props.style;

    // Action messages should include a different style array
    expect(repStyles).not.toEqual(pausedStyles);
  });

  it('displays different exercise-specific messages', () => {
    const messages = ['Lift up!', 'Sit back', 'Start walking', 'Start marching', 'Detecting motion...'];
    for (const msg of messages) {
      const { unmount } = render(<LiveCoaching message={msg} />);
      expect(screen.getByTestId('coaching-message')).toHaveTextContent(msg);
      unmount();
    }
  });
});
