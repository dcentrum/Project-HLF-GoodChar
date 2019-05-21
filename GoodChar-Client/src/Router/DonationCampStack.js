import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { DonationCamp } from '../Containers/DonationCamp';
import { DonationCampList } from '../Containers/DonationCampList';

const DonationCampStack = createStackNavigator(
	{
		DonationCampList: {
			screen: DonationCampList,
			navigationOptions: {
				headerTitle: 'Donation Camps',
				headerBackTitle: 'Home',
				headerStyle: {
					backgroundColor: '#7D4976',
				},
				headerTitleStyle: {
					color: '#fff',
					fontSize: 24,
					fontWeight: '600',
				},
				headerTintColor: '#fff',
				headerBackTitleStyle: {
					color: '#fff',
				},
			},
		},
		DonationCamp: {
			screen: DonationCamp,
			navigationOptions: {
				headerTitle: 'Donation Camp',
				headerStyle: {
					backgroundColor: '#7D4976',
				},
				headerTitleStyle: {
					color: '#fff',
					fontSize: 24,
					fontWeight: '600',
				},
				headerTintColor: '#fff',
				headerBackTitleStyle: {
					color: '#fff',
				},
			},
		},
	},
	{
		initialRouteName: 'DonationCampList',
	}
);

export default DonationCampStack;
