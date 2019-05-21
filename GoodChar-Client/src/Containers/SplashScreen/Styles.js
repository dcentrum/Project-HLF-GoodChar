import eStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default eStyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '$containerBkColor',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	logoContainer: {
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingTop: screenHeight / 7,
		marginBottom: 16,
	},
	logo: {
		width: screenWidth / 2,
		height: screenWidth / 2,
	},
});
