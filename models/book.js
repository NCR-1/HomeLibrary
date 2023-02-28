const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
	title: { type: String, required: true },
	// reference to Author module
	author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
	summary: { type: String, required: true },
	isbn: { type: String, required: true },
	// reference to Genre module
	genre: { type: Schema.Types.ObjectId, ref: 'Genre' },
});

// Virtual property creation for book's URL
BookSchema.virtual('url').get(function () {
	return '/catalogue/book/' + this._id;
});

module.exports = mongoose.model('Book', BookSchema);
