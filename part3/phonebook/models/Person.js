const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose
	.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('connected to MongoDB'))
	.catch((err) => console.error(`Error occured: ${err.message}`));

const customNumberValidator = (val) => {
	if (!val.includes('-')) {
		return val.length >= 8;
	}
	let arr = val.split('-');
	return (
		arr[0].length > 1 &&
    arr[0].length < 4 &&
    /^\d+$/.test(arr[0]) &&
    /^\d+$/.test(arr[1])
	);
};
const PersonSchema = new mongoose.Schema({
	name: { type: String, minlength: 3, required: true },
	number: { type: String, required: true, validate: customNumberValidator },
});

PersonSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	},
});

module.exports = mongoose.model('Person', PersonSchema);
