var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.SchemaTypes.ObjectId
var schemaName = 'Board'
var Lists = require('../models/list');
var Tasks = require('../models/task');
var Comments = require('../models/comment');

var schema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true, default: Date.now() },
    userId: { type: ObjectId, ref: 'User' }
});

schema.post('remove', function (next) {
    // This deletes where boardId = current boardId (all it's children)
    Lists.remove({ boardId: this._id }).exec();
    Tasks.remove({ boardId: this._id }).exec();
    Comments.remove({ boardId: this._id }).exec();
});

module.exports = mongoose.model(schemaName, schema);