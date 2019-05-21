import { createStackNavigator } from 'react-navigation';
import { DoneeHistory } from '../Containers/DoneeHistory';

const DoneeRoute = createStackNavigator({
	DoneeHistory: {
		screen: DoneeHistory,
		navigationOptions: {
			headerTitle: 'Donation History',
			headerStyle: {
				backgroundColor: '#7D4976',
			},
			headerTitleStyle: {
				color: '#fff',
				fontSize: 22,
				fontWeight: '600',
			},
		},
	},
});

export default DoneeRoute;
