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
import { CustomButton } from "../components";
import * as CONSTANT from "../constant";

//redux
import * as actions from "../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Submit extends Component {

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

            <SafeAreaView style={styles.container}>

                <View style={styles.photoContainer}>
                    <Image
                        source={{ uri: this.props.route.params.uri }}
                        style={{
                            borderWidth: StyleSheet.hairlineWidth,
                            width: s(Dimensions.get('screen').width * 0.6),
                            height: vs(Dimensions.get('screen').height * 0.3),
                            resizeMode: "contain"
                        }}
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <RowText str1={'NIK'} str2={nik} />
                    <RowText str1={'Nama'} str2={name} />
                    <RowText str1={'Jabatan'} str2={positionUser} />
                    <RowText str1={'Tanggal'} str2={timeServer.date} />
                    <RowText str1={'Waktu'} str2={timeServer.time} />
                </View>

                <View style={styles.button}>
                    <CustomButton
                        title={"SUBMIT"}
                        style={styles.buttonContainer}
                        onPress={this.onSubmit}
                        textStyle={{ color: CONSTANT.STYLE.COLOR.MWR_BLUE }}
                    />
                </View>

            </SafeAreaView>
        );
    }

    getCurrentHours() {
        let { timeServer } = this.props
        let hh = timeServer.time.split(":")[0]

        return Number(hh)
    }

    onSubmit() {
        let { uri } = this.props.route.params
        let currentHours = this.getCurrentHours()
        this.props.actionCheckIn.sendPhoto(uri, currentHours, this.onCallbackSuccess)
    }

    onCallbackSuccess = (message) => {
        Alert.alert('', message, [
            {
                text: 'OK', onPress: () => this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                })
            },
        ], { cancelable: false })
    }
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
        flex: 1,
        marginHorizontal: CONSTANT.STYLE.SIZE.MAIN_MARGIN_HORIZONTAL + 20,
    },
    photoContainer: {
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
        marginTop: vs(20)
    },
    button: {
        bottom: 10
    }
});

function mapStateToProps(state) {
    return {
        userData: state.authReducers.userData,
        timeServer: state.attendanceReducers.timeServer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actionCheckIn: bindActionCreators(actions.CheckIn, dispatch),
        actionAttendance: bindActionCreators(actions.Attendance, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Submit);