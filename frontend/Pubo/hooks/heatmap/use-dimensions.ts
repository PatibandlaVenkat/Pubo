import { HeatMapDimensionsProps } from "@/types/heatmap";
export const useDimension=(
    props:HeatMapDimensionsProps &{
        isHeaderVisible:boolean;
    }
)=>{
    const headerTextFontSize=props.headerTextFontSize ?? 12;
    const headerBottomSpace=props.headerBottomSpace ?? 6;
    const cellSize=props.cellSize??12;
    const cellRadius=props.cellRadius?? 2;
    const cellGap=props.cellGap ?? 2;
    const cellTextFontSize=props.cellTextFontSize ?? 9;
    const sideBarTextFontSize=props.sideBarTextFontSize ??10;
    const adjustedCellSize=cellSize+cellGap
    const headerHeight=props.isHeaderVisible ? headerTextFontSize+headerBottomSpace +2 :0;
    return {
        headerHeight,
        headerBottomSpace,
        headerTextFontSize,
        cellSize,
        cellRadius,
        cellGap,
        cellTextFontSize,
        adjustedCellSize,
        sideBarTextFontSize


    }
}