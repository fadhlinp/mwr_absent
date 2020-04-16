import * as React from 'react';
import { Image } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Alert, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { s, vs } from 'react-native-size-matters';

import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';


import { STYLE, STRING, IMAGE_URL } from "./constant";
import { Text } from "./components";
import { removeFromStorage } from "./utils";

import SignInScreen from './screens/SignInScreen'
import DrawerScreen from './screens/DrawerScreen'

import RootNavigator from './navigator/RootNavigator'

import * as actions from './actions'
import store from "./store";
import { Provider, useSelector, useDispatch, useStore } from "react-redux";

function AppSignInScreen({ navigation }) {
    const { signIn } = React.useContext(AuthContext);

    return (
        <SignInScreen navToHome={() => {
            signIn()
        }} />
    )
}

const Drawer = createDrawerNavigator();
const AppDrawerScreen = ({ navigation }) => {
    let userData = useSelector(state => state.authReducers.userData);

    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawerContent userData={userData} {...props} />}>
            <Drawer.Screen name="Home" component={DrawerScreen} />
        </Drawer.Navigator>
    )
};

function CustomDrawerContent({ navigation, progress, userData, ...rest }) {
    const { signOut } = React.useContext(AuthContext);
    return (
        <DrawerContentScrollView {...rest} >
            <Header userData={userData} />
            <DrawerItemList navigation={navigation} {...rest} />
            <DrawerItem label="Log out" onPress={() =>
                Alert.alert('Logout', 'Are you sure want to log out?', [
                    { text: 'No', onPress: () => { } },
                    {
                        text: 'Ok', onPress: () => {
                            removeFromStorage(STRING.LOGIN_TOKEN);
                            signOut()
                        }
                    }
                ], { cancelable: true })
            } />
        </DrawerContentScrollView>
    );
}

function Header({ userData }) {
    return (
        <LinearGradient colors={[STYLE.COLOR.MWR_RED, STYLE.COLOR.MWR_RED_2]} style={styles.linearGradient}>
            <View style={{ position: 'absolute', bottom: vs(20), left: s(10) }}>
                <View style={styles.drawerHeader}>
                    <Image
                        source={IMAGE_URL.LOGO_ROUND}
                        style={{
                            width: s(Image.resolveAssetSource(IMAGE_URL.LOGO).width * 0.18),
                            height: vs(Image.resolveAssetSource(IMAGE_URL.LOGO).height * 0.2),
                            resizeMode: "contain"
                        }}
                    />
                </View>
                <Text style={{ textAlign: 'left', color: 'white', fontFamily: 'OpenSans-SemiBold', fontSize: STYLE.SIZE.SUB_TITLE }}>{userData.name}</Text>
                <Text style={{ textAlign: 'left', color: 'white' }}>{userData.userId}</Text>
            </View>
        </LinearGradient>
    )
}

/*
const Stack = createStackNavigator();

export default function App() {


    // const [state, dispatch] = React.useReducer(
    //     (prevState, action) => {
    //         switch (action.type) {
    //             case 'RESTORE_TOKEN':
    //                 return {
    //                     ...prevState,
    //                     userToken: action.token,
    //                     isLoading: false,
    //                 };
    //             case 'SIGN_IN':
    //                 return {
    //                     ...prevState,
    //                     isSignout: false,
    //                     userToken: action.token,
    //                 };
    //             case 'SIGN_OUT':
    //                 return {
    //                     ...prevState,
    //                     isSignout: true,
    //                     userToken: null,
    //                 };
    //         }
    //     },
    //     {
    //         isLoading: true,
    //         isSignout: false,
    //         userToken: null,
    //     }
    // );

    React.useEffect(() => {
        const getLoginToken = async () => {
            let userToken = null;

            await AsyncStorage.getItem(STRING.LOGIN_TOKEN).
                then(() => {
                    dispatch(actions.Auth.setLoginToken(userToken));
                });
        };

        getLocation = async () => {

            Geolocation.getCurrentPosition(
                (position) => {
                    console.log("position", position.coords);
                    useDispatch(actions.Location.setLocation(position.coords))
                },
                (error) => {
                    console.log("error", error);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50, forceRequestLocation: true }
            );
        }

        getLoginToken();
        // getLocation();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: async data => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `AsyncStorage`
                // In the example, we'll use a dummy token
                dispatch({ type: 'SIGN_IN', token: STRING.LOGIN_TOKEN });
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' })
        }),
        []
    );


    return (
        <Provider store={store}>
            <AuthContext.Provider value={authContext}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="SignIn"
                        screenOptions={{
                            headerShown: false
                        }}>
                        {
                            true ? (
                                <Stack.Screen name="Drawer" component={AppDrawerScreen} />
                            ) :
                                <Stack.Screen name="SignIn" component={AppSignInScreen} options={{
                                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                                }} />
                        }

                    </Stack.Navigator>
                </NavigationContainer>
            </AuthContext.Provider>
        </Provider>
    );
}
*/

export default function App() {
    return (
        <Provider store={store}>
            <RootNavigator />
        </Provider>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        height: vs(150)
    },
    drawerHeader: {
        width: 90,
        bottom: vs(3),
        height: 90,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerStyle: {
        fontSize: 30,
        fontFamily: 'OpenSans-Bold'
    }
});