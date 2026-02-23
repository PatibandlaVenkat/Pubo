import { ThemeProvider } from "@/hooks/useTheme";
import { Slot, Stack } from "expo-router";
import { View } from "react-native";
import FloatingPenButton from "@/components/FloatingPenButton";
import {ClerkProvider,ClerkLoaded,useAuth} from '@clerk/clerk-expo'
import{tokenCache} from '@clerk/clerk-expo/token-cache'
import{useRouter,useSegments} from 'expo-router'
import { useEffect } from "react";
function InitialLayout(){
  const{isLoaded,isSignedIn}=useAuth()
  const router=useRouter()
  const segments=useSegments()
  useEffect(()=>{
    if(!isLoaded){
      return
    }
    const InAuthGroup= segments[0]==='(auth)'
    if(isSignedIn && InAuthGroup){
      router.replace("/(tabs)")
    }
    else if(!isSignedIn){
      router.replace("/sign-in")
    }

  },[isSignedIn,isLoaded])
  return <Slot/>

}
// export default function RootLayout() {
//   return(
//     <ThemeProvider>
//       <ClerkProvider tokenCache={tokenCache}>
// <View style={{flex:1}}>
//          <Stack>
//       <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
//       <Stack.Screen name="(home)" options={{ headerShown: false }} />
//       <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//     </Stack>
//     <FloatingPenButton/>
//       </View>
//       </ClerkProvider>
//     </ThemeProvider>
//   )
// }
export default function RootLayout(){
  return(
    <ClerkProvider tokenCache={tokenCache}>
      <ClerkLoaded>
        <ThemeProvider>
          <InitialLayout/>
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  )
}
