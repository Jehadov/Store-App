import React, { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";

// Define what functions and data the Auth context provides
type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<string | null>;
  signUp: (email: string, password: string) => Promise<string | null>;
  signOut?: () => Promise<void>;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component wraps the app and provides signIn/signUp functions
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("[AuthContext] Checking for existing user session...");
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const session = await account.get();
      console.log("[AuthContext] Found existing session for user:", session.name);
      setUser(session);
    } catch(error) {
      console.log("[AuthContext] No existing session found.");
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    console.log("[AuthContext] Attempting to SIGN UP with:", email);
    try {
      await account.create(ID.unique(), email, password);
      console.log("[AuthContext] Sign up successful. Now signing in...");
      await signIn(email, password); // Log in right after sign up
      return null;
    } catch (error) {
      if (error instanceof Error) {
        console.error("[AuthContext] Sign UP Error:", error.message);
        return error.message;
      }
      return "An unknown error occurred during sign up.";
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log("[AuthContext] Attempting to SIGN IN with:", email);
    try {
      await account.createEmailPasswordSession(email, password);
      const session = await account.get();
      console.log("[AuthContext] Sign IN successful. Setting user:", session.name);
      setUser(session); // <-- This is what lets you into the app
      return null;
    } catch (error) {
      if (error instanceof Error) {
        console.error("[AuthContext] Sign IN Error:", error.message);
        return error.message;
      }
      return "An unknown error occurred during sign in.";
    }
  };

  const signOut = async () => {
    console.log("[AuthContext] Attempting to SIGN OUT...");
    try {
      await account.deleteSession("current");
      console.log("[AuthContext] Sign out successful. Clearing user.");
      setUser(null); // <-- This is what logs you out
    } catch (error) {
      console.error("[AuthContext] Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{user, isLoading, signIn, signUp, signOut}}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth anywhere in your app
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}