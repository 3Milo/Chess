import Figure from './Figure';
import Rook from './Rook';
import Bishop from './Bishop';

class Queen extends Figure {
	getMoves() {
		const rookMoves = new Rook(this.field, this.fields).getMoves(),
			bishopMoves = new Bishop(this.field, this.fields).getMoves();
		return rookMoves.concat(bishopMoves);
	}
}

export default Queen;