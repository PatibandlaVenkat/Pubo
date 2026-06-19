import React  from "react";
import{StyleSheet,View,Text,TouchableOpacity} from "react-native"
import { PLATFORM_LIST } from "@/constants/Platforms";
import { theme } from "@/constants/themes";
import { PlatformId } from "@/types/Post";

interface Props{
    selected:PlatformId[];
    onToggle:(id:PlatformId)=>void;
}
export function PlatformSelector({selected,onToggle}:Props){
    return(
        <View style={styles.row}>
            {PLATFORM_LIST.map((platform)=>{
                const isActive=selected.includes(platform.id);
                return(
                    <TouchableOpacity key={platform.id} onPress={()=>onToggle(platform.id)} style={[styles.chip,isActive && {backgroundColor:platform.color,borderColor:platform.color}]}>
                        <View style={[styles.dot,{backgroundColor:platform.color,borderColor:platform.color}]}>
                            <View style={[styles.dot,{backgroundColor:isActive?'#fff':platform.color}]}/>
                            <Text style={[styles.label,isActive && styles.labelActive]}>
                                {platform.label}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            })}
        </View>
    )

}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  dot: { width: 8, height: 8, borderRadius: 4 },
  label: { fontSize: theme.font.label, color: theme.colors.ink, fontWeight: '600' },
  labelActive: { color: '#fff' },
});