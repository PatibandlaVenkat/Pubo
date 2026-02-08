import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme'

const draft = () => {
  const {colors,isDarkMode} = useTheme();

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#0E2A47',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
    <View>
      <Text style={{color:colors.text}}>draft</Text>
    </View>
    </SafeAreaView>
  )
}

export default draft