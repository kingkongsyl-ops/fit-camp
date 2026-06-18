import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { StatsRow } from '@/components/StatsRow';

describe('StatsRow', () => {
  it('renders the done count', () => {
    render(<StatsRow done={5} target={20} />);
    expect(screen.getByTestId('stats-done')).toHaveTextContent('5');
  });

  it('renders the target count', () => {
    render(<StatsRow done={5} target={20} />);
    expect(screen.getByTestId('stats-target')).toHaveTextContent('20');
  });

  it('renders the percentage', () => {
    render(<StatsRow done={5} target={20} />);
    expect(screen.getByTestId('stats-percentage')).toHaveTextContent('25%');
  });

  it('renders 0% when done is 0', () => {
    render(<StatsRow done={0} target={20} />);
    expect(screen.getByTestId('stats-percentage')).toHaveTextContent('0%');
  });

  it('renders 100% when done equals target', () => {
    render(<StatsRow done={20} target={20} />);
    expect(screen.getByTestId('stats-percentage')).toHaveTextContent('100%');
  });

  it('renders 0% when target is 0 to avoid division by zero', () => {
    render(<StatsRow done={0} target={0} />);
    expect(screen.getByTestId('stats-percentage')).toHaveTextContent('0%');
  });

  it('renders the container with testID', () => {
    render(<StatsRow done={3} target={10} />);
    expect(screen.getByTestId('stats-row')).toBeTruthy();
  });

  it('rounds percentage correctly', () => {
    render(<StatsRow done={1} target={3} />);
    expect(screen.getByTestId('stats-percentage')).toHaveTextContent('33%');
  });
});
