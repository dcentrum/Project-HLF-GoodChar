/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import eStyleSheet from 'react-native-extended-stylesheet';
import createAppContainer from './src/Router';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';

eStyleSheet.build({
	$containerBkColor: '#ffffff',
	$blackColor: '#000',
	$textGoldYellow: '#F9A602',
	$textCharcoalGrey: '#333333',
	$purple: '#8F55A3',
	$dark_purple: '#7D4976',
	$icon_color: '#69324F',
});

export default class App extends Component {
	constructor() {
		super();
		const firebaseConfig = {
			apiKey: 'AIzaSyB52O8wvDjJggyGTSLO5ZJ4r_1cROii230',
			authDomain: 'goodchar-3b1ff.firebaseapp.com',
			databaseURL: 'https://goodchar-3b1ff.firebaseio.com',
			projectId: 'goodchar-3b1ff',
			storageBucket: 'goodchar-3b1ff.appspot.com',
			persistence: true,
		};
		firebase.initializeApp(firebaseConfig);
		this.state = {
			user: null,
		};
		console.disableYellowBox = true;
	}

	render() {
		const AppContainer = createAppContainer();
		return <AppContainer />;
	}
}
