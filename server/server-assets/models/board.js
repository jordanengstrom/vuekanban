var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var schemaName = 'Board'

var schema = new Schema({
    name: { type: String, requried: true},
    description: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now() },
    userId: { type: ObjectId, ref: 'User' }
});

module.exports = mongoose.model(schemaName, schema);