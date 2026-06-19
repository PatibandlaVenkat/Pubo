import React from 'react';
import{StyleSheet,Text,View} from 'react-native'
import { PLATFORMS } from '@/constants/Platforms';
import { theme } from '@/constants/themes';
import { PlatformId } from '@/types/Post';

interface Props{
    content:string;
    platforms:PlatformId[];
}
export function CharacterMeter({content,platforms}:Props){
if(platforms.length==0) return null;
const length=content.length;
return(
    <View style={styles.row}>
        {platforms.map((id)=>{
            const config=PLATFORMS[id];
            const isOver=length > config.charLimit;
            return(
                <View key={id} style={styles.item}>
                    <View style={[styles.swatch,{backgroundColor:config.color}]}/>
                    <Text style={[styles.text,isOver && styles.over]}>
                        {config.label}.{length}/{config.charLimit}
                    </Text>
                </View>
            )
        })}
    </View>
)
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginTop: 8 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  swatch: { width: 6, height: 6, borderRadius: 3 },
  text: { fontSize: 12, color: theme.colors.inkMuted },
  over: { color: theme.colors.danger, fontWeight: '700' },
});
