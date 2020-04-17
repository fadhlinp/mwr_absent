import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet
} from 'react-native';

import * as CONSTANT from "../../constant";
import { LoadingIndicator, ConnectionStatus } from "../../components";

export default class Layout extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={[styles.container, this.props.containerStyle]}>
                {this.props.children}
                <LoadingIndicator />
                <ConnectionStatus />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: CONSTANT.STYLE.SIZE.MAIN_MARGIN_HORIZONTAL,
        backgroundColor: CONSTANT.STYLE.COLOR.MWR_BACKGROUND_COLOR
    }
});