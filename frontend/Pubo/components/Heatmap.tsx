import React from "react";
import { WeeklyHeatMap } from "./weekly-heat-map";
import { HeatMapDailyProps, HeatMapProps, HeatMapWeeklyProps } from "@/types/heatmap";

type Props = HeatMapProps & HeatMapDailyProps & HeatMapWeeklyProps;

export default function HeatMap(props: Props) {
  return <WeeklyHeatMap {...props} />;
}

export { WeeklyHeatMap };