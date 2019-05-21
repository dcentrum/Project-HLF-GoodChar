import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Styles from './Styles';
import LinearGradient from 'react-native-linear-gradient';

const Button = ({ label, onPress, right = null }) => {
	return (
		<View style={Styles.container}>
			<LinearGradient colors={['#000', '#8F55A3']} style={{ alignItems: 'center' }}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
					<TouchableOpacity style={Styles.touchable} onPress={onPress}>
						<Text style={Styles.label}>{label}</Text>
					</TouchableOpacity>
					{right && (
						<View style={{ paddingHorizontal: 8, justifyContent: 'center', alignItems: 'center' }}>
							<Icon
								style={{ marginHorizontal: 16 }}
								name={right.name}
								type={right.type}
								size={right.size}
								color={right.color}
							/>
						</View>
					)}
				</View>
			</LinearGradient>
		</View>
	);
};

export default Button;
