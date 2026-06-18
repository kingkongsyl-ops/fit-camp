import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { MotivationText } from '@/components/MotivationText';

describe('MotivationText', () => {
  it('renders the message', () => {
    render(<MotivationText message="Keep going!" />);
    expect(screen.getByTestId('motivation-message')).toHaveTextContent('Keep going!');
  });

  it('renders the container with testID', () => {
    render(<MotivationText message="Test" />);
    expect(screen.getByTestId('motivation-text')).toBeTruthy();
  });

  it('applies orange color for Paused message', () => {
    render(<MotivationText message="Paused" />);
    const msg = screen.getByTestId('motivation-message');
    const flatStyle = Array.isArray(msg.props.style)
      ? Object.assign({}, ...msg.props.style)
      : msg.props.style;
    expect(flatStyle.color).toBe('#F97316');
  });

  it('applies green color for Set complete! message', () => {
    render(<MotivationText message="Set complete!" />);
    const msg = screen.getByTestId('motivation-message');
    const flatStyle = Array.isArray(msg.props.style)
      ? Object.assign({}, ...msg.props.style)
      : msg.props.style;
    expect(flatStyle.color).toBe('#10B981');
  });

  it('applies blue color for Get ready! message', () => {
    render(<MotivationText message="Get ready!" />);
    const msg = screen.getByTestId('motivation-message');
    const flatStyle = Array.isArray(msg.props.style)
      ? Object.assign({}, ...msg.props.style)
      : msg.props.style;
    expect(flatStyle.color).toBe('#A5B4FC');
  });

  it('applies default purple color for unknown messages', () => {
    render(<MotivationText message="Rep 5!" />);
    const msg = screen.getByTestId('motivation-message');
    const flatStyle = Array.isArray(msg.props.style)
      ? Object.assign({}, ...msg.props.style)
      : msg.props.style;
    expect(flatStyle.color).toBe('#8B5CF6');
  });
});
