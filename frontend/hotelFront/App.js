import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigation from './navigation';

export default function App() {
  return(
    <SafeAreaProvider>
   <RootNavigation />
   </SafeAreaProvider>
  )

}
