import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen'

const Stack = createStackNavigator()

export default function SignOutStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="SignInScreen" component={SignInScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}