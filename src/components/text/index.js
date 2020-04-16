
import React, { Component } from 'react';
import * as ReactNativeComponent from 'react-native';
import PropTypes from 'prop-types';

import { s } from 'react-native-size-matters';
import { STYLE } from "../../constant";

export default class Text extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    static defaultProps = {
        style: {},
    }

    render() {
        return (
            <ReactNativeComponent.Text style={[
                {
                    fontSize: STYLE.SIZE.CONTENT,
                    color: STYLE.COLOR.MWR_BLACK,
                    fontFamily: 'OpenSans-Regular'
                }, this.props.style]} >
                {this.props.children}
            </ReactNativeComponent.Text>
        );
    }
}

Text.defaultProps = {
    style: PropTypes.object,
}
