import { View, Text, SafeAreaView } from 'react-native'
import React, { use } from 'react'
import useTheme from "@/hooks/useTheme";

const posted = () => {
  const {colors,isDarkMode} = useTheme();
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.backGround,
        flex: 1,
      }}
    >
    <View>
      <Text style={{color:colors.text}}>posted</Text>
    </View>
    </SafeAreaView>
  )
}

export default posted