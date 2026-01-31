import React from 'react';
import NewBookingScreen from '../screens/NewBookingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DashboardScreen from '../screens/DashboardScreen';
import BookingsScreen from '../screens/BookingsScreen';
import GuestCheckInScreen from '../screens/GuestCheckInScreen';
import ExploreRoomsScreen from '../screens/ExploreRoomsScreen';
import RoomDetailScreen from '../screens/RoomDetailScreen';
import ManageBookingScreen from '../screens/ManageBookingScreen';
import LoginScreen from '../screens/LoginScreen';
import StaffDashboardScreen from '../screens/StaffDashboardScreen';
import StaffSettingsScreen from '../screens/StaffSettingsScreen';
import StaffNotificationsScreen from '../screens/StaffNotificationsScreen';
import RoomTypesScreen from '../screens/RoomTypesScreen';
import CreateRoomTypeScreen from '../screens/CreateRoomTypeScreen';
import RoomTypeDetailScreen from '../screens/RoomTypeDetailScreen';
import StaffRoomDetailScreen from '../screens/StaffRoomDetailScreen';
import GuestSettingsScreen from '../screens/GuestSettingsScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            headerShown: false,
            animation: 'fade',
            contentStyle: { backgroundColor: '#0F172A' },
          }}
        >
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="StaffDashboard"
            component={StaffDashboardScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="StaffSettings"
            component={StaffSettingsScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="StaffNotifications"
            component={StaffNotificationsScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen
            name="GuestSettings"
            component={GuestSettingsScreen}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="ExploreRooms" component={ExploreRoomsScreen} />
          <Stack.Screen name="RoomDetail" component={RoomDetailScreen} />
          <Stack.Screen name="ManageBooking" component={ManageBookingScreen} />
          <Stack.Screen name="Bookings" component={BookingsScreen} />
          <Stack.Screen name="GuestCheckIn" component={GuestCheckInScreen} />
          <Stack.Screen name="RoomTypes" component={RoomTypesScreen} />
          <Stack.Screen name="CreateRoomType" component={CreateRoomTypeScreen} />
          <Stack.Screen name="RoomTypeDetail" component={RoomTypeDetailScreen} />
          <Stack.Screen name="StaffRoomDetail" component={StaffRoomDetailScreen} />
          <Stack.Screen
            name="NewBooking"
            component={NewBookingScreen}
            options={{
              headerShown: false,
              gestureEnabled: true
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import DashboardScreen from '../screens/DashboardScreen';
// import ExploreRoomsScreen from '../screens/ExploreRoomsScreen';
// import RoomDetailScreen from '../screens/RoomDetailScreen';
// import ManageBookingScreen from '../screens/ManageBookingScreen';
// import LoginScreen from '../screens/LoginScreen';
// import StaffDashboardScreen from '../screens/StaffDashboardScreen';

// const Stack = createNativeStackNavigator();

// export default function RootNavigation() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName="LoginScreen"
//         screenOptions={{
//           headerShown: false,
//           animation: 'fade',
//           contentStyle: { backgroundColor: '#0F172A' },
//         }}
//       >
//         <Stack.Screen name="LoginScreen" component={LoginScreen} />
//         <Stack.Screen 
//           name="Dashboard" 
//           component={DashboardScreen} 
//           options={{ gestureEnabled: false }}
//         />
//         <Stack.Screen 
//           name="StaffDashboard" 
//           component={StaffDashboardScreen} 
//           options={{ gestureEnabled: false }}
//         />
//         <Stack.Screen name="ExploreRooms" component={ExploreRoomsScreen} />
//         <Stack.Screen name="RoomDetail" component={RoomDetailScreen} />
//         <Stack.Screen name="ManageBooking" component={ManageBookingScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

