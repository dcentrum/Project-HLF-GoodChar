import React, { Component } from 'react';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';

// const firebaseConfig = {
// 	apiKey: 'AIzaSyB52O8wvDjJggyGTSLO5ZJ4r_1cROii230',
// 	authDomain: 'goodchar-3b1ff.firebaseapp.com',
// 	databaseURL: 'https://goodchar-3b1ff.firebaseio.com',
// 	projectId: 'goodchar-3b1ff',
// 	storageBucket: 'goodchar-3b1ff.appspot.com',
// };

// firebase.initializeApp(firebaseConfig);

export default class Firebase extends Component {
	constructor() {
		super();
	}

	registerUser = async (email, password) => {
		const result = await firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(user => {
				console.log(user);
				return 200;
			})
			.catch(error => {
				console.log(error);
				if (error.code === 'auth/email-already-in-use') {
					return 201;
				}
				return 203;
			});
		return result;
	};

	signOutUser = async () => {
		return await firebase
			.auth()
			.signOut()
			.then(() => 200)
			.catch(error => 201);
	};

	render() {
		return null;
	}
}
