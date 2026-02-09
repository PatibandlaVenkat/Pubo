import useTheme from "@/hooks/useTheme";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import { styles } from '../styles/SideMenu.styles'


type SideMenuProps={
  visible: boolean;
  onClose: () => void;
};

export default function SideMenu({ visible, onClose } : SideMenuProps) {

  const { width } = useWindowDimensions();
  const {colors}= useTheme();

  if(!visible) return null;

  return(
    <View style={styles.overlay}>
      <View style={[styles.menu,{width: width * 0.75,backgroundColor:colors.sidebar}]}>
        <Text style={styles.title}>Menu</Text>

        <View style={{height:1, backgroundColor:'#fff',width:'100%'}}/>

        <Pressable style={styles.item}>
          <Text style={styles.text}>Home</Text>
        </Pressable>

        <View style={styles.divider}/>

        <Pressable style={styles.item}>
          <Text style={styles.text}>profile</Text>
        </Pressable>

        <View style={styles.divider}/>

        <Pressable style={styles.item}>
          <Text style={styles.text}>Settings</Text>
        </Pressable>

        <View style={styles.divider}/>

        <Pressable style={styles.item}>
          <Text style={styles.text}>Explore</Text>
        </Pressable>

        <View style={styles.divider}/>

      </View>

        <Pressable style={styles.backdrop} onPress={onClose}/>

    </View>
  )

}