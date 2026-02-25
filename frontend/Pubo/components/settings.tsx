import useTheme from "@/hooks/useTheme";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import { styles } from "../styles/settings.styles";

type SettingsProps={
  visible: boolean;
  onClose: () => void;
};

export default function Settings({ visible, onClose }: SettingsProps){

  const {width} = useWindowDimensions();
  const {colors} = useTheme();

  if(!visible) return null;

  return(
    <View style={styles.overlay}>
      <View style={[styles.settings,{width:width*0.75,backgroundColor:colors.sidebar}]}>
        <Text style={styles.title}>Settings</Text>

        <View style={{height:1,backgroundColor:'#fff',width:'100%'}}></View>

        <Pressable style={styles.item}>
          <Text>Platforms</Text>
        </Pressable>

        <View style={styles.divider}></View>

        <Pressable style={styles.item}>
          <Text>Profile</Text>
        </Pressable>

        <View style={styles.divider}></View>

      </View>
      <Pressable style={styles.backdrop} onPress={onClose} />
    </View>
  )
}