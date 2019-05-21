import React, { Component } from 'react';
import { View, Text, Image, SafeAreaView, Animated } from 'react-native';
import Styles from './Styles';

import AdminStack from '../../Router/AdminStack';
import DonorStack from '../../Router/DonorStack';
const logo = require('../../../assets/ie.png');

// export default class LoadingScreen extends Component {
// 	constructor() {
// 		super();
// 		this.spinValue = new Animated.Value(0);
// 		this.spin = this.spinValue.interpolate({
// 			inputRange: [0, 1],
// 			outputRange: ['0deg', '360deg'],
// 		});
// 		this.navigateCurrentUser = this.navigateCurrentUser.bind(this);
// 	}

// 	// async componentWillMount() {
// 	// 	let type = '';
// 	// 	await firebase.auth().onAuthStateChanged(user => {
// 	// 		console.log('SplashScreen user', user);
// 	// 		const rootRef = firebase.database().ref();
// 	// 		const userRef = rootRef.child('users');
// 	// 		userRef.once(
// 	// 			'value',
// 	// 			async function(snapshot) {
// 	// 				await snapshot.forEach(async snapShotItem => {
// 	// 					console.log('navigating snapShot', snapShotItem.val().uid);
// 	// 					console.log('navigating  user', user.uid);
// 	// 					if (snapShotItem.val().uid === user.uid) {
// 	// 						console.log('navigating ', snapShotItem.val());
// 	// 						type = await snapShotItem.val().type;
// 	// 						console.log('navigating type', type);
// 	// 						//this.navigateCurrentUser(type);
// 	// 						return;
// 	// 					}
// 	// 				});
// 	// 			}.bind(this)
// 	// 		);
// 	// 	});
// 	// }

// 	navigateCurrentUser = type => {
// 		console.log('navigating current user ', type);
// 		switch (type) {
// 			case 'admin':
// 				console.log('navigating current user as admin');
// 				this.props.navigation.navigate('AdminStack');
// 				break;
// 			case 'volunteer':
// 				console.log('navigating current user as volunteer');
// 				this.props.navigation.navigate('VolunteerStack');
// 				break;
// 			case 'donor':
// 				console.log('navigating current user as donor');
// 				this.props.navigation.navigate('Users');
// 				break;
// 			case 'donee':
// 				console.log('navigating current user as donee');
// 				this.props.navigation.navigate('DoneeStack');
// 				break;
// 			default:
// 				console.log('navigating current user as donee');
// 				this.props.navigation.navigate('DoneeStack');
// 		}
// 	};

// 	componentDidMount() {
// 		Animated.timing(this.spinValue, {
// 			toValue: 1,
// 			duration: 5000,
// 			useNativeDriver: true,
// 		}).start();
// 		console.log('navigating', 'componentDidMount');
// 		this.navigateCurrentUser('admin');
// 	}

// 	render() {
// 		return (
// 			<SafeAreaView style={Styles.container}>
// 				<View style={Styles.logoContainer}>
// 					<Animated.Image source={logo} style={[Styles.logo, { transform: [{ rotate: this.spin }] }]} />
// 				</View>
// 			</SafeAreaView>
// 		);
// 	}
// }

const LoadingScreen = () => {
	return (
		<View style={{ justifyContent: 'center', alignItems: 'center' }}>
			<Text>Loading Screen</Text>
		</View>
	);
};

export default LoadingScreen;
