import{useEffect,useState,useRef} from "react"
const BASE_URL=process.env.EXPO_PUBLIC_BACKEND_URL;

type Quote={
    text:string;
    author:string;
}
export const useRotationQuote=()=>{
    
    const[quote,setQuote]=useState<Quote|null>(null);
    const[isLoading,setIsLoading]=useState(true)
    const[error,setError]=useState<string|null>(null);
    const callCount=useRef(0)
    const fetchQuote=async()=>{
        if(!BASE_URL){
            setError("EXPO_PUBLIC_BACKEND_URL is missing")
            setIsLoading(false)
            return;
        }
        try{
            setError(null)
           
            if(callCount.current%5==0){
                await fetch(`${BASE_URL}/quotes/refresh`);
            }
            const res=await fetch(`${BASE_URL}/quotes`);//fetch sends the recieve object which is internally a text over http even the backend sends a json response so we parse the res object to json type for the use 
            const data=(await res.json()) as Quote //derserilisation like changing the backends response to typescript type quote 
            setQuote(data);
             callCount.current+=1;
        }
        catch(e){
            const msg=e instanceof Error? e.message:"Unknown quote fetch error"
            setError(msg)
        }
        finally{
            setIsLoading(false)
        }
    }
    //Side effects (API calls, timers) must be inside useEffect
    useEffect(()=>{
        fetchQuote();
        const interval=setInterval(fetchQuote,120000);
        return ()=>clearInterval(interval)
    },[]);
    return {quote,isLoading,error}
}