import { createStackNavigator } from 'react-navigation';
import { LandingScreen } from '../Containers/LandingScreen';
import { DashBoard } from '../Containers/DashBoard';
import { Donee } from '../Containers/Donee';
import { Donor } from '../Containers/Donor';
import { Requests } from '../Containers/Requests';
import { Volunteer } from '../Containers/Volunteer';
import { Reports } from '../Containers/Reports';
import { Assets } from '../Containers/Assets';
import { DonationCampList } from '../Containers/DonationCampList';
import { DonationCamp } from '../Containers/DonationCamp';
import { Settings } from '../Containers/Settings';

import { Funds } from '../Containers/Funds';
import { Pay } from '../Containers/Pay';
import { TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import React from 'react';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import DonationCampStack from './DonationCampStack';
const DashboardRoute = createStackNavigator({
	LandingScreen: {
		screen: LandingScreen,
		navigationOptions: {
			headerTitle: 'GoodChar',

			headerStyle: {
				backgroundColor: '#7D4976',
			},
			headerTitleStyle: {
				color: '#fff',
				fontSize: 24,
				fontWeight: '600',
				textAlign: 'center',
			},
			headerTintColor: '#fff',
			headerBackTitle: 'Home',
			headerBackTitleStyle: {
				color: '#fff',
			},
			headerRight: (
				<TouchableOpacity onPress={() => firebase.auth().signOut()} style={{ marginRight: 24 }}>
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						<Icon name="ios-log-out" type="ionicon" size={24} color="#fff" />
					</View>
				</TouchableOpacity>
			),
		},
	},
	DashBoard: {
		screen: DashBoard,
		navigationOptions: {
			headerTitle: 'DashBoard',
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
	Donee: {
		screen: Donee,
		navigationOptions: {
			headerTitle: 'Donee',
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
	Donor: {
		screen: Donor,
		navigationOptions: {
			headerTitle: 'Donor',
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
	Requests: {
		screen: Requests,
		navigationOptions: {
			headerTitle: 'Requests',
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
	Volunteer: {
		screen: Volunteer,
		navigationOptions: {
			headerTitle: 'Volunteer',
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
	Reports: {
		screen: Reports,
		navigationOptions: {
			headerTitle: 'Reports',
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
	Assets: {
		screen: Assets,
		navigationOptions: {
			headerTitle: 'Assets',
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
	Funds: {
		screen: Funds,
		navigationOptions: {
			headerTitle: 'Funds',
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
	Pay: {
		screen: Pay,
		navigationOptions: {
			headerTitle: 'Pay',
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
	DonationCampList: {
		screen: DonationCampList,
		navigationOptions: {
			headerTitle: 'Projects',
			headerBackTitle: 'Back',
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
	Settings: {
		screen: Settings,
		navigationOptions: {
			headerTitle: 'Settings',
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
});

export default DashboardRoute;
