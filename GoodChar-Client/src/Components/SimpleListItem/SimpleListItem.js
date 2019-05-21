import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Styles } from '../RequestItem';
import { Icon } from 'react-native-elements';
import { getIconFromName } from '../../Utils/IconUtil';

const SimpleListItem = ({ item, action }) => {
	const icon = getIconFromName('');
	return (
		<TouchableOpacity style={Styles.topContainer} onPress={() => action(item.project_id)}>
			<View style={Styles.container}>
				<Image source={icon} style={{ height: 24, width: 24, marginRight: 8 }} />
				<Text style={Styles.label1}>{item.project_name}</Text>
				<Icon name="ios-arrow-forward" type="ionicon" />
			</View>
		</TouchableOpacity>
	);
};

export default SimpleListItem;
