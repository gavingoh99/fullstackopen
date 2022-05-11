const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const Person = require('./models/Person');

const app = express();

app.use(cors());
app.use(express.json());
app.use(
	logger((tokens, req, res) => {
		return [
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			tokens.res(req, res, 'content-length'),
			'-',
			tokens['response-time'](req, res),
			'ms',
			`${JSON.stringify(req.body)}`,
		].join(' ');
	})
);

// Serve the frontend via static files from the build directory
app.use(express.static('build'));

// GET request to get information about all persons
app.get('/api/persons', (req, res, next) => {
	Person.find({})
		.then((persons) => {
			if (!persons.length) {
				return res.status(404).json({ message: 'No people in phonebook' });
			}
			res.status(200).json(persons);
		})
		.catch((err) => next(err));
});

// GET request to get information about the phonebook
app.get('/info', (req, res, next) =>
	Person.find({})
		.then((persons) =>
			res
				.status(200)
				.send(
					`<p>Phonebook has info for ${
						persons.length
					} people</p><p>${new Date()}</p>`
				)
		)
		.catch((err) => next(err))
);

// GET request to get information about a person
app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id)
		.then((person) => {
			if (!person)
				return res
					.status(404)
					.json({ message: `Person with id: ${req.params.id} not found` });
			res.status(200).json(person);
		})
		.catch((err) => next(err));
});

// DELETE request to delete a person
app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then((removedPerson) => {
			if (!removedPerson)
				return res
					.status(404)
					.json({ message: `Person with id: ${req.params.id} not found` });
			res.status(204).end();
		})
		.catch((err) => next(err));
});

// POST request to create a new person
app.post('/api/persons', (req, res, next) => {
	let userInput = req.body;
	if (typeof userInput !== 'undefined') {
		Person.find({ name: userInput.name })
			.then((person) => {
				if (person)
					return res.status(400).json({
						message: `Person with name ${userInput.name} already exists in the phonebook`,
					});
			})
			.catch((err) => next(err));
	}
	const person = new Person({
		name: userInput.name,
		number: userInput.number,
	});
	person
		.save()
		.then((newPerson) => {
			res.status(201).json({ message: 'Created', newPerson });
		})
		.catch((err) => next(err));
});

// PUT request to update an existing person
app.put('/api/persons/:id', (req, res, next) => {
	const { name, number } = req.body;
	// Update validators only run on updated paths
	// This means that it will not validate a field being sent as undefined
	// We should override the field if it is undefined and send it as an empty string in this case
	// See https://mongoosejs.com/docs/validation.html#update-validators
	Person.findByIdAndUpdate(
		req.params.id,
		{
			name: typeof name === 'undefined' ? '' : name,
			number: typeof number === 'undefined' ? '' : number,
		},
		{
			new: true,
			runValidators: true,
			context: 'query',
		}
	)
		.then((updatedPerson) => {
			if (!updatedPerson)
				return res
					.status(404)
					.json({ message: `Person with id: ${req.params.id} not found` });
			res.status(200).json({ message: 'Updated', updatedPerson });
		})
		.catch((err) => next(err));
});

const unknownEndpoint = (req, res) => {
	res.status(404).json({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
	console.error(err.message);
	if (err.name === 'CastError') {
		return res.status(400).json({ error: 'malformatted id' });
	} else if (err.name === 'ValidationError') {
		return res.status(400).json({ error: err.message });
	}
	next(err);
};

app.use(errorHandler);

let port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on ${port}`));
