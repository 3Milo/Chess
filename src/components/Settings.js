import React from 'react';
import SettingsBox from './SettingsBox';

import figure from '../images/pawn.svg';
import darkFigure from '../images/pawn_dark.svg';

import './Settings.css';

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.box1 = React.createRef();
		this.box2 = React.createRef();
		this.colors = ['tan', 'darkseagreen', 'indianred', 'lightblue'];
	}

	onStart() {
		let box1 = this.box1.current,
			box2 = this.box2.current;

		this.props.callback([{
			name: box1.state.name,
			background: this.colors[box1.state.colorIndex]
		},{
			name: box2.state.name,
			background: this.colors[box2.state.colorIndex]
		}]);
	}

	render() {
		return (
			<div className="background">
				<div className="settings">
					<h1>Settings</h1>
					<SettingsBox ref={this.box1} title='Player 1' img={figure} />
					<SettingsBox ref={this.box2} title='Player 2' img={darkFigure} />
					<button onClick={this.onStart.bind(this)}>Start</button>
				</div>
			</div>
		);
	}
}

export default Settings;