import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { SimpleListItem } from '../../Components/SimpleListItem';
import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';

const campList = [
	'Food Distribution Camp',
	'Blankets Distribution Camp',
	'Books Distribution Camp',
	'Clothes Distribution Camp',
	'Blood Donation Camp',
];

class DonationCampList extends Component {
	constructor() {
		super();
		this.state = {
			user: null,

			projects: [],
		};
	}
	handleItemSelection = project_id => {
		let user = firebase.auth().currentUser;
		console.log('donationcamp list ', user);
		if (user) {
			const uid = user.uid;
			const rootRef = firebase.database().ref();
			const userRef = rootRef.child('users');

			userRef.once(
				'value',
				function(snapShot) {
					snapShot.forEach(snapShotItem => {
						if (snapShotItem.val().uid === uid) {
							//console.log('user Donation Camp user', snapShotItem.val());
							let name = snapShotItem.val().name;
							console.log('user Donation Camp user', name);
							this.setState({ user: snapShotItem.val() }, () =>
								this.props.navigation.navigate('DonationCamp', {
									user: this.state.user,
									project: this.state.projects.find(item => item.project_id === project_id),
								})
							);
							return;
						}
					});
				}.bind(this)
			);
		}
	};

	componentDidMount() {
		//let projects = await getProjects();
		let projects = [
			{
				_id: '5c7179f60876ee0f11990d4a',
				comments: 'Blood Donation camp project',
				project_status: 'NA',
				cause_id: 1,
				donationcamp_status: 'NA',
				donationcamp_name: 'dcentrum office',
				donationcamp_id: 1,
				project_name: 'Blood Donation camp',
				project_id: 5,
				__v: 0,
			},
			{
				_id: '5c717a420876ee0f11990d4b',
				comments: 'Feed the Hunger project',
				project_status: 'NA',
				cause_id: 3,
				donationcamp_status: 'NA',
				donationcamp_name: 'Mehidipatnam charity centre',
				donationcamp_id: 1,
				project_name: 'Feed the Hunger',
				project_id: 4,
				__v: 0,
			},
			{ _id: '5c717afd0876ee0f11990d4c', __v: 0 },
			{ _id: '5c717b100876ee0f11990d4d', __v: 0 },
			{
				_id: '5c7187a122382b15d1e39b15',
				comments: 'To donate Food & Blankets near Madhapur',
				project_status: 'Active',
				cause_id: 1,
				donationcamp_status: 'Active',
				donationcamp_name: 'Food & Blanlets distrubution',
				donationcamp_id: 1,
				project_name: 'CGI',
				project_id: 1,
				__v: 0,
			},
		];

		console.log('projects :', projects);
		let projectsList = projects.filter(item => item.hasOwnProperty('project_name'));
		console.log('projects list:', projectsList);
		// let camps = projectsList.map(item => {
		// 	if (item.donationcamp_name !== undefined && item.donationcamp_name !== null) {
		// 		let key = 'donationcamp_name';
		// 		let obj = {};
		// 		obj[key] = item.donationcamp_name;
		// 		key = '_id';
		// 		obj[_id] = item.donationcamp_id;
		// 		return obj;
		// 	}
		// });
		// let result = projectsList.map(item => {
		// 	if (item.project_name !== undefined && item.project_name !== null) {
		// 		let key = '_id';
		// 		let obj = {};
		// 		obj[key] = item.project_id;
		// 		key = 'project_name';
		// 		obj[key] = item.project_name;
		// 		return obj;
		// 	}
		// });

		this.setState({ projects: projectsList }, () => console.log('result', projectsList));
	}

	render() {
		return (
			<View>
				<FlatList
					keyExtractor={item => item}
					data={this.state.projects}
					renderItem={({ item }) => <SimpleListItem item={item} action={this.handleItemSelection} />}
				/>
			</View>
		);
	}
}

export default DonationCampList;
