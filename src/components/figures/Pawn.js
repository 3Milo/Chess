import Figure from './Figure';

class Pawn extends Figure {
	getMoves() {
		let color = this.color,
			enemyColor = this.color === 'white' ? 'black' : 'white',
			row = Math.floor(this.getIndex() / 8),
			col = this.getIndex() % 8,
			fields = [];

		if (color === 'white' && row > 0) {
			let topField = this.getTopField();

			if (!topField) return;

			if (topField.isEmpty()) {
				fields.push(topField);
				if (row === 6) {
					let nextTopField = this.getTopField(topField);
					if (nextTopField && nextTopField.isEmpty()) fields.push(nextTopField);
				}
			}
			if (col > 0) {
				let leftTopField = this.getLeftTopField();
				if (leftTopField && leftTopField.hasColorFigure(enemyColor)) {
					fields.push(leftTopField);
				}
			}
			if (col < 7) {
				let rightTopField = this.getRightTopField();
				if (rightTopField && rightTopField.hasColorFigure(enemyColor)) {
					fields.push(rightTopField);
				}
			}
		}

		if (color === 'black' && row < 7) {
			let bottomField = this.getBottomField();

			if (!bottomField) return;

			if (bottomField.isEmpty()) {
				fields.push(bottomField);
				if (row === 1) {
					let nextBottomField = this.getBottomField(bottomField);
					if (nextBottomField && nextBottomField.isEmpty()) fields.push(nextBottomField);
				}
			}
			if (col > 0) {
				let leftBottomField = this.getLeftBottomField();
				if (leftBottomField && leftBottomField.hasColorFigure(enemyColor)) {
					fields.push(leftBottomField);
				}
			}
			if (col < 7) {
				let rightBottomField = this.getRightBottomField();
				if (rightBottomField && rightBottomField.hasColorFigure(enemyColor)) {
					fields.push(rightBottomField);
				}
			}
		}

		return fields;
	}
}

export default Pawn;