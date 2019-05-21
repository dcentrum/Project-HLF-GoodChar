import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { DonorsToMeet } from '../Containers/DonorsToMeet';
import { DonationsToProcess } from '../Containers/DonationsToProcess';
import { Funds } from '../Containers/Funds';
import { Icon } from 'react-native-elements';

const VolunteerRoute = createBottomTabNavigator(
	{
		DonorsToMeet: {
			screen: DonorsToMeet,
			navigationOptions: {
				tabBarLabel: 'Meetings',
				tabBarIcon: ({ tintColor }) => <Icon name="user" type="font-awesome" color={tintColor} size={24} />,
			},
		},
		DonationsToProcess: {
			screen: DonationsToProcess,
			navigationOptions: {
				tabBarLabel: 'Donations',
				tabBarIcon: ({ tintColor }) => <Icon name="user" type="font-awesome" color={tintColor} size={24} />,
			},
		},
		Funds: {
			screen: Funds,
			navigationOptions: {
				tabBarLabel: 'Funds/Assets',
				tabBarIcon: ({ tintColor }) => <Icon name="dollar" type="font-awesome" color={tintColor} size={24} />,
			},
		},
	},
	{
		initialRouteName: 'DonorsToMeet',
		activeTintColor: '#7D4976',
		lazy: false,
		tabBarOptions: {
			activeTintColor: '#FFF',
			style: {
				backgroundColor: '#7D4976',
			},
		},
		navigationOptions: {
			header: null,
		},
	}
);

export default VolunteerRoute;
