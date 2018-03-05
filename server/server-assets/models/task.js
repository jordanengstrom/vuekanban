var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var schemaName = 'Task'

var schema = new Schema({
    body: { type: String, requried: true},
    listId: { type: ObjectId, ref: 'List' }
});

module.exports = mongoose.model(schemaName, schema);