import { SafeAreaView, Text, View } from "react-native";
import useTheme from "@/hooks/useTheme";

export default function Index() {
      const {colors,isDarkMode} = useTheme();
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.backGround,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
          <View>
      <Text style={{color:colors.text}}>Home</Text>
    </View>
    </SafeAreaView>
  );
}
