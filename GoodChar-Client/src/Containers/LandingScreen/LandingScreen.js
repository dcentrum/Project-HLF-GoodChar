import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { LandingScreenItem } from '../../Components/LandingScreenItem';
import Styles from './Styles';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
const BTN_WIDTH = Dimensions.get('window').width / 3.75;
const PADDING = (Dimensions.get('window').width - BTN_WIDTH * 3) / 6;

const dashboardIcon = require('../../../assets/dashboard.png');
const requestsIcon = require('../../../assets/requests.png');
const volunteerIcon = require('../../../assets/volunteer.png');
const assetsIcon = require('../../../assets/assets.png');
const donationCampIcon = require('../../../assets/donationcamp.png');
const settingsIcon = require('../../../assets/gcSettings.png');

export default class LandingScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: '',
		};
	}

	async componentDidMount() {
		await firebase.auth().onAuthStateChanged(user => {
			if (user) {
				//this.setState({volunteer:user.})
				//console.log('user Donation Camp', user);
				const uid = user.uid;
				const rootRef = firebase.database().ref();
				const userRef = rootRef.child('users');

				userRef.once(
					'value',
					function(snapShot) {
						snapShot.forEach(snapShotItem => {
							if (snapShotItem.val().uid === uid) {
								//console.log('user Donation Camp user', snapShotItem.val());
								let name = snapShotItem.val().name;
								console.log('user Donation Camp user', name);
								this.setState({ user: snapShotItem.val() });
								return;
							}
						});
					}.bind(this)
				);
			}
		});
	}

	handleBtnPress = id => {
		switch (id) {
			case 0:
				this.props.navigation.navigate('DashBoard');
				break;
			case 1:
				this.props.navigation.navigate('Donee');
				break;
			case 2:
				this.props.navigation.navigate('Donor');
				break;
			case 3:
				this.props.navigation.navigate('Requests');
				break;
			case 4:
				this.props.navigation.navigate('Volunteer');
				break;
			case 5:
				this.props.navigation.navigate('Reports');
				break;
			case 6:
				this.props.navigation.navigate('Assets');
				break;
			case 7:
				this.props.navigation.navigate('DonationCampList');
				break;
			case 8:
				this.props.navigation.navigate('Funds');
				break;
			case 9:
				this.props.navigation.navigate('Pay');
				break;
			case 10:
				this.props.navigation.navigate('Settings');
				break;

			default:
				this.props.navigation.navigate('DashBoard');
				break;
		}
	};

	render() {
		return (
			<View style={Styles.container}>
				<ScrollView>
					{/* <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 24 }}>
						<LinearGradient colors={['#000', '#8F55A3']} style={{ alignItems: 'center', borderRadius: 5 }}>
							<TouchableOpacity
								style={{
									width: BTN_WIDTH,
									height: BTN_WIDTH,

									justifyContent: 'center',
									alignItems: 'center',
								}}
								onPress={() => this.handleBtnPress(0)}
							>
								<Text style={{ fontSize: 20, fontWeight: '600', color: '#fff', textAlign: 'center' }}>
									Dash Board
								</Text>
							</TouchableOpacity>
						</LinearGradient>
						<LinearGradient colors={['#000', '#8F55A3']} style={{ alignItems: 'center', borderRadius: 5 }}>
							<TouchableOpacity
								style={{
									width: BTN_WIDTH,
									height: BTN_WIDTH,

									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: 5,
								}}
								onPress={() => this.handleBtnPress(1)}
							>
								<Text style={{ fontSize: 20, fontWeight: '600', color: '#fff', textAlign: 'center' }}>
									Donee
								</Text>
							</TouchableOpacity>
						</LinearGradient>
						<LinearGradient colors={['#000', '#8F55A3']} style={{ alignItems: 'center', borderRadius: 5 }}>
							<TouchableOpacity
								style={{
									width: BTN_WIDTH,
									height: BTN_WIDTH,

									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: 5,
								}}
								onPress={() => this.handleBtnPress(2)}
							>
								<Text style={{ fontSize: 20, fontWeight: '600', color: '#fff', textAlign: 'center' }}>
									Donor
								</Text>
							</TouchableOpacity>
						</LinearGradient>
					</View>
					<View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 24 }}>
						<LinearGradient colors={['#000', '#8F55A3']} style={{ alignItems: 'center', borderRadius: 5 }}>
							<TouchableOpacity
								style={{
									width: BTN_WIDTH,
									height: BTN_WIDTH,

									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: 5,
								}}
								onPress={() => this.handleBtnPress(3)}
							>
								<Text style={{ fontSize: 20, fontWeight: '600', color: '#fff', textAlign: 'center' }}>
									Requests
								</Text>
							</TouchableOpacity>
						</LinearGradient>

						<LinearGradient colors={['#000', '#8F55A3']} style={{ alignItems: 'center', borderRadius: 5 }}>
							<TouchableOpacity
								style={{
									width: BTN_WIDTH,
									height: BTN_WIDTH,

									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: 5,
								}}
								onPress={() => this.handleBtnPress(4)}
							>
								<Text style={{ fontSize: 20, fontWeight: '600', color: '#fff', textAlign: 'center' }}>
									Volunteer
								</Text>
							</TouchableOpacity>
						</LinearGradient>
						<LinearGradient colors={['#000', '#8F55A3']} style={{ alignItems: 'center', borderRadius: 5 }}>
							<TouchableOpacity
								style={{
									width: BTN_WIDTH,
									height: BTN_WIDTH,

									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: 5,
								}}
								onPress={() => this.handleBtnPress(5)}
							>
								<Text style={{ fontSize: 20, fontWeight: '600', color: '#fff', textAlign: 'center' }}>
									Reports
								</Text>
							</TouchableOpacity>
						</LinearGradient>
					</View>

					<View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 24 }}>
						<LinearGradient colors={['#000', '#8F55A3']} style={{ alignItems: 'center', borderRadius: 5 }}>
							<TouchableOpacity
								style={{
									width: BTN_WIDTH,
									height: BTN_WIDTH,

									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: 5,
								}}
								onPress={() => this.handleBtnPress(6)}
							>
								<Text style={{ fontSize: 20, fontWeight: '600', color: '#fff', textAlign: 'center' }}>
									Assets
								</Text>
							</TouchableOpacity>
						</LinearGradient>
						<LinearGradient colors={['#000', '#8F55A3']} style={{ alignItems: 'center', borderRadius: 5 }}>
							<TouchableOpacity
								style={{
									width: BTN_WIDTH,
									height: BTN_WIDTH,

									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: 5,
								}}
								onPress={() => this.handleBtnPress(7)}
							>
								<Text style={{ fontSize: 20, fontWeight: '600', color: '#fff', textAlign: 'center' }}>
									Donation Camp
								</Text>
							</TouchableOpacity>
						</LinearGradient>
						<LinearGradient colors={['#000', '#8F55A3']} style={{ alignItems: 'center', borderRadius: 5 }}>
							<TouchableOpacity
								style={{
									width: BTN_WIDTH,
									height: BTN_WIDTH,

									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: 5,
								}}
								onPress={() => this.handleBtnPress(8)}
							>
								<Text style={{ fontSize: 20, fontWeight: '600', color: '#fff', textAlign: 'center' }}>
									Funds
								</Text>
							</TouchableOpacity>
						</LinearGradient>
					</View>
					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'flex-start',
							alignItems: 'flex-start',
							paddingVertical: 24,
							paddingHorizontal: PADDING,
						}}
					>
						<LinearGradient colors={['#000', '#8F55A3']} style={{ alignItems: 'center', borderRadius: 5 }}>
							<TouchableOpacity
								style={{
									width: BTN_WIDTH,
									height: BTN_WIDTH,

									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: 5,
								}}
								onPress={() => this.handleBtnPress(9)}
							>
								<Text style={{ fontSize: 20, fontWeight: '600', color: '#fff', textAlign: 'center' }}>
									Pay
								</Text>
							</TouchableOpacity>
						</LinearGradient>
					</View> */}
					<LandingScreenItem
						title="Dashboard"
						iconSource={dashboardIcon}
						action={this.handleBtnPress}
						id={0}
					/>
					<LandingScreenItem title="Requests" iconSource={requestsIcon} action={this.handleBtnPress} id={3} />
					<LandingScreenItem
						title="Volunteer"
						iconSource={volunteerIcon}
						action={this.handleBtnPress}
						id={4}
					/>
					<LandingScreenItem title="Assets" iconSource={assetsIcon} action={this.handleBtnPress} id={6} />
					<LandingScreenItem
						title="Projects"
						iconSource={donationCampIcon}
						action={this.handleBtnPress}
						id={7}
					/>
					<LandingScreenItem
						title="Settings"
						iconSource={settingsIcon}
						action={this.handleBtnPress}
						id={10}
					/>
				</ScrollView>
			</View>
		);
	}
}
