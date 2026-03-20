import { Appearance } from "react-native";
import { HeatMapThemeProps } from "@/types/heatmap";

const lightDefaults = {
  headerTextColor: "#57606a",
  cellDefaultColor: "#ebedf0",
  cellTextColor: "#24292f",
  sidebarTextColor: "#57606a",
  cellColor: {
    1: "#9be9a8",
    2: "#40c463",
    3: "#30a14e",
    4: "#216e39",
  } as Record<number, string>,
};

const darkDefaults = {
  headerTextColor: "#8b949e",
  cellDefaultColor: "#161b22",
  cellTextColor: "#c9d1d9",
  sidebarTextColor: "#8b949e",
  cellColor: {
    1: "#0e4429",
    2: "#006d32",
    3: "#26a641",
    4: "#39d353",
  } as Record<number, string>,
};

export const useTheme = (theme?: HeatMapThemeProps) => {
  const scheme = theme?.scheme ?? (Appearance.getColorScheme() === "dark" ? "dark" : "light");
  const defaults = scheme === "dark" ? darkDefaults : lightDefaults;
  const scopedOverride = theme?.[scheme] ?? {};
  const merged = { ...defaults, ...theme, ...scopedOverride };

  const sortedColorResolverKeys = Object.keys(merged.cellColor ?? {})
    .map((n) => Number(n))
    .filter((n) => !Number.isNaN(n))
    .sort((a, b) => a - b);

  const getCellColor = (count: number): string => {
    if (count <= 0) return merged.cellDefaultColor;
    let resolved = merged.cellDefaultColor;
    for (const key of sortedColorResolverKeys) {
      if (count >= key) resolved = merged.cellColor[key];
    }
    return resolved;
  };

  return {
    getCellColor,
    headerTextColor: merged.headerTextColor,
    cellDefaultColor: merged.cellDefaultColor,
    cellTextColor: merged.cellTextColor,
    sidebarTextColor: merged.sidebarTextColor,
    cellColor: merged.cellColor,
    sortedColorResolverKeys,
  };
};