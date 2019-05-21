import React, { Component } from 'react';
import { View, Alert, Text, TouchableWithoutFeedback, StyleSheet, Platform, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import Styles from './Styles';
import { UserInput } from '../../Components/UserInput';
import { Button } from '../../Components/Button';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import QRCodeScanner from 'react-native-qrcode-scanner';
var Sound = require('react-native-sound');
import { getProjects } from '../../Network';
import FingerprintScanner from 'react-native-fingerprint-scanner';

const right = { name: 'qrcode', type: 'font-awesome', size: 24, color: '#fff' };
let audioFile = require('../../../assets/goodchar_donation.mp3');
const data = [{ value: 'First' }, { value: 'Second' }, { value: 'Third' }];
const campName = { First: 'First Project', Second: 'Second Project', Third: 'Third Project' };

const campList = [
	{ donationcamp_name: 'Food Distribution Camp', project_name: 'Food Project' },
	{ donationcamp_name: 'Blankets Distribution Camp', project_name: 'Blankets Project' },
	{ donationcamp_name: 'Books Distribution Camp', project_name: 'Books Project' },
	{ donationcamp_name: 'Clothes Distribution Camp', project_name: 'Clothes Project' },
	{ donationcamp_name: 'Blood Donation Camp', project_name: 'Blood Project' },
];

export default class DonationCamp extends Component {
	constructor(props) {
		super(props);
		let user = props.navigation.getParam('user', '');
		let project = props.navigation.getParam('project', null);
		console.log('donationcamp  ', user);
		console.log('donationcamp  project', project);
		this.state = {
			volunteer: user,
			project: project,
			camps: [],
			donee: '',
			campName: '',
			recording: false,
			qr_code_result: '',
			playing: false,
			authorized_donee: false,
		};
		this.handleVolunteerName = this.handleVolunteerName.bind(this);
		this.handleProjectName = this.handleProjectName.bind(this);
		this.handleDoneeName = this.handleDoneeName.bind(this);
		this.whoosh = new Sound(audioFile, error => {
			if (error) {
				console.log('failed to load the sound', error);
				return;
			}
		});
		Sound.setCategory('Playback');
		this.whoosh.setVolume(0.8);
	}

	componentDidMount() {
		let key = 'value';
		let obj = {};
		obj[key] = this.state.project.donationcamp_name;
		let camps = [];
		camps.push(obj);
		this.setState({ camps: camps });
	}

	componentWillUnmount() {
		this.whoosh.release();
	}

	handleVolunteerName = value => {
		console.log(' handleVolunteerName', value);
		this.setState({
			volunteer: value,
		});
	};

	handleProjectName = value => {
		if (value.length > 0) {
			this.setState({ campName: value });
		}
	};

	handleDoneeName = value => {
		this.setState({ donee: value });
	};

	handleDonationAsset = () => {
		if (!this.state.recording) {
			this.setState({ recording: true });
		} else {
			this.setState({ recording: false });
		}
	};

	resetAllFields = () => {
		this.whoosh.stop();

		this.setState({
			camps: ' ',
			project: ' ',
			donee: ' ',
			recording: false,
			qr_code_result: '',
			playing: false,
			authorized_donee: false,
		});

		//this.refs.camp.value = '';
	};
	handleCompleteDonation = () => {
		if (!this.state.volunteer || this.state.volunteer.length <= 0) {
			Alert.alert('Invalid Volunteer details');
			return;
		}

		if (!this.state.project || this.state.project.length <= 0) {
			Alert.alert('Invalid Project details');
			return;
		}

		if (!this.state.donee || this.state.donee.length <= 0) {
			Alert.alert('Invalid Donee details');
			return;
		}

		if (!this.state.qr_code_result || this.state.qr_code_result.length <= 0) {
			Alert.alert('Invalid Asset details');
			return;
		}

		if (!this.state.qr_code_result || this.state.qr_code_result.length <= 0) {
			Alert.alert('Invalid Asset details');
			return;
		}

		if (!this.state.authorized_donee) {
			Alert.alert('Unauthorized donee, Scan your finger');
			return;
		}

		Alert.alert('Congratulations', `Donation succesful, Block created`, [
			{
				text: 'Go To Dashboard',
				onPress: () => this.gotoLandingScreen(),
			},
			{
				text: 'Next Donation',
				onPress: async () => {
					this.resetAllFields();
				},
			},
			{ cancelable: true },
		]);
	};

	gotoLandingScreen = () => {
		this.props.navigation.navigate('LandingScreen');
	};

	render() {
		console.log('render user name ', this.state.volunteer);
		return (
			<View style={{ flex: 1, justifyContent: 'flex-start' }}>
				<View style={{ flex: 1, justifyContent: 'flex-start' }}>
					<ScrollView
						ref="scrollView"
						onContentSizeChange={(width, height) =>
							this.refs.scrollView.scrollTo(this.state.recording ? 250 : 0)
						}
					>
						<View style={{ justifyContent: 'flex-start' }}>
							<View
								style={{
									justifyContent: 'center',
									alignItems: 'flex-start',
									marginTop: 12,
									paddingHorizontal: 16,
									width: '100%',
								}}
							>
								<Text style={{ fontSize: 8, color: '#260036', marginBottom: 8 }}>Volunteer Name</Text>
								<Text style={{ fontSize: 20, color: '#260036' }}>{this.state.volunteer.name} </Text>
							</View>
							<View
								style={{
									justifyContent: 'center',
									alignItems: 'flex-start',
									marginTop: 12,
									paddingHorizontal: 16,
									width: '100%',
								}}
							>
								<Text style={{ fontSize: 8, color: '#260036', marginBottom: 8 }}>Project Name</Text>
								<Text style={{ fontSize: 20, color: '#260036' }}>
									{this.state.project.project_name}{' '}
								</Text>
							</View>

							<View style={{ paddingHorizontal: 16 }}>
								<Dropdown
									ref="camp"
									label="Select Camp Name"
									data={this.state.camps}
									onChangeText={value => this.handleProjectName(value)}
								/>
							</View>

							<View
								style={{
									paddingHorizontal: 16,
									justifyContent: 'space-around',
									alignItems: 'center',
								}}
							>
								{this.state.recording && (
									<View style={{ flex: 1 }}>
										<QRCodeScanner
											onRead={e => this.setState({ qr_code_result: e.data, recording: false })}
										/>
										<View
											style={{
												backgroundColor: 'transparent',
												height: 30,
												position: 'absolute',
												right: 4,
												top: 4,
											}}
										>
											<TouchableWithoutFeedback
												onPress={() => this.setState({ recording: false })}
											>
												<Icon name="window-close" type="font-awesome" size={32} color="#aaa" />
											</TouchableWithoutFeedback>
										</View>
									</View>
								)}
								<Button label="Scan Asset" onPress={this.handleDonationAsset} right={right} />
								{this.state.qr_code_result.length > 0 && (
									<View>
										<Text
											style={{
												paddingHorizontal: 16,
												fontSize: 16,
												fontWeight: '600',
												color: '#333333',
											}}
											numberOfLines={2}
											ellipsizeMode="tail"
										>
											{this.state.qr_code_result}
										</Text>
									</View>
								)}
							</View>
							<TouchableWithoutFeedback
								onPress={() => {
									this.setState({ playing: !this.state.playing }, () => {
										if (this.state.playing) {
											this.whoosh.play(success => this.setState({ playing: false }));
										} else {
											this.whoosh.stop();
										}
									});
								}}
							>
								<View
									style={{
										backgroundColor: '#7D4976',
										flexDirection: 'row',
										justifyContent: 'center',
										alignItems: 'center',
										height: 50,
										marginTop: 16,
										paddingHorizontal: 16,
										borderBottomWidth: StyleSheet.hairlineWidth,
										borderBottomColor: '#333333',
									}}
								>
									<Icon
										name={this.state.playing ? 'pause-circle' : 'play-circle'}
										type="font-awesome"
										size={32}
										color="#fff"
									/>
									<Text
										style={{
											color: '#fff',
											fontSize: Platform.OS === 'ios' ? 20 : 18,
											fontWeight: '500',
											flex: 1,
											marginLeft: 24,
										}}
									>
										Audio Announcement
									</Text>
								</View>
							</TouchableWithoutFeedback>
						</View>
						<View
							style={{
								flex: 1,
								justifyContent: 'space-evenly',
								alignItems: 'center',
								backgroundColor: '#fff',
								paddingTop: 16,
							}}
						>
							<TouchableWithoutFeedback
								onPress={() => {
									FingerprintScanner.isSensorAvailable()
										.then(biometryType => {
											console.log('sensor available  press');
											FingerprintScanner.authenticate({
												description: 'Scan your fingerprint on the device scanner to continue',
											})
												.then(() => {
													Alert.alert('Authenticated successfully');
													this.setState({ authorized_donee: true });
												})
												.catch(error => {
													Alert.alert('Authenticated failed');
													this.setState({ authorized_donee: true });
												});
										})
										.catch(error => console.log('sensor error'));
									console.log('onlong press');
								}}
							>
								<Icon name="fingerprint" type="material-community" color="#333333" size={80} />
							</TouchableWithoutFeedback>
							<UserInput
								placeHolder="Enter Donee Name"
								autoCapitalize="words"
								onChangeText={this.handleDoneeName}
								item={this.state.donee}
							/>
							<Button label="Complete Donation" onPress={this.handleCompleteDonation} />
						</View>
					</ScrollView>
				</View>
			</View>
		);
	}
}
