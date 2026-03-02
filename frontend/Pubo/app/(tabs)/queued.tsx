import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme'
import { SafeAreaView } from 'react-native-safe-area-context'

const queued = () => {
  const {colors,isDarkMode} = useTheme();
  return (
    <SafeAreaView
     style={{    
    flex:1,
    backgroundColor: colors.backGround,}}
    >
    <View>
      <Text style={{color:colors.text}}>queued</Text>
    </View>
    </SafeAreaView>
  )
}
export default queued