import Figure from './Figure';

class Knight extends Figure {
	getMoves() {
		let enemyColor = this.color === 'white' ? 'black' : 'white',
			leftTopField = this.getLeftTopField(),
			rightTopField = this.getRightTopField(),
			leftBottomField = this.getLeftBottomField(),
			rightBottomField = this.getRightBottomField(),
			fields = [];

		if (leftTopField) {
			const leftField = this.getLeftField(leftTopField),
				topField = this.getTopField(leftTopField);

			if (leftField && (leftField.isEmpty() || leftField.hasColorFigure(enemyColor))) {
				fields.push(leftField);
			}
			if (topField && (topField.isEmpty() || topField.hasColorFigure(enemyColor))) {
				fields.push(topField);
			}
		}
		if (rightTopField) {
			const rightField = this.getRightField(rightTopField),
				topField = this.getTopField(rightTopField);

			if (rightField && (rightField.isEmpty() || rightField.hasColorFigure(enemyColor))) {
				fields.push(rightField);
			}
			if (topField && (topField.isEmpty() || topField.hasColorFigure(enemyColor))) {
				fields.push(topField);
			}
		}
		if (leftBottomField) {
			const leftField = this.getLeftField(leftBottomField),
				bottomField = this.getBottomField(leftBottomField);

			if (leftField && (leftField.isEmpty() || leftField.hasColorFigure(enemyColor))) {
				fields.push(leftField);
			}
			if (bottomField && (bottomField.isEmpty() || bottomField.hasColorFigure(enemyColor))) {
				fields.push(bottomField);
			}
		}
		if (rightBottomField) {
			const rightField = this.getRightField(rightBottomField),
				bottomField = this.getBottomField(rightBottomField);

			if (rightField && (rightField.isEmpty() || rightField.hasColorFigure(enemyColor))) {
				fields.push(rightField);
			}
			if (bottomField && (bottomField.isEmpty() || bottomField.hasColorFigure(enemyColor))) {
				fields.push(bottomField);
			}
		}

		return fields;
	}
}

export default Knight;