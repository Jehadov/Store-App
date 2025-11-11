import { useAuth } from "@/lib/auth-contex";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
export default function AuthScreen() 
{
    const theme = useTheme();
    const [IsSignUp, setChecked] = useState<boolean>(false);
    const [Email, setEmail] = useState<string>('');
    const [Password, setPassword] = useState<string>('');
    const [error, setError] = useState<string| null>("");
    const {signIn, signUp} = useAuth();
    const router = useRouter();
    const handelSwitch = () => {
        setChecked(!IsSignUp);
    }
    const handelAuth = async () => {
      if (!Email || !Password) {
        setError('Please enter both email and password.');
        return;
      }
      if (Password.length < 6) {
        setError('the Password must be at least 6 characters long.');
        return;
      }
      
      setError(null);
      if(signUp){
          const error = await signUp(Email, Password);
          if(error){
            setError(error);
          }
        }else{
          const errot = await signIn(Email, Password);
          if(errot){
            setError(errot);
          }

            router.replace('/');
        }
    }
    return <KeyboardAvoidingView behavior={ 
        Platform.OS === 'android' ? 'padding' : 'height'}
        style={styles.container}>
        <View>
            <Text>{IsSignUp? "Create Account": "Welcome back"}  </Text>
            <TextInput 
            style={styles.input}
            label = "Email" 
            autoCapitalize="none" 
            keyboardType="email-address" 
            placeholder="Example@gmail.com"
            mode = "outlined"
            onChangeText={setEmail}
            />
            <TextInput 
            style={styles.input}
            label = "Password" 
            keyboardType="default" 
            placeholder="********"
            mode = "outlined"
            onChangeText={setPassword}
            />

            {error && <Text style = {{color: theme.colors.error }}>{error}</Text>}
            <Button style = {styles.button} mode="contained" onPress={handelAuth }> {IsSignUp? "Sign up": "Sign In "} </Button>
            <Button style = {styles.button} onPress={handelSwitch}> {IsSignUp? "I aready have an Account? Sign In?": "Don't have accout sign up" } </Button>
        </View>
    </KeyboardAvoidingView>  
}
 const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    input: {
      marginBottom: 12,
    },
    button: {
      marginTop: 12,
    },
  });      