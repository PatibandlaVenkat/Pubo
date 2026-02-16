import { View, Text,StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { use } from 'react'
import useTheme from "@/hooks/useTheme";

const posted = () => {
  const {colors,isDarkMode} = useTheme();
  return (
    <SafeAreaView
     style={styles.container}
    >
    <View>
      <Text style={{color:colors.text}}>posted</Text>
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

export default posted