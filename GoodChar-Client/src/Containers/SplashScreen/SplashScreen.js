import React, { Component } from 'react';
import { View, Text, Image, SafeAreaView, Animated } from 'react-native';
import Styles from './Styles';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
const logo = require('../../../assets/ie.png');

export default class SplashScreen extends Component {
	constructor() {
		super();
		this.spinValue = new Animated.Value(0);
		this.spin = this.spinValue.interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '360deg'],
		});
		this.navigateCurrentUser = this.navigateCurrentUser.bind(this);
	}

	async componentDidMount() {
		Animated.timing(this.spinValue, {
			toValue: 1,
			duration: 5000,
			useNativeDriver: true,
		}).start();

		await firebase.auth().onAuthStateChanged(user => {
			console.log('SplashScreen user', user);
			if (user) {
				let type = '';
				const uid = user.uid;
				const rootRef = firebase.database().ref();
				const userRef = rootRef.child('users');
				userRef.on(
					'value',
					function(snapShot) {
						snapShot.forEach(snapShotItem => {
							if (snapShotItem.val().uid === uid) {
								type = snapShotItem.val().type;
								console.log('before landing screen user ', snapShotItem.val());
								this.navigateCurrentUser('LandingScreen', user);
								return;
							}
						});
					}.bind(this)
				);
			} else {
				setTimeout(
					function() {
						this.props.navigation.navigate('signedOut');
					}.bind(this),
					1000
				);
			}
		});
	}

	navigateCurrentUser = (type, user) => {
		console.log('navigating current user ', type);
		switch (type) {
			case 'admin':
				console.log('navigating current user as admin');
				this.props.navigation.navigate('AdminRoute');
				break;
			case 'volunteer':
				console.log('navigating current user as volunteer');
				this.props.navigation.navigate('VolunteerRoute');
				break;
			case 'donor':
				console.log('navigating current user as donor');
				this.props.navigation.navigate('DonorRoute');
				break;
			case 'donee':
				console.log('navigating current user as donee');
				this.props.navigation.navigate('DoneeRoute');
				break;
			default:
				console.log('navigating current user as Dashboard');
				this.props.navigation.navigate('DashboardRoute', { user: user });
		}
	};

	render() {
		return (
			<SafeAreaView style={Styles.container}>
				<View style={Styles.logoContainer}>
					<Animated.Image source={logo} style={[Styles.logo, { transform: [{ rotate: this.spin }] }]} />
				</View>
				<Text style={{ color: '#7D4976', fontWeight: '700', fontSize: 40 }}>Good Char</Text>
			</SafeAreaView>
		);
	}
}
