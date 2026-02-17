import { ThemeProvider } from "@/hooks/useTheme";
import { Stack } from "expo-router";
import { View } from "react-native";
import FloatingPenButton from "@/components/FloatingPenButton";

export default function RootLayout() {
  return(
    <ThemeProvider>
      <View style={{flex:1}}>
         <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
    </Stack>
    <FloatingPenButton/>
      </View>
   
    </ThemeProvider>
  )
}
