var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Create new schema for author
var AuthorSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    last_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date }
});

// Virtual property creation for author's full name
AuthorSchema.virtual('name').get(function () {
    let fullname = '';
    if (this.first_name && this.last_name) {
        fullname = this.last_name + ', ' + this.first_name;
    }
    // Used for cases where either a first or last name may not be present to avoid errors
    if (!this.first_name || !this.last_name) {
        fullname = '';
    }
    return fullname
});

// Virtual property creation for author's lifespan
AuthorSchema.virtual('lifespan').get(function () {
    let lifetime_string = '';
    if (this.date_of_birth) {
        lifetime_string = this.date_of_birth.getYear().toString();
    }
    lifetime_string += ' - ';
    if (this.date_of_death) {
        lifetime_string += this.date_of_death.getYear();
    }
    return lifetime_string;
});

// Virtual property creation for author's URL
AuthorSchema.virtual('url').get(function () {
    return '/catalog/author' + this._id;
});

// Export author model
module.exports = mongoose.model('Author', AuthorSchema);