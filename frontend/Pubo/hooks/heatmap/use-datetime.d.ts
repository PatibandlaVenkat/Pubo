import { HeatMapDatetimeProps } from "@/types/heatmap";
import{Day} from 'date-fns'
export declare const useDatetime:(props:HeatMapDatetimeProps &{
    baseDuration:number;
    weeksStartsOn:Day;
})=>{
    start:Date;
    end:Date;
    hiddenDays:Day[];
    visibleDays:number[];
};