
'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

export const User = mongoose.model('User', new Schema({
  alias: { type: String, index: true, required: true, unique: true },
}));

export const Link = mongoose.model('Link', new Schema({
  url: { type: String, index: true, required: true, unique: true },
}));

export const Thread = mongoose.model('Thread', new Schema({
  participants: [{ type: Schema.Types.ObjectId, ref: 'User', index: true }],
  contents: [{ type: Schema.Types.ObjectId, ref: 'Link' }],
}));
