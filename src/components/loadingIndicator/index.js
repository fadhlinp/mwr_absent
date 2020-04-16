import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';

//redux
import * as actions from "../../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let { isLoading } = this.props

        if (!isLoading) {
            return null
        } else {
            return (
                <Modal
                    animationType={"fade"}
                    visible={isLoading}
                    transparent={true}
                    onRequestClose={() => { }}>
                    <View style={{
                        flex: 1, justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.15)'
                    }}>
                        <ActivityIndicator animating={isLoading} size="large" color="#ffffff" />
                    </View>
                </Modal>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.loadingReducers.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);