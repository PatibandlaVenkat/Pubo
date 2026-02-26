import { isClerkAPIResponseError, useSignUp } from "@clerk/clerk-expo";
import{Link,useRouter} from "expo-router"
import { StyleSheet,View,Text,Pressable, TextInput } from "react-native";
import * as React from "react"

export default function Page(){
    const{isLoaded,signUp,setActive}=useSignUp()
    const router=useRouter()
    const[emailAddress,setEmailAddress]=React.useState('')
    const[password,setPassword]=React.useState('')
    const[pendingVerification,setPendingVerification]=React.useState(false)
    const[code,setCode]=React.useState('')
    const[errorMsg,setErrorMsg]=React.useState<string|null>(null)


    const onSignUpPress=async()=>{
        if(!isLoaded){
             setErrorMsg(null)
            return
           
        }
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
    }
    const onVerifyPress=async()=>{
        if(!isLoaded){
             setErrorMsg(null)
            return
        }
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
                   <Pressable style={({pressed})=>[styles.button,pressed && styles.buttonPressed]} onPress={onVerifyPress}>
                    <Text style={styles.buttonText}>Verify</Text>
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
            <Text style={styles.title}>
                Sign up
            </Text>
            <Text style={styles.label}>Email address</Text>
             <TextInput
        style={styles.input}
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        placeholderTextColor="#666666"
        onChangeText={(email) => setEmailAddress(email)}
        keyboardType="email-address"
      />
       <Text style={styles.label}>Password</Text>
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
        <Pressable
        style={({ pressed }) => [
          styles.button,
          (!emailAddress || !password) && styles.buttonDisabled,
          pressed && styles.buttonPressed,
        ]}
        onPress={onSignUpPress}
        disabled={!emailAddress || !password}
      >
         <Text style={styles.buttonText}>Continue</Text>
      </Pressable>
      <View style={styles.linkContainer}>
        <Text>
            Have an account?
        </Text>
        <Link href='/sign-in'>
        <Text>
            Sign in</Text></Link>
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