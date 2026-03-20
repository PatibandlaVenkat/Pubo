import { HeatMapDatetimeProps } from "@/types/heatmap";
import{Day,endOfWeek,startOfWeek,subWeeks} from "date-fns"
 export const useDatetime=(
    props:HeatMapDatetimeProps &{
        baseDuration:number;
        weeksStartsOn:Day;
    }
 ) =>{
    const now=new Date();
    const endBase=props.endDate ??now;
      const normalizedEnd = endOfWeek(endBase, { weekStartsOn: props.weeksStartsOn });
      const startBase=props.startDate ?? subWeeks(normalizedEnd,Math.max(1,props.baseDuration))
      const normalizedStart = startOfWeek(startBase, { weekStartsOn: props.weeksStartsOn });

  const start = normalizedStart <= normalizedEnd ? normalizedStart : normalizedEnd;
  const end = normalizedStart <= normalizedEnd ? normalizedEnd : normalizedStart;

  const hiddenDays = props.hiddenDays ?? [];
  const visibleDays = [0, 1, 2, 3, 4, 5, 6].filter((d) => !hiddenDays.includes(d as Day));

  return {
    start,
    end,
    hiddenDays,
    visibleDays,
  };
 }