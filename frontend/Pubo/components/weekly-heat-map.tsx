// components/weekly-heat-map.tsx
import React, { useMemo } from "react";
import {
  addWeeks,
  differenceInCalendarWeeks,
  eachDayOfInterval,
  format,
  getDay,
  setDay,
  startOfWeek,
} from "date-fns";
import { HeatMapDailyProps, HeatMapProps, HeatMapWeeklyProps } from "@/types/heatmap";
import { useDatetime } from "@/hooks/heatmap/use-datetime.";
import { useDimension } from "@/hooks/heatmap/use-dimensions";
import { useTheme } from "@/hooks/heatmap/use-theme";
import { userController } from "@/hooks/heatmap/user-controller";
import { HorizontalHeatMap } from "./horizontal-heat-map";

type Props = HeatMapProps & HeatMapDailyProps & HeatMapWeeklyProps;

function normalizeData(data: HeatMapDailyProps["data"]): Record<string, number> {
  const out: Record<string, number> = {};
  if (!data) return out;

  if (Array.isArray(data)) {
    for (const d of data) {
      const date = d instanceof Date ? d : new Date(d);
      if (Number.isNaN(date.getTime())) continue;
      const key = format(date, "yyyy-MM-dd");
      out[key] = (out[key] ?? 0) + 1;
    }
    return out;
  }

  for (const [k, v] of Object.entries(data)) {
    out[k] = Number(v) || 0;
  }
  return out;
}

export const WeeklyHeatMap = (props: Props) => {
  const weekStartsOn = props.weekStartsOn ?? 0;
  const controls = userController(props);
  const dim = useDimension({ ...props, isHeaderVisible: controls.isHeaderVisible });
  const palette = useTheme(props.theme);

  const { start, end, visibleDays } = useDatetime({
    startDate: props.startDate,
    endDate: props.endDate,
    hiddenDays: props.hiddenDays,
    baseDuration: 53,
    weeksStartsOn: weekStartsOn,
  });

  const counts = useMemo(() => normalizeData(props.data), [props.data]);
  const startWeek = startOfWeek(start, { weekStartsOn });

  const weeksCount = Math.max(1, differenceInCalendarWeeks(end, startWeek, { weekStartsOn }) + 1);
  const width = weeksCount * dim.adjustedCellSize;
  const height = visibleDays.length * dim.adjustedCellSize;

  const cellTextMode = props.cellText ?? "count";
  const headerTextFormat = props.headerTextFormat ?? "MMM";
  const sidebarTextFormat = props.sidebarTextFormat ?? "EEE";

  const cells = useMemo(() => {
    const allDays = eachDayOfInterval({ start, end });

    return allDays
      .filter((d) => visibleDays.includes(getDay(d)))
      .map((date) => {
        const weekIndex = differenceInCalendarWeeks(date, startWeek, { weekStartsOn });
        const row = visibleDays.indexOf(getDay(date));
        const key = format(date, "yyyy-MM-dd");
        const count = counts[key] ?? 0;

        return {
          date,
          label: cellTextMode === "date" ? format(date, "d") : count,
          x: weekIndex * dim.adjustedCellSize,
          y: row * dim.adjustedCellSize,
          count,
        };
      });
  }, [start, end, visibleDays, weekStartsOn, startWeek, counts, cellTextMode, dim.adjustedCellSize]);

  const headerLabels = useMemo(() => {
    const labels: { date: Date; width: number }[] = [];
    let prev = "";

    for (let i = 0; i < weeksCount; i += 1) {
      const date = addWeeks(startWeek, i);
      const monthKey = format(date, "yyyy-MM");
      if (monthKey !== prev) {
        labels.push({ date, width: i * dim.adjustedCellSize });
        prev = monthKey;
      }
    }

    return labels;
  }, [weeksCount, startWeek, dim.adjustedCellSize]);

  const sidebarLabels = useMemo(() => {
    return visibleDays.map((day, row) => {
      const ref = setDay(new Date(2026, 0, 4), day, { weekStartsOn });
      return {
        label: format(ref, sidebarTextFormat, { locale: props.locale }),
        value: row,
      };
    });
  }, [visibleDays, sidebarTextFormat, props.locale, weekStartsOn]);

  return (
    <HorizontalHeatMap
      rt1={controls.rt1}
      pressable={controls.pressable}
      hoverable={controls.hoverable}
      scrollEnabled={controls.scrollEnabled}
      showsHorizontalScrollIndicator={controls.showsHorizontalScrollIndicator}
      width={width}
      height={height}
      cells={cells}
      cellGap={dim.cellGap}
      isCellTextVisible={controls.isCellTextVisible}
      cellDefaultColor={palette.cellDefaultColor}
      cellSize={dim.cellSize}
      cellRadius={dim.cellRadius}
      cellTextColor={palette.cellTextColor}
      cellTextFontSize={dim.cellTextFontSize}
      isHeaderVisible={controls.isHeaderVisible}
      headerLabels={headerLabels}
      locale={props.locale}
      headerTextAlign={props.headerTextAlign}
      headerTextFormat={headerTextFormat}
      headerTextFontSize={dim.headerTextFontSize}
      headerBottomSpace={dim.headerBottomSpace}
      headerTextColor={palette.headerTextColor}
      getCellColor={palette.getCellColor}
      scrollStyle={props.scrollStyle}
      isSidebarVisible={controls.isSidebarVisible}
      sidebarLabels={sidebarLabels}
      sidebarTextColor={palette.sidebarTextColor}
      sideBarTextFontSize={dim.sideBarTextFontSize}
      onCellPress={props.onCellPress}
      onMouseEnter={props.onMouseEnter}
      onMouseLeave={props.onMouseLeave}
    />
  );
};