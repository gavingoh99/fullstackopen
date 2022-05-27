import express from 'express';
import bmi from './bmiCalculator';
import exercise from './exerciseCalculator';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const queryParams = req.query;
  if (
    Object.keys(queryParams).length === 0 ||
    typeof queryParams.weight === 'undefined' ||
    typeof queryParams.height === 'undefined'
  ) {
    return res.json({
      error: 'missing parameters',
    });
  }
  if (isNaN(Number(queryParams.height)) || isNaN(Number(queryParams.weight))) {
    return res.json({
      error: 'malformatted parameters',
    });
  }
  return res.json({
    weight: Number(queryParams.weight),
    height: Number(queryParams.height),
    bmi: bmi(Number(queryParams.height), Number(queryParams.weight)),
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises: daily, target } = req.body;
  if (typeof daily === 'undefined' || typeof target === 'undefined') {
    return res.json({
      error: 'missing parameters',
    });
  }
  if (!Array.isArray(daily) || typeof target !== 'number') {
    return res.json({
      error: 'malformatted parameters',
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = exercise(daily, target);
  return res.json(result);
});

const PORT = 3003;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
