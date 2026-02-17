import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import useTheme from '@/hooks/useTheme'
import { SafeAreaView } from 'react-native-safe-area-context'

const queued = () => {
  const {colors,isDarkMode} = useTheme();
  return (
    <SafeAreaView
     style={styles.container}
    >
    <View>
      <Text style={{color:colors.text}}>queued</Text>
    </View>
    </SafeAreaView>
  )
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#0E2A47',
  }
})
export default queued