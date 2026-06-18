import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { SetIndicator } from '@/components/SetIndicator';

describe('SetIndicator', () => {
  it('renders the set label', () => {
    render(<SetIndicator currentSet={1} totalSets={3} />);
    expect(screen.getByTestId('set-label')).toHaveTextContent('Set 1 of 3');
  });

  it('renders the correct number of dots', () => {
    render(<SetIndicator currentSet={0} totalSets={3} />);
    expect(screen.getByTestId('set-dot-0')).toBeTruthy();
    expect(screen.getByTestId('set-dot-1')).toBeTruthy();
    expect(screen.getByTestId('set-dot-2')).toBeTruthy();
    expect(screen.queryByTestId('set-dot-3')).toBeNull();
  });

  it('renders the container with testID', () => {
    render(<SetIndicator currentSet={0} totalSets={3} />);
    expect(screen.getByTestId('set-indicator')).toBeTruthy();
  });

  it('renders 1 dot for a single set', () => {
    render(<SetIndicator currentSet={0} totalSets={1} />);
    expect(screen.getByTestId('set-dot-0')).toBeTruthy();
    expect(screen.queryByTestId('set-dot-1')).toBeNull();
  });

  it('updates label when currentSet changes', () => {
    const { rerender } = render(<SetIndicator currentSet={0} totalSets={3} />);
    expect(screen.getByTestId('set-label')).toHaveTextContent('Set 0 of 3');

    rerender(<SetIndicator currentSet={2} totalSets={3} />);
    expect(screen.getByTestId('set-label')).toHaveTextContent('Set 2 of 3');
  });
});
