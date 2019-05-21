import React from 'react';
import { Donation } from '../Containers/Donation';
import { DonorHistory } from '../Containers/DonorHistory';
import { createStackNavigator } from 'react-navigation';

const DonorRoute = createStackNavigator(
	{
		Donation: {
			screen: Donation,
			navigationOptions: {
				headerTitle: 'Donate',
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
		DonorHistory: {
			screen: DonorHistory,
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
	},
	{
		initialRouteName: 'DonorHistory',
	}
);

export default DonorRoute;
