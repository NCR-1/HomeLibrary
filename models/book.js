var mongoose = require('mongoose');

var Schema = mongoose.Schema;

let BookSchema = new Schema({
    title: { type: String, required: true },
    // reference to Author module
    author: { type: String, ref: 'Author', required: true },
    summary: { type: String, required: true },
    isbn: { type: String, required: true },
    // reference to Genre module
    genre: { type: Schema.Types.ObjectId, ref: 'Genre' }
});

// Virtual property creation for book's URL
BookSchema.virtual('url').get(function () {
    return '/catalog/book' + this._id;
});

// Export module
module.exports = mongoose.model('Book', BookSchema);