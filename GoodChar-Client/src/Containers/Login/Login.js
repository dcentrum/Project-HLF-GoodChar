import React, { Component } from 'react';
import { View, Image, Text, Alert, KeyboardAvoidingView, Keyboard, Platform, Animated } from 'react-native';
import Styles from './Styles';
import { UserInput } from '../../Components/UserInput';
import { Button } from '../../Components/Button';
import { TextLink } from '../../Components/TextLink';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import { Loader } from '../../Components/Loader';

const logo = require('../../../assets/ie.png');

export default class Login extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
			Password: '',
			Loading: false,
		};
		this.handleLoginButton = this.handleLoginButton.bind(this);
		this.handleSignUpButtoon = this.handleSignUpButtoon.bind(this);
		this.logoSize = new Animated.Value(Styles.$logoNormalWidth);
		this.fontSize = new Animated.Value(40);
		//console.log('logoSize', this.logoSize);
	}

	handleLoginButton = () => {
		const { email, password } = this.state;
		Keyboard.dismiss();
		if (email.length > 0 && password.length > 0) {
			firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then(this.setState({ Loading: false }))
				.catch(error => {
					this.setState({ Loading: false }, () => {
						setTimeout(() => {
							Alert.alert('Error', error.message, [{ text: 'OK', onPress: () => {} }], {
								cancelable: false,
							});
						}, 100);
					});
				});
			this.setState({ Loading: true });
		}
	};

	handleSignUpButtoon = () => {
		this.props.navigation.navigate('register');
	};

	componentDidMount() {
		const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
		const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
		this.keyboardShowListener = Keyboard.addListener(showEvent, this.keyboardShow);
		this.keyboardHideListener = Keyboard.addListener(hideEvent, this.keyboardHide);
	}

	componentWillUnmount() {
		this.keyboardShowListener.remove();
		this.keyboardHideListener.remove();
	}

	keyboardShow = () => {
		Animated.parallel([
			Animated.timing(this.logoSize, {
				toValue: Styles.$logoMinWidth,
			}),
			Animated.timing(this.fontSize, {
				toValue: 20,
			}),
		]).start();
	};

	keyboardHide = () => {
		Animated.parallel([
			Animated.timing(this.logoSize, {
				toValue: Styles.$logoNormalWidth,
			}),
			Animated.timing(this.fontSize, {
				toValue: 40,
			}),
		]).start();
	};

	render() {
		const logoStyle = [Styles.logoNormal, { width: this.logoSize, height: this.logoSize }];
		const logoFontStyle = { color: '#7D4976', fontWeight: '700', fontSize: this.fontSize };
		return (
			<View style={Styles.container}>
				<KeyboardAvoidingView
					style={{ width: '100%', alignItems: 'center' }}
					behavior={Platform.OS === 'ios' ? 'padding' : null}
					keyboardVerticalOffset={2}
				>
					<View style={{ marginBottom: 16, alignItems: 'center' }}>
						<View style={Styles.logoContainer}>
							<Animated.Image source={logo} resizeMode="cover" style={logoStyle} />
						</View>

						<Animated.Text style={logoFontStyle}>Good Char</Animated.Text>
					</View>

					<UserInput
						focus
						placeHolder="User Name"
						onChangeText={value => this.setState({ email: value })}
						autoCapitalize="none"
					/>
					<UserInput
						placeHolder="Password"
						onChangeText={value => this.setState({ password: value })}
						autoCapitalize="none"
						secure={true}
					/>
					<Button label="Login" onPress={this.handleLoginButton} />

					<TextLink label1="new volunteer? " label2="Sign Up" onPress={this.handleSignUpButtoon} />
				</KeyboardAvoidingView>
				{this.state.Loading && <Loader Loading={this.state.Loading} />}
			</View>
		);
	}
}
