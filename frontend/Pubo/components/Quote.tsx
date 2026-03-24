import{useEffect,useState} from "react"
import { ActivityIndicator,Text,View } from "react-native"
import Animated,{useAnimatedStyle,useSharedValue,withTiming} from "react-native-reanimated"

type Quote={
    text:string;
    author:string;
};
type AnimatedQuoteProps={
    quote:Quote|null;
    isLoading:boolean;
    error:string|null;
}
const AnimatedQuote:React.FC<AnimatedQuoteProps>=({quote,isLoading,error})=>{
    const opacity=useSharedValue(1);
    const[displayQuote,setDisplayQuote]=useState<Quote|null>(quote);
    useEffect(()=>{
        if(!quote)return;
    opacity.value=withTiming(0,{duration:350});
    const t=setTimeout(()=>{
        setDisplayQuote(quote);
        opacity.value=withTiming(1,{duration:350});
    },350)
    return ()=>clearTimeout(t);
    },[quote])
   const animatedStyle=useAnimatedStyle(()=>({
    opacity:opacity.value
   }));
   if(isLoading){
    return(
        <View style={{minHeight:80,justifyContent:"center",alignItems:"center"}}>
            <ActivityIndicator/>
        </View>
    )
   }
   if(error){
    return(
        <View style={{paddingHorizontal:20}}>
            <Text style={{textAlign:"center",color:"tomato"}}>{error}</Text>
        </View>
    )
   }
   if(!displayQuote) return null
   return (
    <View style={{justifyContent:"center",alignItems:"center",paddingHorizontal:20}}>
        <Animated.View style={animatedStyle}>
            <Text style={{fontSize: 30,textAlign:"center",fontStyle:"italic"}}>
                "{displayQuote.text}"
            </Text>
            <Text style={{fontSize:15,marginTop:8,color:"black",textAlign:"center"}}>
                -{displayQuote.author}
            </Text>
        </Animated.View>
    </View>
   )


}
export default AnimatedQuote