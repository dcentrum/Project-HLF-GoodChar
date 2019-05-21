import React, { Component } from 'react';
import { View, Platform, Text, Alert, Animated, Keyboard, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import Styles from './Styles';
import { UserInput } from '../../Components/UserInput';
import { Button } from '../../Components/Button';
import { TextLink } from '../../Components/TextLink';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import { Loader } from '../../Components/Loader';

const logo = require('../../../assets/ie.png');

export default class Register extends Component {
	constructor() {
		super();
		this.handleRegisterButton = this.handleRegisterButton.bind(this);
		this.handleLoginButtoon = this.handleLoginButtoon.bind(this);
		this.state = {
			userName: '',
			email: '',
			password: '',
			confirmPassword: '',
			Loading: false,
		};
		this.logoSize = new Animated.Value(Styles.$logoNormalWidth);
		this.fontSize = new Animated.Value(40);
		this.userInputMargin = new Animated.Value(16);
	}

	handleRegisterButton = () => {
		if (this.state.userName.length === 0) {
			Alert.alert('Enter a valid user name');
			return;
		}
		if (this.state.email.length === 0) {
			Alert.alert('Enter a valid email address');
			return;
		}
		if (this.state.password.length === 0) {
			Alert.alert('Enter a valid password');
			return;
		}
		if (this.state.confirmPassword.length === 0 || this.state.password !== this.state.confirmPassword) {
			Alert.alert('Passwords do not match');
			return;
		}
		const { email, password } = this.state;
		let uid = '';
		this.setState({ Loading: true });
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(response => {
				console.log('response ', response);
				let user = response.user;
				console.log('user', user);
				console.log('uid', user.uid);
				uid = user.uid;
				console.log('database saving user ', this.state.email);
				this.setState({ Loading: false });
				const rootRef = firebase.database().ref();
				const userRef = rootRef.child('users');
				userRef.push({
					uid: uid,
					name: this.state.userName,
					email: this.state.email,
					type: this.getUserType(this.state.userName),
				});
			})
			.catch(error => {
				console.log(error);
				this.setState({ Loading: false }, () => {
					if (error.code === 'auth/email-already-in-use') {
						setTimeout(() => {
							Alert.alert('Error', 'Already an existing user', [{ text: 'OK', onPress: () => {} }], {
								cancelable: false,
							});
						}, 100);
					} else {
						setTimeout(() => {
							Alert.alert('Error', error.message, [{ text: 'OK', onPress: () => {} }], {
								cancelable: false,
							});
						}, 100);
					}
				});
			});
	};

	getUserType = userName => {
		if (userName.toLowerCase().indexOf('admin') > -1) {
			console.log('user name has admin');
			return 'admin';
		} else if (userName.toLowerCase().indexOf('volunteer') > -1) {
			console.log('user name has volunteer');
			return 'volunteer';
		} else if (userName.toLowerCase().indexOf('donor') > -1) {
			console.log('user name has donor');
			return 'donor';
		} else {
			console.log('user name has donee');
			return 'donee';
		}
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
			Animated.timing(this.userInputMargin, {
				toValue: 4,
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
			Animated.timing(this.userInputMargin, {
				toValue: 16,
			}),
		]).start();
	};

	handleLoginButtoon = () => {
		this.props.navigation.navigate('Login');
	};

	render() {
		const logoStyle = { width: this.logoSize, height: this.logoSize };
		const logoTextStyle = { color: '#7D4976', fontSize: this.fontSize, fontWeight: '700' };

		return (
			<SafeAreaView style={Styles.container}>
				{this.state.Loading && <Loader Loading={this.state.Loading} />}
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : null}
					style={{
						width: '100%',
						justifyContent: 'center',
						alignItems: 'center',
						paddingBottom: 24,
					}}
				>
					<Animated.View style={{ marginBottom: this.userInputMargin }}>
						<Animated.View style={[Styles.logoContainer, { marginVertical: this.userInputMargin }]}>
							<Animated.Image source={logo} resizeMode="cover" style={logoStyle} />
						</Animated.View>

						<Animated.Text style={logoTextStyle}>Good Char</Animated.Text>
					</Animated.View>

					<UserInput placeHolder="User Name" onChangeText={value => this.setState({ userName: value })} />
					<UserInput
						placeHolder="E-mail"
						onChangeText={value => this.setState({ email: value })}
						autoCapitalize="none"
					/>
					<UserInput
						placeHolder="Password"
						onChangeText={value => this.setState({ password: value })}
						marginVertical={this.userInputMargin}
						secure={true}
					/>
					<UserInput
						placeHolder="Confirm Password"
						onChangeText={value => this.setState({ confirmPassword: value })}
						secure={true}
					/>
					<Button label="Register" onPress={this.handleRegisterButton} />

					<TextLink label1="already a volunteer? " label2="Login" onPress={this.handleLoginButtoon} />
				</KeyboardAvoidingView>
			</SafeAreaView>
		);
	}
}
