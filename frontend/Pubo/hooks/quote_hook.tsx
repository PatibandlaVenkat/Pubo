import{useEffect,useState,useRef} from "react"
import { useAuth } from "@clerk/clerk-expo";
const BASE_URL=process.env.EXPO_PUBLIC_BACKEND_URL;

type Quote={
    text:string;
    author:string;
}

const FALLBACK_QUOTES: Quote[] = [
    { text: "Great things are done by a series of small things brought together.", author: "Vincent van Gogh" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
    { text: "It always seems impossible until it is done.", author: "Nelson Mandela" },
];

function fallbackQuote(index: number): Quote {
    return FALLBACK_QUOTES[index % FALLBACK_QUOTES.length];
}

export const useRotationQuote=()=>{
    const{getToken}=useAuth()
    const[quote,setQuote]=useState<Quote|null>(null);
    const[isLoading,setIsLoading]=useState(true)
    const[error,setError]=useState<string|null>(null);
    const callCount=useRef(0)
    const fetchQuote=async()=>{
        try{
            if(!BASE_URL){
                throw new Error("EXPO_PUBLIC_BACKEND_URL is missing");
            }

            const token=await getToken()
            setError(null)
           
            const res=await fetch(`${BASE_URL}/quotes`,{
                headers:{
                   Authorization: `Bearer ${token}`,
                }
            });
            if(!res.ok){
                throw new Error(`Quote request failed (${res.status})`);
            }

            const data=(await res.json()) as Quote
            if(!data?.text || !data?.author){
                throw new Error("Quote response is invalid");
            }
            setQuote(data);
             callCount.current+=1;
        }
        catch(e){
            const msg=e instanceof Error? e.message:"Unknown quote fetch error"
            console.warn("Could not fetch quote; using a local fallback.",msg)
            setQuote(fallbackQuote(callCount.current));
            callCount.current+=1;
            // A fallback quote is displayed instead of an error message.
            setError(null)
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
