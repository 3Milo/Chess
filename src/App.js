import React from 'react';
import ChessBoard from './components/ChessBoard';
import Timer from './components/Timer';
import Dialog from './components/Dialog';
import Settings from './components/Settings';

import Context from './context/Global';

import './App.css';


class App extends React.Component {
	constructor(props) {
		super(props);

		this.chessboard = React.createRef();
		this.timer = React.createRef();

		this.players = [{
			name: '',
			color: 'white',
			leftRookMoved : false,
			rightRookMoved: false,
			kingMoved: false,
			castleMade: false,
			background: ''
		},{
			name: '',
			color: 'black',
			leftRookMoved : false,
			rightRookMoved: false,
			kingMoved: false,
			castleMade: false,
			background: ''
		}];

		this.dialog = {
			title: '',
			text: '',
			buttons: [],
			type: ''
		};

		this.changePlayer = () => {
			this.setState(state => ({
				player: state.player === this.players[0] ? this.players[1] : this.players[0]
			}));

			document.body.style.background = this.state.player.background;

			this.timer.current.reset();
		};

		this.toggleProperty = propName => {
			const allowedNames = ['leftRookMoved', 'rightRookMoved', 'kingMoved', 'castleMade'];

			if (allowedNames.indexOf(propName) === -1) return;

			let currentPlayer = this.state.player,
				propValue = currentPlayer[propName];

			this.players.forEach(player => {
				if (player.name === currentPlayer.name) {
					player[propName] = !propValue;
				}
			});

			this.players.forEach(player => {
				if (player.name === currentPlayer.name) {
					this.setState({player: player});
				}
			});
		};

		this.openDialog = config => {
			this.dialog.title = config.title;
			this.dialog.text = config.text;
			this.dialog.buttons = config.buttons;
			this.dialog.type = config.type;

			this.setState({isDialogOpen: true});
		};

		this.state = {
			player: this.players[0],
			changePlayer: this.changePlayer,
			toggleProperty: this.toggleProperty,
			openDialog: this.openDialog,
			openSettings: true,
			isDialogOpen: false 
		};
	}

	static contextType = Context;

	onDialogButtonClick(el) {
		let button = el.target.id,
			dialogType = this.dialog.type;

		this.setState({isDialogOpen: false});

		this.chessboard.current.onDialogButtonClick(button, dialogType);
	}

	onStart(players) {
		if (!players[0].name || !players[1].name) return;

		this.players[0].name = players[0].name;
		this.players[0].background = players[0].background;

		this.players[1].name = players[1].name;
		this.players[1].background = players[1].background;

		document.body.style.background = this.players[0].background;

		this.setState({openSettings: false});
	}

	render() {
		return (
			<div className="App">
			{this.state.isDialogOpen &&
				<Dialog config={this.dialog} buttonClick={this.onDialogButtonClick.bind(this)} />
			}
			{this.state.openSettings
				? <Settings callback={this.onStart.bind(this)}/>
				: (
					<React.Fragment>
						<h1>{this.state.player.name}</h1>
						<Timer ref={this.timer} />
						<Context.Provider value={this.state}>
							<ChessBoard ref={this.chessboard} />
						</Context.Provider>
						<div className='icons'>
							<span>Icons made by </span> 
							<a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">
								Good Ware
							</a>
							<span> from </span> 
							<a href="https://www.flaticon.com/" title="Flaticon">
								www.flaticon.com
							</a>
						</div>
					</React.Fragment>
				)
			}
			</div>
		);
	}
}

export default App;
