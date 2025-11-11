import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from "expo-router";
export default function TabsLayout() {
  return <Tabs screenOptions={{tabBarActiveTintColor:"tomato"}}>
    <Tabs.Screen 
    name="index"
     options={{
      title:"Home",
      tabBarIcon: ({ color })=> <FontAwesome5 name="home" size={24} color={ color } />
      }}/>
    <Tabs.Screen 
    name="Login"
     options={{
      title:"loginScreen",
      tabBarIcon: ({ color }) => <AntDesign name="login" size={24} color= { color } />
    }}/>
    <Tabs.Screen 
    name="auth"
     options={{
      title:"authScreen",
      tabBarIcon: ({ color }) => <AntDesign name="login" size={24} color= { color } />
    }}/>
  </Tabs>

}