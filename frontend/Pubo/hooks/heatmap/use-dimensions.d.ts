import { HeatMapDimensionsProps } from "@/types/heatmap";
export declare const useDimension:(props:HeatMapDimensionsProps &{
    isHeaderVisible:boolean;

})=>{
    headerHeight: number;
    headerBottomSpace: number;
    headerTextFontSize: number;
    cellSize: number;
    cellRadius: number;
    cellGap: number;
    cellTextFontSize: number;
    adjustedCellSize: number;
    sideBarTextFontSize: number;
    
}