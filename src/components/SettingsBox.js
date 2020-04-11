import React from 'react';

import './SettingsBox.css';

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.checkboxes = new Array(4).fill().map(() => React.createRef());
		this.state = {
			name: '',
			colorIndex: 0
		};
	}

	onNameChange(event) {
		this.setState({name: event.target.value});
	}

	onCheckboxClick(index) {
		this.setState({colorIndex: index});
	}

	render() {
		return (
			<div className="SettingsBox">
				<div className="form">
					<h2>{this.props.title}</h2>
					<div className='name'>
						<p>Name:</p>
						<input onChange={this.onNameChange.bind(this)}></input>
					</div>
					<div className='colors'>
						<p>Background:</p>
						{
							this.checkboxes.map((ref, index) => (
								<label key={'checkbox-' + index} className="checkbox">
									<input
										type="checkbox"
										ref={this.checkboxes[index]}
										checked={this.state.colorIndex === index}
										onChange={this.onCheckboxClick.bind(this, index)}
									/>
									<span className={'checkmark color' + index}></span>
								</label>
							))
						}
					</div>
				</div>
				<div className='imgContainer'>
					<img src={this.props.img} alt='figure'/>
				</div>
			</div>
		);
	}
}

export default Settings;