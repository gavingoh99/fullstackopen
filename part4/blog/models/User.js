const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, minlength: 3, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
});

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model('User', UserSchema);
