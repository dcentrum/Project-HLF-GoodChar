import React from 'react';
import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import { Login } from '../Containers/Login';
import eStyleSheet from 'react-native-extended-stylesheet';
import { Register } from '../Containers/Register';
import DashboardRoute from './DashboardRoute';
import { SplashScreen } from '../Containers/SplashScreen';

const signedOut = createStackNavigator(
	{
		Login: {
			screen: Login,
			navigationOptions: {
				header: null,
			},
		},
		register: {
			screen: Register,
			navigationOptions: {
				header: null,
			},
		},
	},
	{
		initialRouteName: 'Login',
	}
);

// const signedIn = createStackNavigator(
// 	{
// 		LoadingScreen: { screen: LoadingScreen },
// 		Users: { screen: Users },
// 		DonorStack: { screen: DonorStack },
// 		DoneeStack: { screen: DoneeStack },
// 		VolunteerStack: { screen: VolunteerStack },
// 		AdminStack: { screen: AdminStack },
// 	},
// 	{
// 		initialRouteName: 'LoadingScreen',
// 	}
// );

export default () =>
	createSwitchNavigator(
		{
			signedOut: { screen: signedOut },
			DashboardRoute: { screen: DashboardRoute },
			SplashScreen: { screen: SplashScreen },
		},
		{
			initialRouteName: 'SplashScreen',
		}
	);
