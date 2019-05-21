import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import Styles from './Styles';

const TextLink = ({ label1, label2, onPress }) => {
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={Styles.container}>
				<Text style={Styles.label1}>{label1}</Text>
				<Text style={Styles.label2}>{label2}</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default TextLink;
