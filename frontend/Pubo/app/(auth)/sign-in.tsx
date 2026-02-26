import{isClerkAPIResponseError, useSignIn} from '@clerk/clerk-expo'
import{Link,useRouter} from 'expo-router'
import * as React from 'react'
import type {EmailCodeFactor} from '@clerk/types'
import { Pressable,StyleSheet,TextInput,View,Text } from 'react-native'
import { ClerkAPIError } from '@clerk/types'
import { ClerkAPIResponseError } from '@clerk/types'


export default function Page(){
    const{signIn,setActive,isLoaded}=useSignIn()
    const router=useRouter()
    const[emailAddress,setEmailAddress]=React.useState('')
    const[password,setPassword]=React.useState('')
    const[showEmailCode,setShowEmailCode]=React.useState(false)
    const[code,setCode]=React.useState('')
    const[errorMsg,setErrorMsg]=React.useState<string|null>(null)
   

    const OnSignInPress=React.useCallback(async()=>{
        if(!isLoaded){
            setErrorMsg(null)
            return 
        }
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
    },[isLoaded,signIn,setActive,router,emailAddress,password])

    const OnVerifyPress=React.useCallback(async()=>{
        if(!isLoaded){
            return
        }
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
                >
                <Text style={styles.buttonText}>Verify</Text>
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
        <Text style={styles.title}>
            Sign in
        </Text>
        <Text style={styles.label}>Email Address</Text>
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

    <Text style={styles.label}>Password</Text>
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

        <Pressable
        style={({pressed})=>[
            styles.button,
            (!emailAddress || !password) && styles.buttonDisabled,
            pressed && styles.buttonPressed,
        ]}
        onPress={OnSignInPress}
        disabled={!emailAddress||!password}>
            <Text style={styles.buttonText}>Sign In</Text>

        </Pressable>
        <View style={styles.linkContainer}>
            <Text >
                Don't have an account?
            </Text>
            <Link href='/sign-up'>
            <Text>
                Sign up</Text>
            </Link>
        </View>

    </View>
)

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.8,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  linkContainer: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 12,
    alignItems: 'center',
  },
  errorBox: {
    backgroundColor: '#FEE2E2', // Light red background
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EF4444', // Red border
    marginBottom: 16,
},
errorText: {
    color: '#B91C1C', // Dark red text
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
},

})