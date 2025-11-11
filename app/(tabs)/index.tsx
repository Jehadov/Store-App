import { useAuth } from "@/lib/auth-contex";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
export default function Index() {
  const {signOut} = useAuth();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button mode = "text" onPress={signOut}>Sign Out</Button>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
