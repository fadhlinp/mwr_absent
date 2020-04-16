import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { s, vs } from 'react-native-size-matters';
import PropTypes from 'prop-types';

import { STYLE } from "../../constant";
import { Text } from "../../components";

class CustomButton extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        title: "SIGN IN",
        style: {},
        textStyle: {},
        onPress: () => { }
    }

    render() {
        console.log('textstyle', this.props.textStyle)
        return (
            <TouchableOpacity onPress={this.props.onPress} style={[styles.button, this.props.style]}>
                <Text style={[styles.text, this.props.textStyle]}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
};

CustomButton.defaultProps = {
    title: PropTypes.string,
    style: PropTypes.object,
    textStyle: PropTypes.object,
    onPress: PropTypes.func
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        height: vs(40),
        borderRadius: s(5),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: STYLE.COLOR.MWR_BLUE,
        borderWidth: 1
    },
    text: {
        fontSize: 16,
        textTransform: 'uppercase'
    },
})

export default CustomButton