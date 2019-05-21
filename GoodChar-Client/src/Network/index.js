import axios from 'axios';
import { AsyncStorage } from 'react-native';
let axiosInstance = null;
let baseUrl = '';

export const getCauses = async () => {
	let url = await AsyncStorage.getItem('ipaddress', '');
	console.log('causes url ', url);
	if (url.length > 0 && url !== baseUrl) {
		baseUrl = url;
		axiosInstance = axios.create({
			baseURL: baseUrl,
			timeout: 3000,
		});
	}

	return axiosInstance
		.get('/api/causes')
		.then(response => {
			console.log('causes ', response.data);
			return response.data;
		})
		.catch(error => {
			console.log(error.message);
			return null;
		});
};

export const getProjects = async () => {
	let url = await AsyncStorage.getItem('ipaddress', '');
	console.log('causes url ', url);
	if (url.length > 0 && url !== baseUrl) {
		baseUrl = url;
		axiosInstance = axios.create({
			baseURL: baseUrl,
			timeout: 3000,
		});
	}
	return axiosInstance
		.get('/api/projects/')
		.then(response => {
			console.log('projects : ', response.data);
			return response.data;
		})
		.catch(error => {
			return null;
		});
};
