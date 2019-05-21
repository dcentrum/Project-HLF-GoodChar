import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import Styles from './Styles';

export default class UserInput extends React.PureComponent {
	static defaultProps = {
		editable: true,
		autoCapitalize: 'none',
		placeHolder: 'Enter a value',
		item: '',
		secure: false,
	};
	constructor(props) {
		super(props);
		console.log('item ', props.item);
		this.state = {
			text: props.item.length > 0 ? props.item : '',
		};
		this.handleTextChange = this.handleTextChange.bind(this);
	}

	handleTextChange = value => {
		this.setState({ text: value }, () => this.props.onChangeText(this.state.text));
	};

	// componentDidMount() {
	// 	this.setState({ text: 'hell' });
	// 	console.log('userinput constructor', this.props.item);
	// }

	// componentDidUpdate(prevState, prevProps) {
	// 	console.log(' user input current state ', this.state.text);
	// 	console.log(' user input current props ', this.props.item);
	// 	console.log(' user input prevState ', prevState.text);
	// 	console.log(' user input prevProps ', prevProps.item);
	// 	if (this.state.text !== this.props.item) {
	// 		this.setState({ text: this.props.item });
	// 	}
	// }

	componentWillReceiveProps(nextProps) {
		if ('item' in nextProps) {
			if (nextProps.item !== null && nextProps.item !== undefined) {
				console.log(' componentWillReceiveProps user input current props ', nextProps.item);
			}

			if (nextProps.item !== '' && nextProps.item !== undefined && nextProps.item !== this.state.text) {
				console.log('next props item ', nextProps.item);
				console.log('next props  ', nextProps);
				this.setState({ text: nextProps.item });
			}
		}
	}

	render() {
		const { placeHolder, autoCapitalize, editable, secure, item } = this.props;
		return (
			<View style={Styles.container}>
				<TextInput
					ref={component => (this.ref = component)}
					onChangeText={value => this.handleTextChange(value)}
					style={Styles.input}
					placeholder={placeHolder}
					value={this.state.text}
					numberOfLines={1}
					autoCapitalize={autoCapitalize}
					autoCorrect={false}
					underlineColorAndroid="transparent"
					editable={editable}
					secureTextEntry={secure}
				/>
			</View>
		);
	}
}

// UserInput.propTypes = {
// 	placeHolder: PropTypes.string,
// };
