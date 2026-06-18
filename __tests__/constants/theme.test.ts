import { colors } from '@/constants/theme';

describe('theme colors', () => {
  it('exports all required color tokens', () => {
    expect(colors.background).toBeDefined();
    expect(colors.surface).toBeDefined();
    expect(colors.surfaceDark).toBeDefined();
    expect(colors.border).toBeDefined();
    expect(colors.overlay).toBeDefined();
    expect(colors.white).toBeDefined();
    expect(colors.accent).toBeDefined();
    expect(colors.primary).toBeDefined();
    expect(colors.primaryLight).toBeDefined();
    expect(colors.purple).toBeDefined();
    expect(colors.success).toBeDefined();
    expect(colors.muted).toBeDefined();
    expect(colors.progressGreen).toBeDefined();
    expect(colors.progressYellow).toBeDefined();
  });

  it('has valid hex/rgba color values', () => {
    const hexOrRgba = /^(#[0-9a-fA-F]{6}|rgba?\(.+\))$/;
    Object.values(colors).forEach((color) => {
      expect(color).toMatch(hexOrRgba);
    });
  });
});
