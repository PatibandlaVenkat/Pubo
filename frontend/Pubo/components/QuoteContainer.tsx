import{View} from "react-native"
import { useRotationQuote } from "@/hooks/quote_hook"
import AnimatedQuote from "./Quote"
const QuoteContainer=()=>{
const{quote,isLoading,error}=useRotationQuote();
return(
    <View style={{justifyContent:"center"}}>
        <AnimatedQuote quote={quote} isLoading={isLoading} error={error}/>
    </View>
)
}
export default QuoteContainer