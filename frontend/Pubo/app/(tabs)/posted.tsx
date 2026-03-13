import { View, Text,StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { use } from 'react'
import useTheme from "@/hooks/useTheme";


const posted = () => {
  const {colors,isDarkMode} = useTheme();
  return (
    <SafeAreaView
     style={{    
    flex:1,
    backgroundColor: colors.backGround,}}
    >
    <View>
      <Text style={{color:colors.text}}>posted</Text>
    </View>
    </SafeAreaView>
  )
}

export default posted