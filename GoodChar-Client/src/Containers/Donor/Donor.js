import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Alert } from 'react-native';
import Styles from './Styles';

export default class Donor extends Component {
	render() {
		return (
			<View style={Styles.container}>
				<TouchableHighlight
					onPress={() =>
						firebase
							.auth()
							.signOut()
							.then(() => Alert.alert('sign out succesful'))
							.catch(error => Alert.alert('sign out failed'))
					}
				>
					<Text>Donor Screen</Text>
				</TouchableHighlight>
			</View>
		);
	}
}
