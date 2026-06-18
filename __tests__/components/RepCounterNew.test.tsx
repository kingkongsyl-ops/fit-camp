import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { RepCounterNew } from '@/components/RepCounterNew';

describe('RepCounterNew', () => {
  it('renders the reps left count', () => {
    render(<RepCounterNew repsLeft={10} repsDone={5} />);
    expect(screen.getByTestId('reps-left')).toHaveTextContent('10');
  });

  it('renders the reps done count', () => {
    render(<RepCounterNew repsLeft={10} repsDone={5} />);
    expect(screen.getByTestId('reps-done')).toHaveTextContent('5 done');
  });

  it('renders with zero values', () => {
    render(<RepCounterNew repsLeft={0} repsDone={0} />);
    expect(screen.getByTestId('reps-left')).toHaveTextContent('0');
    expect(screen.getByTestId('reps-done')).toHaveTextContent('0 done');
  });

  it('renders the container with testID', () => {
    render(<RepCounterNew repsLeft={5} repsDone={3} />);
    expect(screen.getByTestId('rep-counter')).toBeTruthy();
  });

  it('updates when props change', () => {
    const { rerender } = render(<RepCounterNew repsLeft={12} repsDone={0} />);
    expect(screen.getByTestId('reps-left')).toHaveTextContent('12');

    rerender(<RepCounterNew repsLeft={8} repsDone={4} />);
    expect(screen.getByTestId('reps-left')).toHaveTextContent('8');
    expect(screen.getByTestId('reps-done')).toHaveTextContent('4 done');
  });
});
