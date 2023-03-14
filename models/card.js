const mongoose = require('mongoose');
const { default: isURL } = require('validator/lib/isURL');

const { ObjectId } = mongoose.Schema.Types;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Должно содержать более 2 и менее 30 символов'],
    maxlength: [30, 'Должно содержать более 2 и менее 30 символов'],
  },
  link: {
    type: String,
    required: true,
    validate: [isURL, 'Неправильный формат ссылки'],
  },
  owner: {
    type: ObjectId,
    required: true,
    ref: 'user',
  },
  likes: [{
    type: ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model('card', cardSchema);
