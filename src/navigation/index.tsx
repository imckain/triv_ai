/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { ReactElement } from 'react';
import { Button, Platform, PlatformAndroidStatic, PlatformIOSStatic, PlatformMacOSStatic, PlatformWebStatic, PlatformWindowsOSStatic } from 'react-native';
import { Details, Home } from '../screens';
import './GestureHandler';

export type StackParams = {
  Home: { modalState: boolean } | undefined;
  Details: { data: string, modalState: boolean, setModalState: React.Dispatch<React.SetStateAction<boolean>> } | undefined;
};

const Stack = createStackNavigator<StackParams>();

export function Navigation(): ReactElement {
  const checkPlatform = (platform: PlatformIOSStatic | PlatformAndroidStatic | PlatformWindowsOSStatic | PlatformMacOSStatic | PlatformWebStatic) => {
    return platform.OS === 'web'
      ? <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      : <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              headerRight: () => (
                <Button
                  onPress={() => {
                    return navigation.navigate('Details', { data: 'Data can go here' });
                  }}
                  title="Info"
                  color="black"
                />
              ),
            })}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={{
              presentation: 'modal',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>;
  };

  return checkPlatform(Platform);
}
