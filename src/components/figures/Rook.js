import Figure from './Figure';

class Rook extends Figure {
	getMoves() {
		let color = this.color,
			topField = this.getTopField(),
			leftField = this.getLeftField(),
			rightField = this.getRightField(),
			bottomField = this.getBottomField(),
			topFields = [],
			leftFields = [],
			rightFields = [],
			bottomFields = [],
			lastField = null;

		if (topField && !topField.hasColorFigure(color)) {

			topFields.push(topField);
			lastField = topField;

			while(lastField.isEmpty()) {
				let nextField = this.getTopField(lastField);

				if (!nextField || nextField.hasColorFigure(color)) break;

				topFields.push(nextField);
				lastField = nextField;
			}
		}

		if (leftField && !leftField.hasColorFigure(color)) {

			leftFields.push(leftField);
			lastField = leftField;

			while(lastField.isEmpty()) {
				let nextField = this.getLeftField(lastField);

				if (!nextField || nextField.hasColorFigure(color)) break;

				leftFields.push(nextField);
				lastField = nextField;
			}
		}

		if (rightField && !rightField.hasColorFigure(color)) {

			rightFields.push(rightField);
			lastField = rightField;

			while(lastField.isEmpty()) {
				let nextField = this.getRightField(lastField);

				if (!nextField || nextField.hasColorFigure(color)) break;

				rightFields.push(nextField);
				lastField = nextField;
			}
		}

		if (bottomField && !bottomField.hasColorFigure(color)) {

			bottomFields.push(bottomField);
			lastField = bottomField;

			while(lastField.isEmpty()) {
				let nextField = this.getBottomField(lastField);

				if (!nextField || nextField.hasColorFigure(color)) break;

				bottomFields.push(nextField);
				lastField = nextField;
			}
		}

		return topFields.concat(leftFields, rightFields, bottomFields);
	}
}

export default Rook;