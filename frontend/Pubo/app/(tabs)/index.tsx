import { Pressable, Text, View, StyleSheet } from "react-native";
import { useState, useEffect, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from '@clerk/clerk-expo';

// Internal Imports
import useTheme from "@/hooks/useTheme";
import SideMenu from "@/components/sidemenubar";
import Settings from "@/components/settings";
import HeatMap from "@/components/HeatMap";
import QuoteContainer from "@/components/QuoteContainer";

export default function Index() {
  const { colors } = useTheme();
  
  // 1. Clerk Authentication Hooks
  const { isLoaded, isSignedIn, getToken } = useAuth();
  
  // 2. Local State
  const [token, setToken] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // 3. Fetch Token automatically when signed in
  useEffect(() => {
    const fetchToken = async () => {
      // Check if Clerk has loaded and user is signed in
      if (isLoaded && isSignedIn) {
        try {
          const fetchedToken = await getToken();
          setToken(fetchedToken);
          
          // This will now log the actual token to your console
          console.log("--- CLERK SESSION TOKEN ---");
          console.log(fetchedToken);
          console.log("---------------------------");
        } catch (error) {
          console.error("Error retrieving Clerk token:", error);
        }
      }
    };

    fetchToken();
  }, [isLoaded, isSignedIn]); // Only runs when auth state changes

  // 4. Heatmap Data Logic
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
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Pressable onPress={() => setMenuOpen(true)}>
          <Ionicons name="menu" size={29} color={colors.primary} />
        </Pressable>

        <Pressable onPress={() => setSettingsOpen(true)}>
          <Ionicons name="settings-outline" size={26} color={colors.primary} />
        </Pressable>
      </View>

      {/* Heatmap Section */}
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

      {/* Quotes Section */}
      <View style={styles.quoteWrapper}>
        <QuoteContainer />
      </View>

      {/* Overlays */}
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
  heatmapContainer: {
    flex: 0.5,
    paddingHorizontal: 12,
    paddingTop: 45,
  },
  quoteWrapper: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  }
});
