import React from 'react';
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';

import { s, vs } from 'react-native-size-matters';

import * as CONSTANT from "../constant";
import { Layout, Text } from "../components";

//redux
import * as actions from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView } from 'react-native-gesture-handler';

function TodayAttendance({ navigation, attendanceData }) {

    let todayAttendance = useSelector(state => state.attendanceReducers.todayAttendance);

    if (todayAttendance.checkIn === "" && todayAttendance.checkOut === "") {
        return (

            <View>
                <TouchableOpacity onPress={() => {
                    Alert.alert('', 'Please check in or check out first', [
                        {
                            text: 'Ok', onPress: () => { }
                        }
                    ], { cancelable: false })
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: CONSTANT.STYLE.SIZE.TITLE,
                        fontFamily: 'OpenSans-Bold',
                        color: CONSTANT.STYLE.COLOR.MWR_GREEN
                    }}>Today</Text>
                    <View style={styles.rowContainer}>

                        <View style={styles.timeDesc}>
                            <StartTime checkIn={""} />
                            <EndTime checkOut={""} />
                        </View>
                    </View>
                </TouchableOpacity>

                <RowComponent
                    attendanceData={attendanceData}
                    navigation={navigation} />

            </View>
        )
    } else {
        return (
            <View style={styles.rowContainer}>
                <TouchableOpacity onPress={() => {
                    if (attendanceData.latCheckIn !== "" || attendanceData.latCheckOut !== "") {
                        navigation.push('Maps', { attendanceData: attendanceData })
                    } else {
                        Alert.alert('', 'You have no attendance data', [
                            {
                                text: 'Ok', onPress: () => { }
                            }
                        ], { cancelable: false })
                    }
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: CONSTANT.STYLE.SIZE.TITLE,
                        fontFamily: 'OpenSans-Bold',
                        color: CONSTANT.STYLE.COLOR.MWR_GREEN
                    }}>Today</Text>
                    <View style={styles.timeDesc}>
                        <StartTime checkIn={attendanceData.checkIn} />
                        <EndTime checkOut={attendanceData.checkOut} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

function RowComponent({ navigation, attendanceData }) {
    console.log('navigationss', navigation)
    return (

        <View style={styles.rowContainer}>
            <TouchableOpacity onPress={() => {
                if (attendanceData.latCheckIn !== "" || attendanceData.latCheckOut !== "") {
                    navigation.push('Maps', { attendanceData: attendanceData })
                } else {
                    Alert.alert('', 'You have no attendance data', [
                        {
                            text: 'Ok', onPress: () => { }
                        }
                    ], { cancelable: false })
                }
            }}>
                <Text style={{
                    textAlign: 'center',
                    fontSize: CONSTANT.STYLE.SIZE.SUB_TITLE,
                    fontFamily: 'OpenSans-SemiBold'
                }}>{attendanceData.date}</Text>
                <View style={styles.timeDesc}>
                    <StartTime checkIn={attendanceData.checkIn} />
                    <EndTime checkOut={attendanceData.checkOut} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

function StartTime({ checkIn }) {
    return (
        <View style={styles.timeContainer}>
            <Image
                source={CONSTANT.IMAGE_URL.MARKER_START_TIME}
                style={{
                    width: s(Image.resolveAssetSource(CONSTANT.IMAGE_URL.MARKER_START_TIME).width * 0.07),
                    height: vs(Image.resolveAssetSource(CONSTANT.IMAGE_URL.MARKER_START_TIME).height * 0.07),
                    resizeMode: "contain"
                }}
            />

            <View style={styles.timeDetail}>
                <Text style={{ color: CONSTANT.STYLE.COLOR.MWR_GREEN, fontSize: CONSTANT.STYLE.SIZE.SUB_TITLE, fontFamily: 'OpenSans-SemiBold' }}>Check In</Text>
                <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>{(checkIn == "" ? "--:--" : checkIn)}</Text>
            </View>
        </View>
    )
}

function EndTime({ checkOut }) {

    return (
        <View style={styles.timeContainer}>
            <Image
                source={CONSTANT.IMAGE_URL.MARKER_END_TIME}
                style={{
                    width: s(Image.resolveAssetSource(CONSTANT.IMAGE_URL.MARKER_END_TIME).width * 0.07),
                    height: vs(Image.resolveAssetSource(CONSTANT.IMAGE_URL.MARKER_END_TIME).height * 0.07),
                    resizeMode: "contain"
                }}
            />

            <View style={styles.timeDetail}>
                <Text style={{ color: CONSTANT.STYLE.COLOR.MWR_RED, fontSize: CONSTANT.STYLE.SIZE.SUB_TITLE, fontFamily: 'OpenSans-SemiBold' }}>Check Out</Text>
                <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>{(checkOut == "" ? "--:--" : checkOut)}</Text>
            </View>
        </View>
    )
}

export default function History({ navigation }) {

    const dispatch = useDispatch()
    let attendanceHistory = useSelector(state => state.attendanceReducers.attendanceHistory);

    React.useEffect(() => {

        const getHistoryData = async () => {
            dispatch(actions.Attendance.getHistoryData())
        };

        const getTimeServer = async () => {
            dispatch(actions.Attendance.getTimeServer())
        }

        const getAttendanceHistory = async () => {
            dispatch(actions.Attendance.getTodayAttendance())
        }

        getTimeServer();
        getAttendanceHistory();
        getHistoryData();
    }, []);

    return (
        <Layout>
            <ScrollView
                contentContainerStyle={styles.historyContainer}
                showsVerticalScrollIndicator={false}
            >
                {attendanceHistory.map((attendanceData, index) => {
                    if (index == 0) {
                        return (
                            <View key={index} style={{ marginTop: vs(20) }}>
                                <TodayAttendance
                                    attendanceData={attendanceData}
                                    navigation={navigation} />
                            </View>
                        )
                    }
                    return (
                        <RowComponent
                            key={index}
                            attendanceData={attendanceData}
                            navigation={navigation} />
                    )
                })}
            </ScrollView>
        </Layout>
    );
}

const styles = StyleSheet.create({
    infoLogin: {
        marginVertical: vs(15),
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowContainer: {
        marginBottom: vs(15)
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    timeDetail: {
        alignItems: 'center'
    },
    timeDesc: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: s(10),
        borderColor: 'grey',
        paddingBottom: vs(10),
        borderBottomWidth: StyleSheet.hairlineWidth
    },
});