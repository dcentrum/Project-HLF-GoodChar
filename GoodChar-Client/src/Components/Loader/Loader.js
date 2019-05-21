import React from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';
import Styles from './Styles';

const Loader = props => {
	const { Loading } = props;

	return (
		<Modal transparent={true} visible={Loading} animationType={'none'}>
			<View style={Styles.background}>
				<View style={Styles.container}>
					<ActivityIndicator animating={Loading} color="#7D4976" />
				</View>
			</View>
		</Modal>
	);
};

export default Loader;
