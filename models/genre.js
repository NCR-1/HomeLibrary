var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenreSchema = new Schema({
	name: { type: String, required: true, minLength: 3, maxLength: 100 },
});

// Virtual for this genre instance URL
GenreSchema.virtual('url').get(function () {
	return '/catalogue/genre/' + this._id;
});

module.exports = mongoose.model('Genre', GenreSchema);
