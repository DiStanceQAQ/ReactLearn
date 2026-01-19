// Unified design tokens for spacing, sizing, and shared defaults
import { Colors } from "./colors";

export const Theme = {
  colors: Colors,
  fontSize: {
    xs: 12,
    sm: 13,
    md: 14,
    lg: 16,
    xl: 18
  },
  lineHeight: {
    sm: 18,
    md: 20,
    lg: 22,
    xl: 24
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20
  },
  radius: {
    sm: 6,
    md: 8,
    lg: 12
  },
  border: {
    width: 1,
    color: Colors.border
  },
  opacity: {
    overlay: 0.5,
    disabled: 0.6
  },
  controlHeight: {
    md: 44,
    textarea: 120
  },
  zIndex: {
    popup: 1000,
    toast: 1100
  },
  shadow: {
    card: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2
    }
  }
};
