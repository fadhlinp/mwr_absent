import React, { Component, useContext } from 'react';
import {
    StyleSheet,
    Image,
    View
} from 'react-native';

import { TextField } from '../components/react-native-material-textfield';
import { s, vs, ms } from 'react-native-size-matters';

import * as CONSTANT from "../constant";
import { CustomButton, Layout } from "../components";

//redux
import * as actions from "../actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onSubmitUserId = this.onSubmitUserId.bind(this);
        this.onSubmitPassword = this.onSubmitPassword.bind(this);

        this.userIdRef = this.updateRef.bind(this, 'userId');
        this.passwordRef = this.updateRef.bind(this, 'password');

        this.state = {
            userId: "",
            password: ""
        };
    }

    onChangeText(text) {
        let errors = {};
        ['userId', 'password']
            .map((name) => ({ name, ref: this[name] }))
            .forEach(({ name, ref }) => {
                if (ref.isFocused()) {
                    this.setState({ [name]: text, errors });
                }
            });
    }

    onSubmitUserId() {
        this.password.focus();
    }

    onSubmitPassword() {
        this.password.blur();
    }

    onSubmit() {
        let errors = {};
        let isError = false;

        ['userId', 'password']
            .forEach((name) => {
                let value = this[name].value();

                if (!value) {
                    isError = true;
                    errors[name] = 'Belum Diisi';
                }
            });

        if (isError) {
            this.setState({ errors });
        } else {
            let { userId, password } = this.state;

            let params = {
                userId: userId,
                password: password
            }

            this.props.actionAuth.signIn(params)
        }
    }

    updateRef(name, ref) {
        this[name] = ref;
    }

    render() {
        let { errors = {}, secureTextEntry, ...data } = this.state;

        return (
            <Layout containerStyle={{ marginTop: vs(25) }} ref={ref => this.loadingRef = ref}>
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image
                            source={CONSTANT.IMAGE_URL.LOGO}
                            style={{
                                width: s(Image.resolveAssetSource(CONSTANT.IMAGE_URL.LOGO).width * 0.18),
                                height: vs(Image.resolveAssetSource(CONSTANT.IMAGE_URL.LOGO).height * 0.2),
                                resizeMode: "contain"
                            }}
                        />

                    </View>

                    <View style={styles.formContainer}>
                        <TextField
                            ref={this.userIdRef}
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            onChangeText={this.onChangeText}
                            onSubmitEditing={this.onSubmitUserId}
                            returnKeyType='next'
                            label='User ID'
                            error={errors.userId}
                            style={{ fontFamily: 'OpenSans-Regular' }}
                            labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                            affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                        />

                        <TextField
                            ref={this.passwordRef}
                            secureTextEntry={true}
                            autoCapitalize='none'
                            autoCorrect={false}
                            enablesReturnKeyAutomatically={true}
                            clearTextOnFocus={true}
                            onChangeText={this.onChangeText}
                            onSubmitEditing={this.onSubmitPassword}
                            returnKeyType='done'
                            label='Password'
                            error={errors.password}
                            maxLength={30}
                            style={{ fontFamily: 'OpenSans-Regular' }}
                            labelTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                            affixTextStyle={{ fontFamily: 'OpenSans-Regular' }}
                        />

                        <CustomButton
                            title={"SIGN IN"}
                            style={styles.buttonContainer}
                            onPress={this.onSubmit}
                            textStyle={{ color: CONSTANT.STYLE.COLOR.MWR_BLUE }}
                        />
                    </View>
                </View>
            </Layout>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: CONSTANT.STYLE.SIZE.MAIN_MARGIN_HORIZONTAL
    },
    logoContainer: {
        marginTop: vs(50),
        alignItems: 'center'
    },
    formContainer: {
        marginTop: vs(20)
    },
    buttonContainer: {
        marginTop: vs(20)
    }
});

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actionAuth: bindActionCreators(actions.Auth, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);