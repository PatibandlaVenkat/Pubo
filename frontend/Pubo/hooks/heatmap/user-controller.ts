import { HeatMapControllerProps } from "@/types/heatmap";
 export const userController=(props:HeatMapControllerProps)=>{
    const scrollEnabled=props.scrollable ?? true;
    const pressable=props.pressable?? true;
    const hoverable=props.hoverable??true;
    const rt1=props.rt1??false;
    const isHeaderVisible=props.isHeaderVisible??true;
    const isSidebarVisible=props.isSidebarVisible??true;
    return {
        scrollEnabled,
         showsHorizontalScrollIndicator: false,
         pressable,
         hoverable,
         rt1,
         isHeaderVisible,
         isCellTextVisible:true,
         isSidebarVisible,

    }
 }