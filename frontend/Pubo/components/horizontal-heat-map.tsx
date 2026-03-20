// components/horizontal-heat-map.tsx
import React, { memo } from "react";
import {
  Pressable,
  ScrollView,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { format, Locale } from "date-fns";
import { HeatMapActionsProps } from "@/types/heatmap";

type Cell = {
  date: Date;
  label: string | number;
  x: number;
  y: number;
  count: number;
};

type Props = {
  rt1: boolean;
  pressable: boolean;
  hoverable: boolean;
  scrollEnabled: boolean;
  showsHorizontalScrollIndicator: boolean;
  width: number;
  height: number;
  cells: Cell[];
  cellGap: number;
  isCellTextVisible: boolean;
  cellDefaultColor: string;
  cellSize: number;
  cellRadius: number;
  cellTextColor: string;
  cellTextFontSize: number;
  isHeaderVisible: boolean;
  headerLabels: { date: Date; width: number }[];
  headerTextAlign?: TextStyle["textAlign"];
  headerTextFormat: string;
  headerTextFontSize: number;
  headerBottomSpace: number;
  headerTextColor: string;
  locale?: Locale;
  scrollStyle?: StyleProp<ViewStyle>;
  isSidebarVisible: boolean;
  sidebarLabels: { label: string; value: string | number }[];
  sidebarTextColor: string;
  sideBarTextFontSize: number;
  getCellColor: (count: number) => string | undefined;
  onCellPress: HeatMapActionsProps["onCellPress"];
  onMouseEnter: HeatMapActionsProps["onMouseEnter"];
  onMouseLeave: HeatMapActionsProps["onMouseLeave"];
};

export const HorizontalHeatMap = memo((props: Props) => {
  const {
    rt1,
    pressable,
    hoverable,
    scrollEnabled,
    showsHorizontalScrollIndicator,
    width,
    height,
    cells,
    cellGap,
    isCellTextVisible,
    cellDefaultColor,
    cellSize,
    cellRadius,
    cellTextColor,
    cellTextFontSize,
    isHeaderVisible,
    headerLabels,
    locale,
    headerTextAlign,
    headerTextFormat,
    headerTextFontSize,
    headerBottomSpace,
    headerTextColor,
    getCellColor,
    scrollStyle,
    isSidebarVisible,
    sidebarLabels,
    sidebarTextColor,
    sideBarTextFontSize,
    onCellPress,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const sidebarWidth = isSidebarVisible ? 34 : 0;
  const headerHeight = isHeaderVisible
    ? headerTextFontSize + headerBottomSpace + 2
    : 0;

  return (
    <View>
      <View
        style={{
          flexDirection: rt1 ? "row-reverse" : "row",
          alignItems: "flex-start",
        }}
      >
        {isSidebarVisible ? (
          <View
            style={{ width: sidebarWidth, height, marginTop: headerHeight }}
          >
            {sidebarLabels.map((item) => {
              const row = Number(item.value);
              return (
                <Text
                  key={`s-${item.label}-${item.value}`}
                  style={{
                    position: "absolute",
                    top: row * (cellSize + cellGap),
                    color: sidebarTextColor,
                    fontSize: sideBarTextFontSize,
                  }}
                >
                  {item.label}
                </Text>
              );
            })}
          </View>
        ) : null}

        <ScrollView
          horizontal
          scrollEnabled={scrollEnabled}
          showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
          contentContainerStyle={scrollStyle}
        >
          <View>
            {isHeaderVisible ? (
              <View
                style={{ width, height: headerHeight, position: "relative" }}
              >
                {headerLabels.map((item) => (
                  <Text
                    key={`h-${item.date.toISOString()}`}
                    style={{
                      position: "absolute",
                      left: item.width,
                      color: headerTextColor,
                      fontSize: headerTextFontSize,
                      textAlign: headerTextAlign ?? "left",
                    }}
                  >
                    {format(item.date, headerTextFormat, { locale })}
                  </Text>
                ))}
              </View>
            ) : null}

            <View style={{ width, height, position: "relative" }}>
              {cells.map((cell) => {
                const bg =
                  cell.count > 0
                    ? (getCellColor(cell.count) ?? cellDefaultColor)
                    : cellDefaultColor;

                return (
                  <Pressable
                    key={`c-${cell.date.toISOString()}`}
                    disabled={!pressable && !hoverable}
                    onPress={() => {
                      if (!pressable) return;
                      onCellPress?.({ date: cell.date, count: cell.count });
                    }}
                    onHoverIn={(e) => {
                      if (!hoverable) return;
                      const x = (e as any)?.nativeEvent?.locationX ?? 0;
                      const y = (e as any)?.nativeEvent?.locationY ?? 0;
                      onMouseEnter?.({
                        date: cell.date,
                        x,
                        y,
                        count: cell.count,
                      });
                    }}
                    onHoverOut={() => {
                      if (!hoverable) return;
                      onMouseLeave?.();
                    }}
                    style={{
                      position: "absolute",
                      left: cell.x,
                      top: cell.y,
                      width: cellSize,
                      height: cellSize,
                      borderRadius: cellRadius,
                      backgroundColor: bg,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {isCellTextVisible ? (
                      <Text
                        style={{
                          color: cellTextColor,
                          fontSize: cellTextFontSize,
                        }}
                      >
                        {cell.label}
                      </Text>
                    ) : null}
                  </Pressable>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
});
