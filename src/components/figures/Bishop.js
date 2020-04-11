import Figure from './Figure';

class Bishop extends Figure {
	getMoves() {
		let color = this.color,
			leftTopField = this.getLeftTopField(),
			rightTopField = this.getRightTopField(),
			leftBottomField = this.getLeftBottomField(),
			rightBottomField = this.getRightBottomField(),
			leftTopFields = [],
			rightTopFields = [],
			leftBottomFields = [],
			rightBottomFields = [],
			lastField = null;

		if (leftTopField && !leftTopField.hasColorFigure(color)) {

			leftTopFields.push(leftTopField);
			lastField = leftTopField;

			while(lastField.isEmpty()) {
				let nextField = this.getLeftTopField(lastField);

				if (!nextField || nextField.hasColorFigure(color)) break;

				leftTopFields.push(nextField);
				lastField = nextField;
			}
		}

		if (rightTopField && !rightTopField.hasColorFigure(color)) {

			rightTopFields.push(rightTopField);
			lastField = rightTopField;

			while(lastField.isEmpty()) {
				let nextField = this.getRightTopField(lastField);

				if (!nextField || nextField.hasColorFigure(color)) break;

				rightTopFields.push(nextField);
				lastField = nextField;
			}
		}

		if (leftBottomField && !leftBottomField.hasColorFigure(color)) {

			leftBottomFields.push(leftBottomField);
			lastField = leftBottomField;

			while(lastField.isEmpty()) {
				let nextField = this.getLeftBottomField(lastField);

				if (!nextField || nextField.hasColorFigure(color)) break;

				leftBottomFields.push(nextField);
				lastField = nextField;
			}
		}

		if (rightBottomField && !rightBottomField.hasColorFigure(color)) {

			rightBottomFields.push(rightBottomField);
			lastField = rightBottomField;

			while(lastField.isEmpty()) {
				let nextField = this.getRightBottomField(lastField);

				if (!nextField || nextField.hasColorFigure(color)) break;

				rightBottomFields.push(nextField);
				lastField = nextField;
			}
		}

		return leftTopFields.concat(rightTopFields, leftBottomFields, rightBottomFields);
	}
}

export default Bishop;