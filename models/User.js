const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: {type: String, default: null},
    email: {type: String, unique: true},
    password: {type: String, minlength: 8},
    token: {type: String}
});


module.exports = model('User', userSchema);