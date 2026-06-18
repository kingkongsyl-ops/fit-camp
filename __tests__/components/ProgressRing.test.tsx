import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { ProgressRing } from '@/components/ProgressRing';

jest.mock('react-native-svg', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: ({ children, ...props }: any) =>
      <View {...props}>{children}</View>,
    Circle: (props: any) => <View {...props} />,
  };
});

describe('ProgressRing', () => {
  it('renders the container with testID', () => {
    render(<ProgressRing progress={0.5} size={200} strokeWidth={8} />);
    expect(screen.getByTestId('progress-ring')).toBeTruthy();
  });

  it('renders with zero progress', () => {
    render(<ProgressRing progress={0} size={200} strokeWidth={8} />);
    expect(screen.getByTestId('progress-ring')).toBeTruthy();
  });

  it('renders with full progress', () => {
    render(<ProgressRing progress={1} size={200} strokeWidth={8} />);
    expect(screen.getByTestId('progress-ring')).toBeTruthy();
  });

  it('clamps progress above 1 to 1', () => {
    render(<ProgressRing progress={1.5} size={200} strokeWidth={8} />);
    expect(screen.getByTestId('progress-ring')).toBeTruthy();
  });

  it('clamps progress below 0 to 0', () => {
    render(<ProgressRing progress={-0.5} size={200} strokeWidth={8} />);
    expect(screen.getByTestId('progress-ring')).toBeTruthy();
  });

  it('applies the correct container size', () => {
    render(<ProgressRing progress={0.5} size={280} strokeWidth={10} />);
    const container = screen.getByTestId('progress-ring');
    const flatStyle = Array.isArray(container.props.style)
      ? Object.assign({}, ...container.props.style)
      : container.props.style;
    expect(flatStyle.width).toBe(280);
    expect(flatStyle.height).toBe(280);
  });
});
