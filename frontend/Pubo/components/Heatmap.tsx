import React, { memo } from "react";
import { Pressable, ScrollView, StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
import { format, Locale } from "date-fns";
import { HeatMapActionsProps } from "@/types/heatmap";

type Cell = {
  date: Date;
  label: string | number;
  x: number;
  y: number;
  count: number;
};

type HorizontalHeatMapProps = {
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

export const HorizontalHeatMap = memo(
  ({
    rt1,
    pressable,
    hoverable,
    scrollEnabled,
    showsHorizontalScrollIndicator,
    width,
    height,
    cells,
    isCellTextVisible,
    cellGap,
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
  }: HorizontalHeatMapProps) => {
    // Groups cells by row (y) so we can render a matrix
    const rows = Array.from(new Set(cells.map((c) => c.y)))
      .sort((a, b) => a - b)
      .map((y) => ({
        y,
        items: cells.filter((c) => c.y === y).sort((a, b) => a.x - b.x),
      }));

    return (
      <ScrollView
        horizontal
        scrollEnabled={scrollEnabled}
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        style={scrollStyle}
        contentContainerStyle={{ width, minHeight: height }}
      >
        <View style={{ flexDirection: rt1 ? "row-reverse" : "row" }}>
          {isSidebarVisible && (
            <View style={{ marginRight: cellGap, marginTop: isHeaderVisible ? headerTextFontSize + headerBottomSpace : 0 }}>
              {sidebarLabels.map((s) => (
                <View
                  key={String(s.value)}
                  style={{ height: cellSize + cellGap, justifyContent: "center", alignItems: "flex-end" }}
                >
                  <Text style={{ color: sidebarTextColor, fontSize: sideBarTextFontSize }}>
                    {s.label}
                  </Text>
                </View>
              ))}
            </View>
          )}

          <View>
            {isHeaderVisible && (
              <View style={{ flexDirection: "row", marginBottom: headerBottomSpace }}>
                {headerLabels.map((h, idx) => (
                  <View key={idx} style={{ width: h.width }}>
                    <Text
                      style={{
                        color: headerTextColor,
                        fontSize: headerTextFontSize,
                        textAlign: headerTextAlign ?? "left",
                      }}
                    >
                      {format(h.date, headerTextFormat, { locale })}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            <View style={{ gap: cellGap }}>
              {rows.map((row) => (
                <View key={row.y} style={{ flexDirection: "row", gap: cellGap }}>
                  {row.items.map((cell) => {
                    const bg = getCellColor(cell.count) ?? cellDefaultColor;
                    const commonStyle: ViewStyle = {
                      width: cellSize,
                      height: cellSize,
                      borderRadius: cellRadius,
                      backgroundColor: bg,
                      alignItems: "center",
                      justifyContent: "center",
                    };

                    const label = isCellTextVisible ? String(cell.label) : "";

                    if (pressable) {
                      return (
                        <Pressable
                          key={cell.date.toISOString() + "-" + cell.x + "-" + cell.y}
                          style={commonStyle}
                          onPress={() => onCellPress?.({ date: cell.date, count: cell.count })}
                          onHoverIn={(e) =>
                            hoverable &&
                            onMouseEnter?.({
                              date: cell.date,
                              count: cell.count,
                              x: e.nativeEvent.locationX,
                              y: e.nativeEvent.locationY,
                            })
                          }
                          onHoverOut={() => hoverable && onMouseLeave?.()}
                        >
                          {isCellTextVisible && (
                            <Text style={{ color: cellTextColor, fontSize: cellTextFontSize }}>{label}</Text>
                          )}
                        </Pressable>
                      );
                    }

                    return (
                      <View
                        key={cell.date.toISOString() + "-" + cell.x + "-" + cell.y}
                        style={commonStyle}
                      >
                        {isCellTextVisible && (
                          <Text style={{ color: cellTextColor, fontSize: cellTextFontSize }}>{label}</Text>
                        )}
                      </View>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
);