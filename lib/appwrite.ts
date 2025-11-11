import { Account, Client } from "react-native-appwrite";

// Create the Appwrite client
const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!) // ✅ Appwrite endpoint URL
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!) // ✅ Your Project ID
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!); // ✅ Your app package name (for Android/iOS)

export const account = new Account(client);
