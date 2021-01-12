import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { RNCamera } from 'react-native-camera';
import { s, vs } from 'react-native-size-matters';

import { LoadingIndicator, Layout } from "../components";

//redux
import * as actions from "../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Camera extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flash: 'off',
            zoom: 0,
            autoFocus: 'on',
            autoFocusPoint: {
                normalized: { x: 0.5, y: 0.5 }, // normalized values required for autoFocusPointOfInterest
                drawRectPosition: {
                    x: Dimensions.get('window').width * 0.5 - 32,
                    y: Dimensions.get('window').height * 0.5 - 32,
                },
            },
            depth: 0,
            type: 'back',
            whiteBalance: 'auto',
            ratio: '16:9',
            isButtonEnable: { value: true }
        };
    }

    toggleFacing() {
        this.setState({
            type: this.state.type === 'back' ? 'front' : 'back',
        });
    }

    toggleFocus() {
        this.setState({
            autoFocus: this.state.autoFocus === 'on' ? 'off' : 'on',
        });
    }

    touchToFocus(event) {
        const { pageX, pageY } = event.nativeEvent;
        const screenWidth = Dimensions.get('window').width;
        const screenHeight = Dimensions.get('window').height;
        const isPortrait = screenHeight > screenWidth;

        let x = pageX / screenWidth;
        let y = pageY / screenHeight;
        // Coordinate transform for portrait. See autoFocusPointOfInterest in docs for more info
        if (isPortrait) {
            x = pageY / screenHeight;
            y = -(pageX / screenWidth) + 1;
        }

        this.setState({
            autoFocusPoint: {
                normalized: { x, y },
                drawRectPosition: { x: pageX, y: pageY },
            },
        });
    }

    zoomOut() {
        this.setState({
            zoom: this.state.zoom - 0.1 < 0 ? 0 : this.state.zoom - 0.1,
        });
    }

    zoomIn() {
        this.setState({
            zoom: this.state.zoom + 0.1 > 1 ? 1 : this.state.zoom + 0.1,
        });
    }

    setFocusDepth(depth) {
        this.setState({
            depth,
        });
    }

    takePicture = async function () {
        let { isButtonEnable } = this.state;

        if (isButtonEnable.value) {
            if (this.camera) {
                this.state.isButtonEnable.value = false;
                this.props.actionLoading.showLoading();
                const data = await this.camera.takePictureAsync();
                console.log('data', data);
                this.props.actionLoading.hideLoading();
                this.state.isButtonEnable.value = true;
                setTimeout(() => {
                    this.props.navigation.push('Submit', { uri: data.uri })
                }, 1000)
            }
        }
    };

    toggle = value => () => this.setState(prevState => ({ [value]: !prevState[value] }));

    renderRecBtn() {
        return <Text style={styles.flipText}> REC </Text>;
    }

    renderStopRecBtn() {
        return <Text style={styles.flipText}> ☕ </Text>;
    }

    renderCamera() {

        const drawFocusRingPosition = {
            top: this.state.autoFocusPoint.drawRectPosition.y - 32,
            left: this.state.autoFocusPoint.drawRectPosition.x - 32,
        };
        return (
            <View style={{
                flex: 1
            }}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={{
                        flex: 1,
                        justifyContent: 'space-between',
                    }}
                    type={this.state.type}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    whiteBalance={this.state.whiteBalance}
                    ratio={this.state.ratio}
                    captureAudio={false}
                >
                    <View style={{ flex: 1 }}></View>
                    <View style={{ bottom: s(5), right: s(5) }}>
                        <View
                            style={{
                                height: 56,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                                alignSelf: 'flex-end',
                            }}
                        >
                            <TouchableOpacity
                                style={[styles.flipButton, { flex: 0.25, alignSelf: 'flex-end' }]}
                                onPress={this.toggleFacing.bind(this)}
                            >
                                <Text style={styles.flipText}> FLIP </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.flipButton, styles.picButton, { flex: 0.3, alignSelf: 'flex-end' }]}
                                onPress={this.takePicture.bind(this)}
                            >
                                <Text style={styles.flipText}> SNAP </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </RNCamera>
            </View>
        );
    }

    render() {

        return <View style={styles.container}>
            {this.renderCamera()}
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    flipButton: {
        flex: 0.3,
        height: 40,
        marginHorizontal: 2,
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 1,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    autoFocusBox: {
        position: 'absolute',
        height: 64,
        width: 64,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'white',
        opacity: 0.4,
    },
    flipText: {
        color: 'white',
        fontSize: 15,
    },
    zoomText: {
        position: 'absolute',
        bottom: 70,
        zIndex: 2,
        left: 2,
    },
    picButton: {
        backgroundColor: 'darkseagreen',
    },
    facesContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 0,
    },
    face: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#FFD700',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    faceText: {
        color: '#FFD700',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        backgroundColor: 'transparent',
    },
    text: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 2,
        position: 'absolute',
        borderColor: '#F00',
        justifyContent: 'center',
    },
    textBlock: {
        color: '#F00',
        position: 'absolute',
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
});

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actionLoading: bindActionCreators(actions.Loading, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Camera);