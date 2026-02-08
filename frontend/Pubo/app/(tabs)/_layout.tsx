import { AntDesign, Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Tabs } from "expo-router";
import useTheme from '@/hooks/useTheme';

export default function TabLayout(){
  const {colors, isDarkMode} = useTheme();
  return(
    <Tabs
    screenOptions={{
      // headerShadowVisible: false,
      headerShown: false,
      tabBarStyle:{
        backgroundColor: colors.backGround,
        borderColor: colors.border,
      },
      headerStyle:{
        backgroundColor:colors.backGround,
      },
      tabBarActiveTintColor:colors.primary,
    }}
    >
      <Tabs.Screen name="index"
      options={{
        title:'Home',
        tabBarIcon: ({ color,focused }) => <AntDesign size={focused ? 29 : 25} name="home" color={color}/>
      }}
      />
      <Tabs.Screen name="draft"
      options={{
        title:'Drafts',
        tabBarIcon:({ color,focused }) => <Ionicons name="document-text-outline" size={focused ? 29 : 25} color={color}/>
      }}
      />
      <Tabs.Screen name="posted"
      options={{
        title:'Posted',
        tabBarIcon:({ color,focused }) => <FontAwesome5 name="paper-plane" size={focused ? 27 : 23} color={color}/>
      }}
      />
      <Tabs.Screen name="queued"
      options={{
        title:'Queued',
        tabBarIcon:({ color,focused }) => <Ionicons name="list" size={focused ? 29 : 25} color={color}/>
      }}
      />
    </Tabs>
  )
}