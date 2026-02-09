import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme'

const queued = () => {
  const {colors,isDarkMode} = useTheme();
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#0E2A47',
        flex: 1,
      }}
    >
    <View>
      <Text style={{color:colors.text}}>queued</Text>
    </View>
    </SafeAreaView>
  )
}

export default queued