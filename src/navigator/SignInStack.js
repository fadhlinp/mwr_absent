import React from 'react'
import { Image, View, StyleSheet, Alert } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { s, vs } from 'react-native-size-matters';

import { STYLE, IMAGE_URL } from "../constant";
import { Text } from "../components";

import DrawerScreen from '../screens/DrawerScreen'

import * as actions from "../actions";
import { useSelector, useDispatch } from "react-redux";

function CustomDrawerContent({ navigation, ...rest }) {

    const dispatch = useDispatch()

    return (
        <DrawerContentScrollView {...rest} >
            <Header />
            <DrawerItemList navigation={navigation} {...rest} />
            <DrawerItem label="Log out" onPress={() =>
                Alert.alert('Logout', 'Are you sure want to log out?', [
                    { text: 'No', onPress: () => { } },
                    {
                        text: 'Ok', onPress: () => {
                            dispatch(actions.Auth.signOut())
                        }
                    }
                ], { cancelable: true })
            } />
        </DrawerContentScrollView>
    );
}

function Header() {
    let userData = useSelector(state => state.authReducers.userData);

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

const Drawer = createDrawerNavigator();
export default function SignInStack() {

    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={props => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name="Home" component={DrawerScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
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