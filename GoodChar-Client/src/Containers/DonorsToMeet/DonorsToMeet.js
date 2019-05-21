import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Styles from './Styles';
import { signOutUser } from '../../Utils/Firebase';

export default class DonorsToMeet extends Component {
	render() {
		return (
			<View style={Styles.container}>
				<TouchableOpacity onPress={() => signOutUser()}>
					<Text>Meetings Screen</Text>
				</TouchableOpacity>
			</View>
		);
	}
}
