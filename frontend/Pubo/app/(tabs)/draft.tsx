import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import useTheme from '@/hooks/useTheme'

const draft = () => {
  const {colors,isDarkMode} = useTheme();

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#0E2A47',
        flex: 1,
      }}
    >
    <View>
      <Text style={{color:colors.text}}>draft</Text>
    </View>
    </SafeAreaView>
  )
}

export default draft