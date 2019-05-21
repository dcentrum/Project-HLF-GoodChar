import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Styles from './Styles';
import { signOutUser } from '../../Utils/Firebase';
import { Button } from '../../Components/Button';

export default class Donorhistory extends Component {
	constructor() {
		super();
		this.handleNewDonationEvent = this.handleNewDonationEvent.bind(this);
	}
	handleNewDonationEvent = () => {
		Alert.alert('Donation screen to be implemented');
	};
	render() {
		return (
			<View style={Styles.container}>
				<View style={[Styles.container, { flex: 1 }]}>
					<TouchableOpacity onPress={() => signOutUser()}>
						<Text>DonorHistory Screen</Text>
					</TouchableOpacity>
				</View>
				<Button label="Make Donation" onPress={this.handleNewDonationEvent} />
			</View>
		);
	}
}
