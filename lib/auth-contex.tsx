import React, { createContext, useContext, useEffect } from "react";
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

// Create account instance (Appwrite)

// AuthProvider component wraps the app and provides signIn/signUp functions
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<Models.User<Models.Preferences> | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      const session = await account.get();
      setUser(session);
    } catch(error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  const signUp = async (email: string, password: string) => {
    try {
      await account.create(ID.unique(), email, password);
      await signIn(email, password);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "An unknown error occurred.";
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      await account.createEmailPasswordSession(email, password);
      const session = await account.get();
      setUser(session);
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      }
      return "An unknown error occurred.";
    }
  };

  const signOut = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
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


