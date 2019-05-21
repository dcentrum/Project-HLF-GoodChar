import eStyleSheet from 'react-native-extended-stylesheet';

export default eStyleSheet.create({
	container: {
		backgroundColor: '#7D4976',
		borderRadius: 4,
		borderColor: '#7D4976',
		borderWidth: 1,
		marginVertical: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	touchable: {
		marginVertical: 8,
		paddingHorizontal: 16,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 2,
	},
	label: { fontSize: 20, fontWeight: '600', color: '#fff', paddingHorizontal: 16 },
});
