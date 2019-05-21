import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import { Reports } from '../Containers/Reports';
import { Assets } from '../Containers/Assets';
import { Users } from '../Containers/Users';
import { Requests } from '../Containers/Requests';
import { Icon } from 'react-native-elements';
const AdminRoute = createBottomTabNavigator(
	{
		Users: {
			screen: Users,
			navigationOptions: {
				tabBarLabel: 'Users',
				tabBarIcon: ({ tintColor }) => <Icon name="user" type="font-awesome" color={tintColor} size={24} />,
			},
		},
		Requests: {
			screen: Requests,
			navigationOptions: {
				tabBarLabel: 'Requests',
				tabBarIcon: ({ tintColor }) => <Icon name="ios-hand" type="ionicon" color={tintColor} size={24} />,
			},
		},
		Assets: {
			screen: Assets,
			navigationOptions: {
				tabBarLabel: 'Assets',
				tabBarIcon: ({ tintColor }) => <Icon name="dollar" type="font-awesome" color={tintColor} size={24} />,
			},
		},
		Reports: {
			screen: Reports,
			navigationOptions: {
				tabBarLabel: 'Reports',
				tabBarIcon: ({ tintColor }) => <Icon name="file-o" type="font-awesome" color={tintColor} size={24} />,
			},
		},
	},
	{
		initialRouteName: 'Users',
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

export default AdminRoute;
