import Figure from './Figure';

class King extends Figure {
	getMoves() {
		let enemyColor = this.color === 'white' ? 'black' : 'white',
			fields = [
				this.getLeftTopField(),
				this.getTopField(),
				this.getRightTopField(),
				this.getRightField(),
				this.getRightBottomField(),
				this.getBottomField(),
				this.getLeftBottomField(),
				this.getLeftField()
			];

		return fields.filter(field => field && (field.isEmpty() || field.hasColorFigure(enemyColor)));
	}
}

export default King;