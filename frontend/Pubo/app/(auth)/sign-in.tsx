import{isClerkAPIResponseError, useSignIn} from '@clerk/clerk-expo'
import{Link,useRouter} from 'expo-router'
import * as React from 'react'
import type {EmailCodeFactor} from '@clerk/types'
import { Pressable,StyleSheet,TextInput,View,Text } from 'react-native'
import { ClerkAPIError } from '@clerk/types'
import { ClerkAPIResponseError } from '@clerk/types'
import { ActivityIndicator } from 'react-native'
import { createStyles } from '@/styles/signin.styles'
import useTheme from '@/hooks/useTheme'


export default function Page(){
    const { colors, isDarkMode } = useTheme();
    const styles = createStyles(colors, isDarkMode);

    const { signIn, setActive, isLoaded } = useSignIn();
    const router=useRouter()
    const[emailAddress,setEmailAddress]=React.useState('')
    const[password,setPassword]=React.useState('')
    const[showEmailCode,setShowEmailCode]=React.useState(false)
    const[code,setCode]=React.useState('')
    const[errorMsg,setErrorMsg]=React.useState<string|null>(null)
    const[loading,setLoading]=React.useState(false)
   

    const OnSignInPress=React.useCallback(async()=>{

        if(!isLoaded){
            
            return 
        }
        setErrorMsg(null)
        setLoading(true)
        try{
            const signInAttempt=await signIn.create({
                identifier:emailAddress,
                password,
            })
            if(signInAttempt.status==='complete'){
await setActive({
    session:signInAttempt.createdSessionId,
    navigate:async({session})=>{
        if(session?.currentTask){
            //to check for the tasks and navigate to custom ui
        console.log(session?.currentTask)
        return
        }
         router.replace('/')
    },
})
            }
            else if(signInAttempt.status==="needs_second_factor"){
                const emailCodeFactor = signInAttempt.supportedSecondFactors?.find(
          (factor): factor is EmailCodeFactor => factor.strategy === 'email_code'
        )
        if(emailCodeFactor){
            await signIn.prepareSecondFactor({
                strategy:'email_code',
                emailAddressId:emailCodeFactor.emailAddressId,
            })
            setShowEmailCode(true)
        }
            }
        else{
            console.error(JSON.stringify(signInAttempt,null,2))
        }
        }
        catch(err:any){
            if(isClerkAPIResponseError(err)){
                setErrorMsg(err.errors[0].message)
                
               
            }
            else{
                setErrorMsg("Something went wrong . Please check your connection")
            }


            console.error(JSON.stringify(err,null,2))
        }
        finally{
            setLoading(false);
        }
    },[isLoaded,signIn,setActive,router,emailAddress,password])

    const OnVerifyPress=React.useCallback(async()=>{
        if(!isLoaded){
            return
        }
        setLoading(true)

        try{
            const signInAttempt=await signIn.attemptSecondFactor({
                strategy:'email_code',
                code,
            })
            if(signInAttempt.status==='complete'){
                await setActive({
                    session:signInAttempt.createdSessionId,
                    navigate:async({session})=>{
                        if(session?.currentTask){
                            console.log(session?.currentTask)
                            return
                        }
                        router.replace('/')
                    },
                })
            }
            else{

                console.error(JSON.stringify(signInAttempt,null,2))
            }

        }
        catch(err){
         if(isClerkAPIResponseError(err)){
                setErrorMsg(err.errors[0].message)
            }
            else{
                setErrorMsg("Something went wrong . Please check your connection")
            }

            console.error(JSON.stringify(err,null,2))
        }
        finally{
            setLoading(false)
        }
    },[isLoaded,signIn,setActive,router,code])

if(showEmailCode){
    return(
        <View style={styles.container}>
            <Text  style={styles.title}>
                Verify Your Email
            </Text>
            <Text style={styles.description}>
                A Verification code has been sent to your email
            </Text>
            <TextInput
            style={styles.input}
            value={code}
            placeholder='Enter verification code'
            placeholderTextColor="#666666"
            onChangeText={(code)=>setCode(code)}
            keyboardType='numeric'/>
            <Pressable style={({ pressed })=>[styles.button,pressed && styles.buttonPressed]}
                onPress={OnVerifyPress}
                disabled={loading}
                >
                    {loading?(<ActivityIndicator color="white"/>):
                    (<Text style={styles.buttonText}>Verify</Text>)
                    }
                
            </Pressable>
        </View>
    )
}
return(
    <View style={styles.container}>
        {errorMsg &&(
            <View style={styles.errorBox}>
                <Text style={styles.errorText}>{errorMsg}</Text>
            </View>
        )}
        <View style={styles.maincontainer}>
            <Text style={styles.title}>
                Sign in
            </Text>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputview}>
                <TextInput 
                style={styles.input}
                autoCapitalize='none'
                value={emailAddress}
                placeholder='Enter email'
                placeholderTextColor="#666666"
                onChangeText={(emailAddress)=>{setEmailAddress(emailAddress);
                    if(errorMsg){
                        setErrorMsg(null);
                    }
                }
                }
                keyboardType="email-address"
                />
            </View>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputview}>
            <TextInput
                style={styles.input}
                value={password}
                placeholder="Enter password"
                placeholderTextColor="#666666"
                secureTextEntry={true}
                onChangeText={(password) => {setPassword(password);
                    if(errorMsg){
                        setErrorMsg(null)
                    }
                }}
            />
        </View>
            <Pressable
            style={({pressed})=>[
                styles.button,
                (!emailAddress || !password) && styles.buttonDisabled,
                pressed && styles.buttonPressed,
            ]}
            onPress={OnSignInPress}
            disabled={!emailAddress||!password||loading}>
                {loading?(<ActivityIndicator color="white"/>)
                :(
                    <Text style={styles.buttonText}>Sign In</Text>
                )}
                

            </Pressable>
            <View style={styles.linkContainer}>
                <Text style={[styles.label,{paddingTop:3}]}>
                    Don't have an account?
                </Text>
                <Link href='/sign-up'>
                <Text style={[styles.label,{color:'#6366F1'}]}>
                    Sign up</Text>
                </Link>
            </View>
        </View>
    </View>
)
}