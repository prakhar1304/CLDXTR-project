export const colors = {
  // Brand
  primary: "#4800B2",
  primaryContainer: "#6200EE",
  secondary: "#BB86FC",

  // Core surfaces (Royal Amethyst Editorial)
  surface: "#F8F9FE",
  surfaceContainerLow: "#F2F3F8",
  surfaceContainerLowest: "#FFFFFF",
  surfaceVariant: "#E1E2E7",

  // Text
  onSurface: "#191C1F",
  onSurfaceVariant: "#494456",
  onPrimary: "#FFFFFF",
  onSecondaryFixed: "#2A0A4A",

  // Outlines / feedback
  outlineVariant: "rgba(73, 68, 86, 0.15)",
  danger: "#EF4444",

  // Shadows (tinted, never black)
  shadowTint: "#5E289B",

  // Back-compat aliases (existing screens/components)
  background: "#F8F9FE",
  text: "#191C1F",
  textMuted: "#494456",
  border: "rgba(73, 68, 86, 0.15)",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  "2xl": 48,
} as const;

export const radius = {
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24, // ~1.5rem
  full: 9999,
} as const;

export const shadow = {
  ambientFloat: {
    shadowColor: colors.shadowTint,
    shadowOpacity: 0.06,
    shadowRadius: 48,
    shadowOffset: { width: 0, height: 18 },
    elevation: 6,
  },
} as const;

export const typography = {
  displayLg: { fontSize: 34, letterSpacing: -0.7, fontWeight: "800" as const },
  headlineSm: { fontSize: 18, letterSpacing: -0.2, fontWeight: "800" as const },
  bodyLg: { fontSize: 16, lineHeight: 26, fontWeight: "500" as const },
  labelMd: { fontSize: 12, letterSpacing: 0.2, fontWeight: "600" as const },
} as const;

