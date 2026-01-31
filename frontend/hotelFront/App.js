import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigation from './navigation';
import { HotelProvider } from './context/HotelContext';

export default function App() {
  return (
    <HotelProvider>
      <SafeAreaProvider>
        <RootNavigation />
      </SafeAreaProvider>
    </HotelProvider>
  );
}
