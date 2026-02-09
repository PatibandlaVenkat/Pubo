import useTheme from "@/hooks/useTheme";
import { Pressable, Text, useWindowDimensions, View } from "react-native";


type SettingsProps={
  visible: boolean;
  onClose: () => void;
};

export default function Settings({ visible, onClose }: SettingsProps){
  const {width} = useWindowDimensions();
  const {colors} = useTheme();

  if(!visible) return null;

  return(
    <View>
      <View>
        <Text>Settings</Text>

        <Pressable>
          <Text>Platforms</Text>
        </Pressable>

        <Pressable>
          <Text>Profile</Text>
        </Pressable>

        <Pressable>
          <Text></Text>
        </Pressable>

      </View>
    </View>
  )
}