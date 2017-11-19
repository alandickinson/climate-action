import React from 'react';
import createClass from 'create-react-class';
import Select from 'react-select';

const STATES = require('../data/states');

const States = createClass({
	displayName: 'StatesField',
	getDefaultProps () {
		return {
			label: 'Select your state',
			searchable: true,
		};
	},
	getInitialState () {
		return {
			disabled: false,
			searchable: this.props.searchable,
			selectValue: null,
			clearable: false,
			rtl: false,
		};
	},
	handleChange (newValue) {
		this.setState({
			selectValue: newValue,
		});
    this.props.onChange(newValue)
	},
	render () {
		var options = STATES['US'];
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select
					id="state-select"
					ref="stateSelect"
					autoFocus
					options={options}
					simpleValue
					name="selected-state"
					value={this.state.selectValue}
					onChange={this.handleChange}
					searchable={this.state.searchable}
				/>
			</div>
		);
	}
});

export default States
