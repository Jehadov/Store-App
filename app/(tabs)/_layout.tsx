import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from "expo-router";
export default function TabsLayout() {
  return <Tabs screenOptions={{tabBarActiveTintColor:"tomato"}}>
    <Tabs.Screen 
    name="index"
     options={{
      headerStyle:{backgroundColor:"#f5f5f5"},
      headerShadowVisible:false,
      tabBarStyle:{
        backgroundColor:"#f5f5f5",
        borderTopWidth:0,
        elevation:0,
        shadowOpacity:0
      },
      tabBarActiveTintColor:"#6200ee",
      tabBarInactiveTintColor:"#990000ff",
      title:"Home",
      tabBarIcon: ({ color })=> <FontAwesome5 name="home" size={24} color={ color } />
      }
      
    }/>
    <Tabs.Screen 
    name="Login"
     options={{
      headerStyle:{backgroundColor:"#f5f5f5"},
      headerShadowVisible:false,
      tabBarStyle:{
        backgroundColor:"#f5f5f5",
        borderTopWidth:0,
        elevation:0,
        shadowOpacity:0
      },
      tabBarActiveTintColor:"#6200ee",
      tabBarInactiveTintColor:"#990000ff",      
      title:"loginScreen",
      tabBarIcon: ({ color }) => <AntDesign name="login" size={24} color= { color } />
    }}/>

  </Tabs>

}