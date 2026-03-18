import { HeatMapThemeProps } from "@/types/heatmap";
export declare const useTheme:(theme?:HeatMapThemeProps)=>{
    getCellColor:(count:number)=>string;
    headerTextColor:string;
    cellDefaultColor:string;
    cellTextColor:string;
    sidebarTextColor: string;
    cellColor:Record<number,string>;
    sortedColorResolverKeys:number[];
}