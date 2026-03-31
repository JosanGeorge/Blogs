import {
  gray,
  blue,
  red,
  green,
  blueDark,
  redDark,
  greenDark,
  indigo,
  indigoDark,
} from "@radix-ui/colors"

// Custom "Zero-Day Dark" cyber palette
const cyberDark = {
  gray1: "#08080c",
  gray2: "#0c0c12",
  gray3: "#101018",
  gray4: "#16161e",
  gray5: "#1c1c26",
  gray6: "#23232f",
  gray7: "#2e2e3d",
  gray8: "#40405a",
  gray9: "#585878",
  gray10: "#888899",
  gray11: "#b8b8d0",
  gray12: "#e8e8f5",
}

export type Colors = typeof colors.light & typeof colors.dark

export const colors = {
  light: {
    ...indigo,
    ...gray,
    ...blue,
    ...red,
    ...green,
  },
  dark: {
    ...cyberDark,
    ...indigoDark,
    ...blueDark,
    ...redDark,
    ...greenDark,
  },
}
