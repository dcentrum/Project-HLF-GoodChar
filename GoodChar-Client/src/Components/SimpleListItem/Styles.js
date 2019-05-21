import eStyleSheet from 'react-native-extended-stylesheet';

export default eStyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingHorizontal: 16,
	},
	label1: {
		color: '#7D4976',
		fontSize: 18,
		fontWeight: '600',
		flex: 1,
	},

	topContainer: {
		borderBottomWidth: 0.5,
		height: 60,
		justifyContent: 'center',
		alignItems: 'flex-start',
		borderBottomColor: '#7D4976',
	},
});
