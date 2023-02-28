const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
	book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
	imprint: { type: String, required: true },
	status: {
		type: String,
		required: true,
		enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
		default: 'Maintenance',
	},
	due_back: { type: Date, default: Date.now },
});

// Virtual property creation for bookinstance's URL
BookInstanceSchema.virtual('url').get(function () {
	return '/catalogue/bookinstance/' + this._id;
});

// Virtual property for formatting the date using 'luxon'
BookInstanceSchema.virtual('due_back_formatted').get(function () {
	return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model('BookInstance', BookInstanceSchema);
