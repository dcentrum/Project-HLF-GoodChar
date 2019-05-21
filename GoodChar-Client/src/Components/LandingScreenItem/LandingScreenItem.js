import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const LandingScreenItem = ({ iconSource, title, action, id }) => {
	return (
		<View
			style={{
				borderRadius: 5,

				alignItems: 'flex-start',
				justifyContent: 'center',
				borderBottomColor: '#7D4976',
				borderBottomWidth: StyleSheet.hairlineWidth,
			}}
		>
			<TouchableOpacity onPress={() => action(id)}>
				<View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, width: '100%' }}>
					<Image source={iconSource} style={{ height: 24, width: 24, marginRight: 8 }} />

					<Text
						style={{
							paddingVertical: 24,
							paddingHorizontal: 16,
							color: '#260036',
							fontSize: 20,
							fontWeight: '600',
							flex: 1,
						}}
					>
						{title}
					</Text>
					<Icon name="ios-arrow-forward" type="ionicon" color="#260036" />
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default LandingScreenItem;
