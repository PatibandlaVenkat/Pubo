import { StyleProp,TextStyle,ViewStyle } from "react-native";
import{Locale} from 'date-fns'
import{Day} from 'date-fns'
export type HeatMapScheme='light'|'dark';
export type HeatMapColor={
    headerTextColor?:string;
    cellDefaultColor?:string;
    cellTextColor?:string;
    cellColor?:Record<number,string>;
    sidebarTextColor?:string;
};
export type HeatMapThemeProps=HeatMapColor &{
    scheme?:HeatMapScheme;
} & {
    [key in HeatMapScheme]?: HeatMapColor;
};

export type HeatMapStyle={
    scrollStyle?:StyleProp<ViewStyle>;
    headerTextAlign?:TextStyle['textAlign'];
};

export type HeatMapDimensionsProps={
    headerTextFontSize?: number;
    headerBottomSpace?:number;
     cellSize?: number;
     cellRadius?:number;
     cellGap?:number;
      cellTextFontSize?: number;
    sideBarTextFontSize?: number;

};

export type HeatMapControllerProps={
    pressable?:boolean;
    hoverable?:boolean;
    scrollable?:boolean;
    rt1?:boolean;
    isHeaderVisible?:boolean;
    isSidebarVisible?:boolean;
};

export type HeatMapFormatterProps={
    headerTextFormat?:string;
    sidebarTextFormat?:string;
    locale?:Locale;
}
export type HeatMapDatetimeProps={
    startDate?:Date;
    endDate?:Date;
    hiddenDays?:Day[];
};

export type HeatMapActionsProps={
    onCellPress?:(params:{
        date:Date;
        count:number;
    })=>void;
    onMouseEnter?:(params:{
        date:Date;
        x:number,
        y:number,
        count:number;
    })=>void;
    onMouseLeave?:()=>void;
};
export type HeatMapProps = HeatMapDimensionsProps & HeatMapDatetimeProps & HeatMapStyle & HeatMapControllerProps & HeatMapFormatterProps & HeatMapActionsProps & {
    theme?: HeatMapThemeProps;
};

export type HeatMapDailyProps={
    data?:(Date|string)[]|Record<string,number>;

};
export type HeatMapWeeklyProps={
    weekStartsOn?:Day;
    cellText?:'date'|'count';
};


