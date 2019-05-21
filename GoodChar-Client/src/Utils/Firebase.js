import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import { Alert } from 'react-native';
export const signOutUser = async () => {
	Alert.alert('signing out user');
	return await firebase
		.auth()
		.signOut()
		.then(() => 200)
		.catch(error => 201);
};
