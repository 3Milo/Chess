import React from 'react';

import './Dialog.css';

class Dialog extends React.Component {

	render() {
		return (
			<div className="background">
				<div className="dialog">
					<h1>{this.props.config.title}</h1>
					<p>{this.props.config.text}</p>
					<div className="buttons">
					{
						this.props.config.buttons.map(text => (
							<button
							  key={text}
							  id={text}
							  onClick={this.props.buttonClick}
							>
							{text}
							</button>
						))
					}
					</div>
				</div>
			</div>
		);
	}
}

export default Dialog;