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
    const [error, setError] = useState<string| null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false); // Added loading state
    const {signIn, signUp} = useAuth();
    const router = useRouter(); // Keep router for now, though we'll let RouteGuard handle navigation

    const handelSwitch = () => {
        setChecked(!IsSignUp);
        setError(null); // Clear errors when switching
    }

    const handelAuth = async () => {
      if (!Email || !Password) {
        setError('Please enter both email and password.');
        return;
      }
      // Appwrite default is 8 characters, not 6
      if (Password.length < 8) { 
        setError('The Password must be at least 8 characters long.');
        return;
      }
      
      setError(null);
      setIsLoading(true); // Start loading

      let authError: string | null = null;

      // --- THIS IS THE MAIN FIX ---
      // We check the IsSignUp state variable, not the signUp function.
      if (IsSignUp) {
          authError = await signUp(Email, Password);
      } else {
          authError = await signIn(Email, Password);
      }
      
      setIsLoading(false); // Stop loading

      if (authError) {
          setError(authError);
      } else {
          // On success, the RouteGuard in your _layout.tsx will
          // automatically see the new 'user' and navigate to "/"
          // We no longer call router.replace('/') here, as it's handled automatically.
      }
    }

    return <KeyboardAvoidingView behavior={ 
        Platform.OS === 'android' ? 'padding' : 'height'}
        style={styles.container}>
        <View>
            <Text variant="headlineMedium" style={styles.title}>{IsSignUp? "Create Account": "Welcome Back"} </Text>
            <TextInput 
                style={styles.input}
                label = "Email" 
                autoCapitalize="none" 
                keyboardType="email-address" 
                placeholder="Example@gmail.com"
                mode = "outlined"
                onChangeText={setEmail}
                value={Email}
                disabled={isLoading}
            />
            <TextInput 
                style={styles.input}
                label = "Password" 
                keyboardType="default" 
                placeholder="********"
                mode = "outlined"
                onChangeText={setPassword}
                value={Password}
                secureTextEntry // Hide password
                disabled={isLoading}
            />

            {error && <Text style = {{color: theme.colors.error, marginBottom: 10 }}>{error}</Text>}
            
            <Button 
                style = {styles.button} 
                mode="contained" 
                onPress={handelAuth}
                disabled={isLoading} // Disable button when loading
                loading={isLoading} // Show spinner in button
            >
                {IsSignUp? "Sign up": "Sign In"}
            </Button>
            <Button 
                style = {styles.button} 
                onPress={handelSwitch}
                disabled={isLoading}
            >
                {/* Corrected a small typo here */}
                {IsSignUp? "Already have an Account? Sign In": "Don't have an account? Sign Up" }
            </Button>
        </View>
    </KeyboardAvoidingView>  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    title: {
      marginBottom: 24,
      textAlign: 'center',
    },
    input: {
      marginBottom: 12,
    },
    button: {
      marginTop: 12,
    },
});