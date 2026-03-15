import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import{Link,useRouter} from "expo-router"
import { StyleSheet,View,Text,Pressable, TextInput } from "react-native";
import * as React from "react"
import{ActivityIndicator} from "react-native"
import { createStyles } from '@/styles/signin.styles'
import useTheme from '@/hooks/useTheme'

export default function Page(){
    const { colors, isDarkMode } = useTheme();
    const styles = createStyles(colors, isDarkMode);

    const{isLoaded,signUp,setActive}=useSignUp()
    const router=useRouter()
    const[emailAddress,setEmailAddress]=React.useState('')
    const[password,setPassword]=React.useState('')
    const[pendingVerification,setPendingVerification]=React.useState(false)
    const[code,setCode]=React.useState('')
    const[errorMsg,setErrorMsg]=React.useState<string|null>(null)
    const[loading,setLoading]=React.useState(false)


    const onSignUpPress=async()=>{
        if(!isLoaded){
            
            return
           
        }
         setErrorMsg(null)
         setLoading(true)
        try{
            await signUp.create({
                emailAddress,
                password
            })
            await signUp.prepareEmailAddressVerification({
                strategy:'email_code'
            })
            setPendingVerification(true)
            //to set it as true and then show the second form
        }
        catch(err){
            if(isClerkAPIResponseError(err)){
                setErrorMsg(err.errors[0].message)
            }
            else{
                setErrorMsg("Check you Internet connection and try again")
            }
            console.error(JSON.stringify(err,null,2))
        }
        finally{
            setLoading(false)
        }
    }
    const onVerifyPress=async()=>{
        if(!isLoaded){
            
            return
        }
         setErrorMsg(null)
         setLoading(true)
        try{
            const signUpAttempt=await signUp.attemptEmailAddressVerification({
                code,
            })

            if(signUpAttempt.status==='complete'){
                await setActive({
                    session:signUpAttempt.createdSessionId,
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
                console.error(JSON.stringify(signUpAttempt,null,2))
            }
        }
        catch(err){
             if(isClerkAPIResponseError(err)){
                setErrorMsg(err.errors[0].message)
            }
            else{
                setErrorMsg("Check you Internet connection and try again")
            }
            console.error(JSON.stringify(err,null,2))
        }
        finally{
            setLoading(false)
        }
    }
    if(pendingVerification){
        return(
            
            <View style={styles.container}>
                {errorMsg && (
                    <View style={styles.errorBox}>
                        <Text style={styles.errorText}>
{errorMsg}
                        </Text>
                    </View>
                )}
                <Text style={styles.title}>
                    Verify your email
                </Text>
                <Text style={styles.description}>A verification code has been sent to your email</Text>
                <TextInput
                 style={styles.input}
                    value={code}
                    placeholder="Enter your verification code"
                    placeholderTextColor="#666666"
                    onChangeText={(code)=>{setCode(code);
                    if(errorMsg){
                        setErrorMsg(null)
                    }
                    }}

                    keyboardType="numeric"
                   />
                   <Pressable style={({pressed})=>[styles.button,pressed && styles.buttonPressed]} onPress={onVerifyPress}
                    disabled={loading}>
                   {loading?(<ActivityIndicator color="white"/>):
                   ( <Text style={styles.buttonText}>Verify</Text>)
                   }
                   
                   </Pressable>

                
            </View>
        )
    }
    return(
        <View style={styles.container}>
            {errorMsg && (<View style={styles.errorBox}>
                <Text style={styles.errorText}>
                    {errorMsg}
                </Text>
            </View>)}
            <View style={styles.maincontainer}>
                <Text style={styles.title}>
                    Sign up
                </Text>
                <Text style={styles.label}>Email address</Text>
                <View style={styles.inputview}>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        value={emailAddress}
                        placeholder="Enter email"
                        placeholderTextColor="#666666"
                        onChangeText={(email) => setEmailAddress(email)}
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
                onChangeText={(password) => {setPassword(password)
                    if(errorMsg){
                        setErrorMsg(null)
                    }
                }}
            />
        </View>
            <Pressable
            style={({ pressed }) => [
            styles.button,
            (!emailAddress || !password) && styles.buttonDisabled,
            pressed && styles.buttonPressed,
            ]}
            onPress={onSignUpPress}
            disabled={!emailAddress || !password || loading}
        
        >
            {loading?(<ActivityIndicator color="white"/>)
            :
            (<Text style={styles.buttonText}>Continue</Text>)}
            
        </Pressable>
        <View style={styles.linkContainer}>
            <Text style={[styles.label,{paddingTop:3}]}>
                Have an account?
            </Text>
            <Link href='/sign-in'>
            <Text style={[styles.label,{color:'#6366F1'}]}>
                Sign in</Text></Link>
        </View>
            </View>
        </View>
    )
}
