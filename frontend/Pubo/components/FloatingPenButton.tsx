import React from "react";
import { TouchableOpacity,StyleSheet,Platform } from "react-native";
import{Ionicons} from '@expo/vector-icons'
import { FontAwesome5 } from "@expo/vector-icons";
import{useSafeAreaInsets} from 'react-native-safe-area-context'
import useTheme from "@/hooks/useTheme";
export  default function FloatingPenButton(){
    const{colors}=useTheme();
    const insets=useSafeAreaInsets();
    return(
        <TouchableOpacity
        activeOpacity={0.7}
            style={
                [
                    styles.container,{
                        backgroundColor:colors.primary,
                        bottom:insets.bottom+20,
                    },
                ]
            }
            onPress={()=>alert("button pressed")}
            >
                
                <FontAwesome5 name="edit" size={24} color="black"/>
            </TouchableOpacity>
        
    );

}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    margin:40,
    marginRight:20,
    marginBottom:80,
    
    // Shadow for Android
    elevation: 6,
  },
});