import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
    View,
    Text,
    Alert,
    Dimensions
} from 'react-native';
import { RNCamera, FaceDetector } from 'react-native-camera';
import { s, vs } from 'react-native-size-matters';
import { CustomButton, Layout } from "../components";
import * as CONSTANT from "../constant";

//redux
import * as actions from "../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Confirm extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.actionAttendance.getTimeServer()
    }

    render() {
        let { timeServer, userData } = this.props
        let { name, positionUser, nik } = userData
        return (
            <Layout>
                <View style={styles.photoContainer}>
                    <Image
                        source={{ uri: this.props.route.params.uri }}
                        style={{
                            width: s(Dimensions.get('screen').width * 0.3),
                            height: vs(Dimensions.get('screen').height * 0.08),
                            resizeMode: "contain"
                        }}
                    />

                    <View style={{ marginLeft: s(15) }}>
                        <Text>{name}</Text>
                        <Text>{positionUser}</Text>
                    </View>
                </View>

                <View style={styles.timeDesc}>
                    <StartTime checkIn={this.props.todayAttendance.checkIn} />
                    <EndTime checkOut={this.props.todayAttendance.checkOut} />
                </View>

                <View style={styles.button}>
                    <CustomButton
                        title={"OK"}
                        style={styles.buttonContainer}
                        onPress={this.onSubmit}
                        textStyle={{ color: CONSTANT.STYLE.COLOR.MWR_BLUE }}
                    />
                </View>
            </Layout>
        );
    }

    getCurrentHours() {
        let { timeServer } = this.props
        let hh = timeServer.time.split(":")[0]

        return Number(hh)
    }

    onSubmit() {
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }]
        })
    }
}

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

function RowText({ str1, str2 }) {

    return (
        <View style={styles.rowStyle}>
            <View style={styles.textRow1}>
                <Text style={{ fontWeight: 'bold' }}>{str1}</Text>
            </View>
            <View style={styles.textRow2}>
                <Text>{str2}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: CONSTANT.STYLE.SIZE.MAIN_MARGIN_HORIZONTAL + 20,
    },
    photoContainer: {
        paddingHorizontal: s(10),
        flexDirection: 'row',
        marginTop: vs(20),
        marginBottom: vs(20),
        alignItems: 'center'
    },
    rowStyle: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: vs(10)
    },
    textRow1: {
        width: '50%',
        paddingLeft: s(20)
    },
    textRow2: {
        width: '50%'
    },
    buttonContainer: {
        marginTop: vs(20),
        marginHorizontal: s(20)
    },
    button: {
        bottom: 10
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

function mapStateToProps(state) {
    return {
        userData: state.authReducers.userData,
        timeServer: state.attendanceReducers.timeServer,
        todayAttendance: state.attendanceReducers.todayAttendance
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionCheckIn: bindActionCreators(actions.CheckIn, dispatch),
        actionAttendance: bindActionCreators(actions.Attendance, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);