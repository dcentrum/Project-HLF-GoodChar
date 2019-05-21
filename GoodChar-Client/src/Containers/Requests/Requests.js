import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import Styles from './Styles';
import { RequestItem } from '../../Components/RequestItem';
import { getCauses } from '../../Network';

export default class Requests extends Component {
	constructor() {
		super();
		this.state = {
			causes: [
				{
					_id: '5c710e7eda9b5c09966f6e57',
					comments: 'blood donation',
					cause_type: 'blood donation',
					cause_name: 'blood donation',
					cause_id: 1,
					__v: 0,
				},
				{
					_id: '5ccaec811126480d37059f31',
					comments: 'Support to Senior Citizens',
					cause_type: 'Support',
					cause_name: 'Support to Senior Citizens',
					cause_id: 2,
					__v: 0,
				},
			],
		};
	}

	async componentWillMount() {
		//let causes = await getCauses();
		//console.log('causes requests ', causes);
		// if (causes) {
		// 	this.setState({ causes: causes });
		// } else {
		// 	this.setState({ causes: [] });
		// }
	}

	render() {
		return (
			<View style={Styles.container}>
				{this.state.causes.length > 0 && (
					<FlatList
						keyExtractor={item => item._id}
						data={this.state.causes}
						renderItem={({ item }) => <RequestItem label={item.cause_name} />}
					/>
				)}
			</View>
		);
	}
}
