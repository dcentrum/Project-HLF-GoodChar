import eStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
const imageWidth = Dimensions.get('window').width / 2;

export default eStyleSheet.create({
	$logoNormalWidth: imageWidth,
	$logoMinWidth: imageWidth / 2,
	container: {
		flex: 1,
		backgroundColor: '$containerBkColor',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 16,
	},
	keyboardAvoidingView: {
		flex: 1,
	},
	logoContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 16,
	},
	logoNormal: {
		width: '$logoNormalWidth',
		height: '$logoNormalWidth',
	},
	logoMin: {
		width: '$logoMinWidth',
		height: '$logoMinWidth',
	},
});
