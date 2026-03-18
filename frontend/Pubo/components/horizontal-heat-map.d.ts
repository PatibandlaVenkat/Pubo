import {Pressable,ScrollView, StyleProp,TextStyle,View,ViewStyle } from "react-native";
import{format,Locale} from 'date-fns'
import { HeatMapActionsProps } from "@/types/heatmap";

 
type Cell={
    date:Date;
    label:string|number;
    x:number;
    y:number;
    count:number
};
export declare const HorizontalHeatMap:import ("react").MemoExoticComponent<({rt1,pressable,hoverable,scrollEnabled,showsHorizontalScrollIndicator,width,height,cells,isCellTextVisible,cellGap,cellDefaultColor,cellSize,cellRadius,cellTextColor,cellTextFontSize,isHeaderVisible,headerLabels,locale,headerTextAlign,headerTextFormat,headerTextFontSize,headerBottomSpace,headerTextColor,getCellColor,scrollStyle,isSidebarVisible,sidebarLabels,sidebarTextColor,sideBarTextFontSize,onCellPress,onMouseEnter,onMouseLeave,}:{
    rt1:boolean;
    pressable:boolean;
    hoverable:boolean;
    scrollEnabled:boolean;
    showsHorizontalScrollIndicator: boolean;
    width:number;
    height:number;
    cells:Cell[];
    cellGap:number;
    isCellTextVisible:boolean;
    cellDefaultColor:string;
    cellSize: number;
    cellRadius:number;
    cellTextColor:string;
    cellTextFontSize: number;
    isHeaderVisible:boolean;
    headerLabels:{
        date:Date;
        width:number
    }[];
    headerTextAlign?:TextStyle["textAlign"];
    headerTextFormat:string;
   headerTextFontSize: number;
   headerBottomSpace:number;
   headerTextColor:string;
   locale?:Locale;
   scrollStyle?:StyleProp<ViewStyle>
   isSidebarVisible:boolean;
   sidebarLabels:{
    label:string;
    value:string|number;
   }[];
   sidebarTextColor:string;
    sideBarTextFontSize: number;
    getCellColor:(count:number)=>string|undefined;
    onCellPress:HeatMapActionsProps['onCellPress'];
    onMouseEnter:HeatMapActionsProps['onMouseEnter'];
    onMouseLeave:HeatMapActionsProps['onMouseLeave'];


})=>import("react/jsx-runtime").JSX.Element>;
export{};