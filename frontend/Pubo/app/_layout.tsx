import { ThemeProvider } from "@/hooks/useTheme";
import { Stack } from "expo-router";
import { View } from "react-native";
import FloatingPenButton from "@/components/FloatingPenButton";
import {ClerkProvider} from '@clerk/clerk-expo'
import{tokenCache} from '@clerk/clerk-expo/token-cache'
export default function RootLayout() {
  return(
    <ThemeProvider>
      <ClerkProvider tokenCache={tokenCache}>
<View style={{flex:1}}>
         <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
    <FloatingPenButton/>
      </View>
      </ClerkProvider>
    </ThemeProvider>
  )
}
