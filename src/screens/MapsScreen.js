import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Image,
} from 'react-native';

import { s, vs } from 'react-native-size-matters';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import * as CONSTANT from "../constant";

//redux
import * as actions from "../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Maps extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let { attendanceData } = this.props.route.params;
        let { latCheckIn, longCheckIn, latCheckOut, longCheckOut, date } = attendanceData
        let initLat = -6.2053063
        let initLong = 106.8214896

        if (latCheckIn != 0) {
            initLat = latCheckIn
            initLong = longCheckIn
        } else {
            initLat = latCheckOut
            initLong = longCheckOut
        }

        return (
            <SafeAreaView style={styles.container}>
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    region={{
                        latitude: initLat,
                        longitude: initLong,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}>

                    <AttendanceMarker type={'startTime'} attendanceData={attendanceData} />
                    <AttendanceMarker type={'endTime'} attendanceData={attendanceData} />

                </MapView>
            </SafeAreaView>
        );
    }
}

function AttendanceMarker({ attendanceData, type }) {
    let { latCheckIn, longCheckIn, latCheckOut, longCheckOut, date } = attendanceData

    if (type === 'startTime') {
        if (latCheckIn !== '') {
            return (
                <Marker
                    coordinate={{ latitude: Number(latCheckIn), longitude: Number(longCheckIn) }}
                    title={'Check In ' + date}
                >
                    <Image
                        source={CONSTANT.IMAGE_URL.MARKER_START_TIME}
                        style={{
                            width: s(Image.resolveAssetSource(CONSTANT.IMAGE_URL.MARKER_START_TIME).width * 0.07),
                            height: vs(Image.resolveAssetSource(CONSTANT.IMAGE_URL.MARKER_START_TIME).height * 0.07),
                            resizeMode: "contain"
                        }} />
                </Marker>
            )

        }
        return null
    } else {
        if (latCheckOut !== '') {
            return (
                <Marker
                    coordinate={{ latitude: Number(latCheckOut), longitude: Number(longCheckOut) }}
                    title={'Check Out ' + date}
                >
                    <Image
                        source={CONSTANT.IMAGE_URL.MARKER_END_TIME}
                        style={{
                            width: s(Image.resolveAssetSource(CONSTANT.IMAGE_URL.MARKER_END_TIME).width * 0.07),
                            height: vs(Image.resolveAssetSource(CONSTANT.IMAGE_URL.MARKER_END_TIME).height * 0.07),
                            resizeMode: "contain"
                        }} />
                </Marker>
            )

        }
        return null
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        height: '100%'
    }
});

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Maps);