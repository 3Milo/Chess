import React from 'react';

import Field from './Field';

import Context from '../context/Global';

import './ChessBoard.css';


class ChessBoard extends React.Component {
	constructor(props) {
	    super(props);
	    this.changeFocus = this.changeFocus.bind(this);
	    this.onFieldClick = this.onFieldClick.bind(this);

	    this.fieldRefs = new Array(64).fill().map(() => React.createRef());

	    this.destinationField = null;
	    this.selectedField = null;
	    this.popupVisible = false;
	    this.state = {
	    	popup: {
	    		text: null,
	    		buttons: null,
	    		type: null
	    	}
	    };
	}

	static contextType = Context;

	componentDidMount() {
		this.fields = this.fieldRefs.map(ref => ref.current);

		[0,7].forEach(i => this.fields[i].changeFigure('rook','black'));
		[56,63].forEach(i => this.fields[i].changeFigure('rook','white'));

		[1,6].forEach(i => this.fields[i].changeFigure('knight','black'));
		[57,62].forEach(i => this.fields[i].changeFigure('knight','white'));

		[2,5].forEach(i => this.fields[i].changeFigure('bishop','black'));
		[58,61].forEach(i => this.fields[i].changeFigure('bishop','white'));

		this.fields[3].changeFigure('queen','black');
		this.fields[59].changeFigure('queen','white');

		this.fields[4].changeFigure('king','black');
		this.fields[60].changeFigure('king','white');

		[8,9,10,11,12,13,14,15].forEach(i => this.fields[i].changeFigure('pawn','black'));
		[48,49,50,51,52,53,54,55].forEach(i => this.fields[i].changeFigure('pawn','white'));
	}

	componentDidUpdate() {
		let kingField = this.fields.find(f => f.hasKing() && f.hasCurrentPlayerFigure());
		if (kingField.isCaptured(this.fields)) kingField.check();
	}

	async onFieldClick(ref) {
		const selectedField = this.selectedField,
			popupVisible = this.state.popupVisible,
			field = ref.current,
			state = field.state,
			figure = state.figure.type,
			color = state.figure.color;

		if ((!figure && !selectedField) || popupVisible) return;

		this.destinationField = field;

		if (selectedField) {
			if (!figure || color !== this.context.player.color) {
				if (field.isActive()) {
					await this.makeMove(field, selectedField);

					const kingField = this.fields.find(f => f.hasKing() && f.hasCurrentPlayerFigure());

					if (kingField.isCaptured(this.fields)) {
						this.revertMove(field, selectedField);
						this.context.openDialog({
							title: 'Move not allowed',
							text: "You can't make this move because your king would be in check.",
							buttons: ['OK'],
							type: 'revert'
						});
					} else {
						this.clearFields();
						this.selectedField = null;
						this.context.changePlayer();
					}
				}
			} else {
				if (this.isCastleAllowed(field, selectedField)) {
					return this.context.openDialog({
						title: 'Castle',
						text: 'Do you want to castle?',
						buttons: ['Yes', 'No'],
						type: 'castle'
					});
				}
				this.changeFocus(field);
				this.selectedField = field;
			}
		} else {
			if (color === this.context.player.color) {
				this.changeFocus(field);
				this.selectedField = field;
			}
		}
	}

	isCastleAllowed(field, selectedField) {
		const currentPlayer = this.context.player,
			color = currentPlayer.color;

		if (currentPlayer.castleMade) return false;
		if (currentPlayer.kingMoved) return false;

		let rook = [field, selectedField].find(f => {
			return f.state.figure.type === 'rook'
				&& f.state.figure.color === color;
		});

		let king = [field, selectedField].find(f => {
			return f.state.figure.type === 'king'
				&& f.state.figure.color === color;
		});

		if (!rook || !king) return false;

		let rookIndex = this.fields.indexOf(rook),
			kingIndex = this.fields.indexOf(king);

		if (king.isCaptured(this.fields)) return false;

		//check if rooks and king are standing on right positions and have not already moved
		if (color === 'white') {
			if (kingIndex !== 60) return false;
			if (rookIndex !== 56 && rookIndex !== 63) return false;
			if (currentPlayer.leftRookMoved && rookIndex === 56) return false;
			if (currentPlayer.rightRookMoved && rookIndex === 63) return false;
		} else {
			if (kingIndex !== 4) return false;
			if (rookIndex !== 0 && rookIndex !== 7) return false;
			if (currentPlayer.leftRookMoved && rookIndex === 0) return false;
			if (currentPlayer.rightRookMoved && rookIndex === 7) return false;
		}

		//check if fields between are free
		let start = rookIndex > kingIndex ? kingIndex : rookIndex,
			end = rookIndex > kingIndex ? rookIndex : kingIndex;

		for (let i = start + 1; i < end; i++) {
			if (this.fields[i].isNotEmpty()) return false;
		}

		//check if king moves through captured field and ends in check
		if (rookIndex > kingIndex) {
			if(this.fields[kingIndex + 1].isCaptured(this.fields)) return false;
			if(this.fields[kingIndex + 2].isCaptured(this.fields)) return false;
		} else {
			if(this.fields[kingIndex - 1].isCaptured(this.fields)) return false;
			if(this.fields[kingIndex - 2].isCaptured(this.fields)) return false;
		}

		return true;
	}

	changeFocus(field) {
		if (field.isChecked()) {
			this.clearFields();
			field.check();
		} else {
			this.clearFields();
		}

		field.displayMoves(this.fields);

		if (!field.isChecked()) field.activate();
	}

	clearFields() {
		let activeFields = this.fields.filter(el => el.state.active || el.state.check);
		activeFields.forEach(el => el.clear());
	}

	makeMove(field, selectedField) {
		const figure = selectedField.state.figure.type,
			color = selectedField.state.figure.color,
			index = this.fields.indexOf(selectedField),
			row = Math.floor(this.fields.indexOf(field) / 8);

		if (color === 'white' && figure === 'rook' && index === 56) {
			this.context.toggleProperty('leftRookMoved');
		}
		if (color === 'white' && figure === 'rook' && index === 63) {
			this.context.toggleProperty('rightRookMoved');
		}
		if (color === 'black' && figure === 'rook' && index === 0) {
			this.context.toggleProperty('leftRookMoved');
		}
		if (color === 'black' && figure === 'rook' && index === 7) {
			this.context.toggleProperty('rightRookMoved');
		}

		if (color === 'white' && figure === 'king' && index === 60) {
			this.context.toggleProperty('kingMoved');
		}
		if (color === 'black' && figure === 'king' && index === 4) {
			this.context.toggleProperty('kingMoved');
		}

		field.changeFigure(figure, color);
		selectedField.removeFigure();

		if (figure === 'pawn' && [0,7].includes(row)) field.changeFigure('queen', color);
	}

	revertMove(field, selectedField) {
		const figureType = field.state.figure.type,
			color = field.state.figure.color;

		field.removeFigure();
		selectedField.changeFigure(figureType, color);
	}

	onDialogButtonClick(button, dialogType) {
		if (dialogType === 'castle') {
			if (button === 'Yes') {
				this.performCastle();
				this.selectedField = null;
				this.clearFields();
				this.selectedField = null;
				this.context.toggleProperty('castleMade');
				this.context.changePlayer();
			} else {
				this.changeFocus(this.destinationField);
				this.selectedField = this.destinationField;
			}

			this.destinationField = null;
		}
	}

	performCastle() {
		const color = this.context.player.color;

		let rook = [this.destinationField, this.selectedField].find(f => {
			return f.state.figure.type === 'rook'
				&& f.state.figure.color === color;
		});
		let king = [this.destinationField, this.selectedField].find(f => {
			return f.state.figure.type === 'king'
				&& f.state.figure.color === color;
		});

		let rookIndex = this.fields.indexOf(rook),
			kingIndex = this.fields.indexOf(king);

		if (kingIndex > rookIndex) {
			this.fields[kingIndex].removeFigure();
			this.fields[kingIndex - 2].changeFigure('king', color);
			this.fields[rookIndex].removeFigure();
			this.fields[rookIndex + 3].changeFigure('rook', color);
		} else {
			this.fields[kingIndex].removeFigure();
			this.fields[kingIndex + 2].changeFigure('king', color);
			this.fields[rookIndex].removeFigure();
			this.fields[rookIndex - 2].changeFigure('rook', color);
		}
	}

	render() {
		return (
			<div className='ChessBoard'>
			{
				this.fieldRefs.map((ref, index) => (
					<Field key={'field-' + index} ref={ref} callback={this.onFieldClick.bind(this, ref)} />
				))
			}
			</div>
		);
	}
}

export default ChessBoard;