import React from 'react';

class Timer extends React.Component {
	constructor(props) {
	    super(props);
	    this.reset = this.reset.bind(this);
	    this.state = {
	    	time: 0
	    };
	}

	componentDidMount = () => this.startCounting();

	startCounting = () => this.timer = setInterval(() => this.setState({time: this.state.time + 1}), 1000);

	reset() {
		clearInterval(this.timer);
		this.setState({time: 0});
		this.startCounting();
	}

	formatTime(time) {
		let minutes = Math.floor(time / 60),
			seconds = time % 60;

		if (minutes < 10) minutes = '0' + minutes;
		if (seconds < 10) seconds = '0' + seconds;

		return minutes + ':' + seconds;
	}

	render() {
		return <h2>{this.formatTime(this.state.time)}</h2>;
	}
}

export default Timer;