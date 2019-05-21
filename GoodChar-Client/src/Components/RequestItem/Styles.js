import eStyleSheet from 'react-native-extended-stylesheet';

export default eStyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 16,
	},
	label1: {
		paddingHorizontal: 16,
		color: '#260036',
		fontSize: 20,
		fontWeight: '600',
		flex: 1,
	},
	label2: {
		color: '#7D4976',
		fontSize: 14,
		fontWeight: '600',
	},
	topContainer: {
		borderBottomWidth: 0.5,
		height: 70,
		justifyContent: 'center',
		alignItems: 'flex-start',
		borderBottomColor: '#7D4976',
	},
});
