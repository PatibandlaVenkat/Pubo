import { View,Text } from "react-native";
import{Pressable,StyleSheet} from 'react-native'
import{useRouter} from 'expo-router'
import{useClerk} from '@clerk/clerk-expo'

//error handling is still absent for this button but it is not necessary and it can implemented easily
export const SignOutButton=()=>{
    const{signOut}=useClerk()
    const router=useRouter()
    const handleSignOut=async()=>{
        try{
            await signOut()
            router.replace('/(auth)/sign-in')
        }
        catch(err){
console.error(JSON.stringify(err,null,2))
        }
    }
    return(
        <Pressable style={({pressed})=>[styles.button, pressed && styles.buttonPressed]} onPress={handleSignOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0a7ea4',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
})