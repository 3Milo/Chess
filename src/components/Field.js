import React from 'react';

import Pawn from './figures/Pawn';
import Rook from './figures/Rook';
import Knight from './figures/Knight';
import Bishop from './figures/Bishop';
import Queen from './figures/Queen';
import King from './figures/King';

import Context from '../context/Global';

import './Field.css';

class Field extends React.Component {
	constructor(props) {
	    super(props);

	    this.images = {
	    	pawn: require('../images/pawn.svg'),
	    	pawnDark: require('../images/pawn_dark.svg'),
	    	rook: require('../images/rook.svg'),
	    	rookDark: require('../images/rook_dark.svg'),
	    	knight: require('../images/knight.svg'),
	    	knightDark: require('../images/knight_dark.svg'),
	    	bishop: require('../images/bishop.svg'),
	    	bishopDark: require('../images/bishop_dark.svg'),
	    	queen: require('../images/queen.svg'),
	    	queenDark: require('../images/queen_dark.svg'),
	    	king: require('../images/king.svg'),
	    	kingDark: require('../images/king_dark.svg'),
	    };

	    this.changeFigure = (name, color) => {
			this.setState({
				figure: {
					img: this.images[color === 'white' ? name : name + 'Dark'],
					type: name,
					color: color
				}
			});
		};

		this.removeFigure = () => {
			this.setState({
				figure: {
					img: null,
					type: null,
					color: null
				}
			});
		};

		this.activate = () => this.setState({active: true});
		this.check = () => this.setState({check: true});
		this.clear = () => this.setState({active: false, check: false});

		this.onClick = () => this.props.callback();

		this.isEmpty = () => this.state.figure.img === null;
		this.isNotEmpty = () => this.state.figure.img !== null;

		this.hasKing = () => this.state.figure.type === 'king';

		this.hasCurrentPlayerFigure = () => {
			return this.state.figure.color === this.context.player.color;
		};

		this.hasColorFigure = color => this.state.figure.color === color;

		this.hasEnemyFigure = () => {
			return this.isNotEmpty() && this.state.figure.color !== this.context.player.color;
		};

		this.getMoves = fields => {
			const figure = this.state.figure.type;

			if (figure === 'pawn') return new Pawn(this, fields).getMoves();
			else if (figure === 'rook') return new Rook(this, fields).getMoves();
			else if (figure === 'knight') return new Knight(this, fields).getMoves();
			else if (figure === 'bishop') return new Bishop(this, fields).getMoves();
			else if (figure === 'queen') return new Queen(this, fields).getMoves();
			else return new King(this, fields).getMoves();
		};

	    this.displayMoves = fields => {
	    	let state = this.state,
	    		moves = this.getMoves(fields);

	    	if (state.figure.type === 'king') {
	    		this.setState({
					figure: {
						img: null,
						type: null,
						color: null
					}
				}, () => {
					moves.forEach(field => {
						field.isCaptured(fields) ? field.check() : field.activate();
					});

					this.changeFigure(state.figure.type, state.figure.color);
				});
	    	} else {
	    		moves.forEach(field => field.activate());
	    	}
		};

		this.isCaptured = fields => {
			let enemyFields = fields.filter(field => field.hasEnemyFigure());

			for (const field of enemyFields) {
				let moves = field.getMoves(fields);
				for (const move of moves) {
					if (move === this) return true;
				}
			}

			return false;
		};

		this.isChecked = () => this.state.check;
		this.isActive = () => this.state.active;

		this.state = {
	    	active: false,
	    	check: false,
	    	figure: {
	    		img: null,
	    		type: null,
	    		color: null
	    	}
	    };
	}

	static contextType = Context;

	render() {
		let classes = 'Field';
		if (this.state.active) classes += ' active';
		if (this.state.check) classes += ' check';
		
		return (
			<div className={classes} onClick={this.onClick}>
				{this.state.figure && <img src={this.state.figure.img} alt={this.state.figure.type} color={this.state.figure.color}/>}
			</div>
		);
	}
}

export default Field;