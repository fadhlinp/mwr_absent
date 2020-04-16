import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { s, vs } from 'react-native-size-matters';

import { Text } from "../../components";

class DigitalClock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clock: ''
        }
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.getCurrentTime();
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    getCurrentHours() {
        let hh = this.state.clock.split(":")[0]

        return Number(hh)
    }

    getCurrentTime() {
        let today = new Date();
        let h = today.getHours();
        let m = today.getMinutes();
        let s = today.getSeconds();

        h = (h < 10 ? "0" + h : h);
        m = (m < 10 ? "0" + m : m);
        s = (s < 10 ? "0" + s : s);

        this.setState({ clock: h + ":" + m + ":" + s })
    }

    render() {
        return (
            <Text style={{ fontSize: vs(20) }}>{this.state.clock}</Text>
        );
    }
};

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        height: vs(40),
        borderRadius: s(5),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'rgb(0, 145, 234)',
        borderWidth: 1
    },
    text: {
        fontSize: 16,
        textTransform: 'uppercase',
        color: 'rgb(0, 145, 234)',
    },
})

export default DigitalClock