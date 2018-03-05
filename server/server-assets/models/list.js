var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var schemaName = 'List'

var schema = new Schema({
    name: { type: String, requried: true},
    date: { type: Date, required: true, default: Date.now() },
    boardId: { type: ObjectId, ref: 'Board' }
});

module.exports = mongoose.model(schemaName, schema);