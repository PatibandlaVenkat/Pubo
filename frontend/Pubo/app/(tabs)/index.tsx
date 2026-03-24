import { Pressable, Text, View, StyleSheet } from "react-native";
import useTheme from "@/hooks/useTheme";
import { useState } from "react";
import { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import SideMenu from "@/components/sidemenubar";
import Settings from "@/components/settings";
import HeatMap from "@/components/HeatMap";
import QuoteContainer from "@/components/QuoteContainer";

export default function Index() {
  const { colors } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const heatmapData = useMemo(() => {
    const rows: string[] = [];
    const today = new Date();
    for (let i = 0; i < 160; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const repeats = Math.floor(Math.random() * 5);
      for (let j = 0; j < repeats; j++) {
        rows.push(d.toISOString().slice(0, 10));
      }
    }
    return rows;
  }, []);
  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.backGround }]}>
      <View style={styles.topBar}>
        <Pressable onPress={() => setMenuOpen(true)}>
          <Ionicons name="menu" size={29} color={colors.primary} />
        </Pressable>
        <Pressable style={[styles.channelPill, { borderColor: colors.border }]}>
          <Ionicons name="grid-outline" size={24} color={colors.primary} />
          <Text style={[styles.channelText, { color: colors.text }]}>
            All Channels
          </Text>
        </Pressable>
        <Pressable onPress={() => setSettingsOpen(true)}>
          <Ionicons name="settings-outline" size={26} color={colors.primary} />
        </Pressable>
      </View>
      <View style={styles.heatmapContainer}>
        <HeatMap
          data={heatmapData}
          weekStartsOn={0}
          cellSize={28}
          cellGap={4}
          cellRadius={5}
          headerTextFontSize={14}
          sideBarTextFontSize={12}
          isHeaderVisible
          isSidebarVisible
          scrollable
          pressable
          hoverable
        />
      </View>
      <View>
        <QuoteContainer/>
      </View>
      <SideMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />
      <Settings visible={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  topBar: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 20,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  channelPill: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.85,
    borderRadius: 22,
    paddingVertical: 5,
    paddingHorizontal: 10,
    gap: 8,
  },
  channelText: {
    fontSize: 14,
  },
  heatmapContainer: {
    flex: 0.5,
    paddingHorizontal: 12,
    paddingTop: 45,
  },
  QuoteContainer:{
    paddingVertical:8,
    paddingHorizontal:12,
  }
});
