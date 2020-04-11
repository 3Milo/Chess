class Figure {
	constructor(field, fields) {
	    this.field = field;
	    this.fields = fields;
	    this.color = field.state.figure.color;

	    this.getIndex = field => this.fields.indexOf(field ? field : this.field);

	    this.isLastInRow = field => this.fields.indexOf(field ? field : this.field) % 8 === 7;
		this.isFirstInRow = field => this.fields.indexOf(field ? field : this.field) % 8 === 0; 

	    this.getTopField = field => this.fields[this.getIndex(field) - 8];

	    this.getRightTopField = field => {
	    	if (!this.isLastInRow(field)) return this.fields[this.getIndex(field) - 7];
	    }

	    this.getRightField = field => {
	    	if (!this.isLastInRow(field)) return this.fields[this.getIndex(field) + 1];
	    }

	    this.getRightBottomField = field => {
	    	if (!this.isLastInRow(field)) return this.fields[this.getIndex(field) + 9];
	    }

	    this.getBottomField = field => this.fields[this.getIndex(field) + 8];

	    this.getLeftBottomField = field => {
	    	if (!this.isFirstInRow(field)) return this.fields[this.getIndex(field) + 7];
	    }

	    this.getLeftField = field => {
	    	if (!this.isFirstInRow(field)) return this.fields[this.getIndex(field) - 1];
	    }

	    this.getLeftTopField = field => {
	    	if (!this.isFirstInRow(field)) return this.fields[this.getIndex(field) - 9];
	    }
	}
}

export default Figure;