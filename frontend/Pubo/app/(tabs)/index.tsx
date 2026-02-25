import { Pressable, Text, View } from "react-native";
import useTheme from "@/hooks/useTheme";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import SideMenu from "@/components/sidemenubar";
import Settings from "@/components/settings";

export default function Index() {
      const {colors,isDarkMode} = useTheme();
      const [menuOpen, setMenuOpen] = useState(false);
      const [settingsOpen, setSettingsOpen] = useState(false);
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.backGround,
        flex: 1,
      }}
    >

     {/*Top bar*/}
    <View style={{paddingLeft:25,paddingBottom:35,paddingTop:10,flexDirection: "row" , justifyContent: "space-between",alignItems:"center"}}>

      <Pressable onPress={() => setMenuOpen(true)}>
        <Ionicons name="menu" size={29} color={'#fff'}/>
      </Pressable>
      
      <Pressable style={{flexDirection:'row' , alignItems: 'center', borderWidth:0.17 , borderColor:'#fff', borderRadius:22}}>
        <Ionicons name="grid-outline" size={25} color={'#fff'} style={{padding:5,paddingLeft:10}}/>
        <Text style={{marginLeft: 8,color:"#fff",paddingRight: 10}}>All Chanels</Text>
      </Pressable>

      <Pressable onPress={() => setSettingsOpen(true)}  style={{paddingRight:25}}>
        <Ionicons name="settings-outline" size={26} color={'#fff'} />
      </Pressable>

    </View>

    {/*BADGES*/}
    <View style={{paddingHorizontal:10}}>
      <Text style={{ color:'#fff',fontWeight: 'bold',fontSize:27 ,paddingLeft:15 ,paddingBottom:15}} >
        Badges
      </Text>
      <View style={{borderWidth:1,borderColor:'#fff',height:'66%',paddingHorizontal:25,borderRadius:23}}>
        <Text style={{color:'#fff'}}>............</Text>
      </View>
    </View>

    <SideMenu visible={menuOpen} onClose={() => setMenuOpen(false)} />

    </SafeAreaView>
    
  );
}
