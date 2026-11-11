export const colors = {
  background: '#26282E',
  surface: '#32353C',
  surfaceRaised: '#3D4049',
  border: '#4B4F5A',
  primary: '#A17CF6',
  primaryPressed: '#8A62E8',
  primaryEdge: '#6E45D1',
  primarySoft: '#3C3457',
  onPrimary: '#1B1725',
  text: '#F3F3F6',
  textMuted: '#B6B9C3',
  textDisabled: '#7F838F',
  success: '#5FD38D',
  successSoft: '#26483A',
  error: '#FF7B7B',
  errorSoft: '#4F2C31',
  warning: '#F4BE5E',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 14,
  lg: 20,
  round: 999,
} as const;

export const typography = {
  title: { fontSize: 28, lineHeight: 34, fontWeight: '800' },
  heading: { fontSize: 20, lineHeight: 26, fontWeight: '700' },
  body: { fontSize: 16, lineHeight: 23, fontWeight: '400' },
  label: { fontSize: 14, lineHeight: 19, fontWeight: '600' },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '400' },
} as const;
