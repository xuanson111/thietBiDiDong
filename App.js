import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import BillScreen from './components/BillScreen';
import UserScreen from './components/UserScreen';
import RoomScreen from './components/RoomScreen';
import RevenueScreen from './components/RevenueScreen';
import RoomDetail from './components/RoomDetail';
import addRoom from './components/addRoomScreen';
import billDetail from './components/billDetail';
import billAdd from './components/addBill';
import baoMat from './components/baoMat';


const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}></Stack.Screen>
          
          <Stack.Screen name="BillScreen" component={BillScreen} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="billDetail" component={billDetail} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="billAdd" component={billAdd} options={{headerShown: false}}></Stack.Screen>
          
          <Stack.Screen name="RoomScreen" component={RoomScreen} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="addRoom" component={addRoom} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="RoomDetail" component={RoomDetail} options={{headerShown: false}}></Stack.Screen>
          
          <Stack.Screen name="UserScreen" component={UserScreen} options={{headerShown: false}}></Stack.Screen>
          <Stack.Screen name="baoMat" component={baoMat} options={{headerShown: false}}></Stack.Screen>
          
          <Stack.Screen name="RevenueScreen" component={RevenueScreen} options={{headerShown: false}}></Stack.Screen>

        </Stack.Navigator>
    </NavigationContainer>
  )
}
