import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity, ImageBackground } from 'react-native';
import { s, vs } from 'react-native-size-matters';

import * as CONSTANT from "../constant";
import { Text, DigitalClock, Layout } from "../components";

//redux
import * as actions from "../actions";
import { useSelector, useDispatch } from "react-redux";

function StartTime({ checkIn }) {
    return (
        <View style={styles.timeDetail}>
            <Text style={{ color: CONSTANT.STYLE.COLOR.MWR_GREEN, fontSize: CONSTANT.STYLE.SIZE.SUB_TITLE, fontFamily: 'OpenSans-SemiBold' }}>Waktu Mulai</Text>
            <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>{(checkIn == "" ? "--:--" : checkIn)}</Text>
        </View>
    )
}

function EndTime({ checkOut }) {

    return (
        <View style={styles.timeDetail}>
            <Text style={{ color: CONSTANT.STYLE.COLOR.MWR_RED, fontSize: CONSTANT.STYLE.SIZE.SUB_TITLE, fontFamily: 'OpenSans-SemiBold' }}>Waktu Akhir</Text>
            <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>{(checkOut == "" ? "--:--" : checkOut)}</Text>
        </View>
    )
}

function IconButton({ image_url, name, navigation, getCurrentHours }) {

    onButtonPress = () => {
        if (name === 'History') {
            navigation.push('History')
        } else {
            let currentHours = getCurrentHours();
            navigation.push('Camera', { currentHours: currentHours })
        }
    }

    return (
        <View style={styles.IconButton}>
            <TouchableOpacity style={{ alignItems: 'center' }}
                onPress={onButtonPress}>
                <Image
                    source={image_url}
                    style={{
                        width: s(Image.resolveAssetSource(image_url).width * 0.11),
                        height: vs(Image.resolveAssetSource(image_url).height * 0.11),
                        resizeMode: "contain"
                    }}
                />

                <Text>{name}</Text>
            </TouchableOpacity>
        </View>
    )
}

function getCurrentHours() {
    return this.digitalRef.getCurrentHours()
}

export default function Home({ navigation }) {

    const dispatch = useDispatch()

    React.useEffect(() => {

        const getUserProfile = async () => {
            dispatch(actions.Auth.getUserData())
            dispatch(actions.Attendance.getTodayAttendance())
        };

        getUserProfile();
    }, []);

    let userData = useSelector(state => state.authReducers.userData);
    let { name, lastLogin } = userData

    let todayAttendance = useSelector(state => state.attendanceReducers.todayAttendance);

    return (
        <Layout>
            <View style={{ flex: 1, marginTop: vs(15), justifyContent: 'space-around' }}>
                <View style={styles.logoContainer}>
                    <Image
                        source={CONSTANT.IMAGE_URL.LOGO}
                        style={{
                            width: s(Image.resolveAssetSource(CONSTANT.IMAGE_URL.LOGO).width * 0.9),
                            height: vs(Image.resolveAssetSource(CONSTANT.IMAGE_URL.LOGO).height * 0.13),
                            resizeMode: "contain"
                        }}
                    />
                </View>
                <View style={styles.infoLogin}>
                    <Text style={{ textAlign: 'center', fontSize: CONSTANT.STYLE.SIZE.SUB_TITLE, fontFamily: 'OpenSans-SemiBold' }}>Welcome Back {name}</Text>
                    <Text style={{ textAlign: 'center' }}>Last log in : {lastLogin}</Text>
                </View>
            </View>

            <View style={{ flex: 3, justifyContent: 'center' }}>
                <View style={{ marginBottom: vs(25) }}>
                    <Text style={{ textAlign: 'center', fontSize: CONSTANT.STYLE.SIZE.SUB_TITLE, fontFamily: 'OpenSans-SemiBold' }}>Today Presence</Text>
                </View>

                <View style={{ alignItems: 'center', marginBottom: vs(25) }}>
                    <ImageBackground source={CONSTANT.IMAGE_URL.CLOCK}
                        style={{
                            padding: vs(15),
                            width: vs(Image.resolveAssetSource(CONSTANT.IMAGE_URL.CLOCK).width * 0.2),
                            height: vs(Image.resolveAssetSource(CONSTANT.IMAGE_URL.CLOCK).height * 0.2),
                            alignItems: 'center',
                            resizeMode: 'contains',
                            justifyContent: 'center'

                        }}>

                        <View style={{ alignItems: 'center' }}>
                            <DigitalClock ref={(ref) => this.digitalRef = ref} />
                        </View>

                    </ImageBackground>
                </View>

                <View style={styles.timeDesc}>
                    <StartTime checkIn={todayAttendance.checkIn} />
                    <EndTime checkOut={todayAttendance.checkOut} />
                </View>
            </View>

            <View style={{ flex: 1 }}>
                <View style={styles.menuContainer}>
                    <IconButton
                        image_url={CONSTANT.IMAGE_URL.CHECK_IN}
                        name={'Check In'}
                        getCurrentHours={() => getCurrentHours()}
                        navigation={navigation}
                    />

                    <IconButton
                        image_url={CONSTANT.IMAGE_URL.HISTORY}
                        name={'History'}
                        getCurrentHours={() => getCurrentHours()}
                        navigation={navigation}
                    />
                </View>
            </View>
        </Layout>
    );
}

const styles = StyleSheet.create({
    logoContainer: {
        alignItems: 'center'
    },
    infoLogin: {
        alignItems: 'center'
    },
    menuContainer: {
        position: 'absolute',
        width: '100%',
        justifyContent: 'space-around',
        bottom: vs(15),
        flexDirection: 'row'
    },
    IconButton: {
        paddingHorizontal: s(25)
    },
    rowContainer: {
    },
    timeDesc: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: s(10),
        borderColor: 'grey'
    },
    timeDetail: {
        alignItems: 'center'
    },
});