import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, AsyncStorage, Alert } from 'react-native';

class Settings extends Component {
	constructor() {
		super();

		this.state = {
			ipaddres: '',
		};
	}

	async componentDidMount() {
		let url = await AsyncStorage.getItem('ipaddress', '');
		this.setState({ ipaddres: url });
	}

	handleSubmitButton = async () => {
		if (this.state.ipaddres.length > 0) {
			try {
				await AsyncStorage.setItem('ipaddress', this.state.ipaddres);
			} catch (error) {
				Alert.alert('Error', 'Failed to save url to storage');
			}
			this.props.navigation.navigate('LandingScreen');
		} else {
			Alert.alert('Error', 'Enter a valid ipaddress or base url');
		}
	};

	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
				<View style={{ flex: 1, width: '100%', paddingHorizontal: 8, paddingVertical: 8 }}>
					<View
						style={{
							borderRadius: 4,
							borderWidth: 0.5,
							borderColor: '#260036',
						}}
					>
						<TextInput
							style={{ height: 45, padding: 8, fontSize: 22, color: '#260036' }}
							placeholder="Enter base url or ip address"
							value={this.state.ipaddres}
							onChangeText={value => this.setState({ ipaddres: value })}
						/>
					</View>
				</View>
				<View
					style={{
						marginVertical: 16,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#260036',
						borderRadius: 4,
						borderColor: '#aeaeae',
						borderWidth: 0.5,
					}}
				>
					<TouchableOpacity onPress={this.handleSubmitButton}>
						<Text
							style={{
								color: '#fff',
								paddingVertical: 8,
								paddingHorizontal: 32,
								fontSize: 22,
								fontWeight: '600',
							}}
						>
							Submit
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default Settings;
