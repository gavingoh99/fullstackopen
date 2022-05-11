const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://user:${password}@cluster0.7q47q.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const PersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
});

const Person = mongoose.model('Person', PersonSchema);

if (process.argv.length === 5) {
  let name = process.argv[3];
  let number = process.argv[4];
  const person = new Person({ name, number });
  person
    .save()
    .then((result) => console.log(result))
    .catch((err) => console.err(err))
    .finally(() => mongoose.connection.close());
} else {
  Person.find({})
    .then((persons) => console.log(persons))
    .catch((err) => console.err(err))
    .finally(() => mongoose.connection.close());
}
