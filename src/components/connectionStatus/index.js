import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import * as NetInfo from "@react-native-community/netinfo";
import { s, vs } from 'react-native-size-matters';
import { STYLE } from "../../constant";
import { Text } from "../../components";

//redux
import * as actions from "../../actions";
import { useSelector, useDispatch } from "react-redux";

export default function ConnectionStatus() {
    let dispatch = useDispatch()
    let connectionStatus = useSelector(state => state.connectionReducers.connectionStatus);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            dispatch(actions.ConnectionStatus.setConnectionStatus(state.isConnected))
        });

        unsubscribe();
    })

    if (connectionStatus) {
        return null;
    } else {
        return (
            <SafeAreaView
                style={{
                    position: 'absolute',
                    paddingVertical: vs(15),
                    justifyContent: "center",
                    alignItems: "center",
                    top: 0,
                    backgroundColor: STYLE.COLOR.MWR_RED,
                    width: "100%"
                }}
            >
                <Text style={{ color: 'white' }}>You're offline</Text>
            </SafeAreaView>
        );
    }
}