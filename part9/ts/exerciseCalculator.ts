interface ExerciseArguments {
  exerciseHours: number[];
  targetHours: number;
}
interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}
const arrayDoesNotHaveNonNumbers = (array: string[]): boolean => {
  for (let i = 0; i < array.length; i++) {
    if (isNaN(Number(array[i]))) {
      return false;
    }
  }
  return true;
};
const parseArgumentsForExercise = (args: string[]): ExerciseArguments => {
  if (args.length < 4) throw new Error('Too few arguments');
  const exerciseHours = args.slice(3);
  if (arrayDoesNotHaveNonNumbers(exerciseHours) && !isNaN(Number(args[2]))) {
    return {
      exerciseHours: exerciseHours.map((hours) => Number(hours)),
      targetHours: Number(args[2]),
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};
export default function calculateExercises(
  exerciseHours: number[],
  targetHours: number
): Result {
  let trainingDays = 0;
  let total = 0;
  for (let i = 0; i < exerciseHours.length; i++) {
    if (exerciseHours[i] > 0) {
      trainingDays++;
      total += exerciseHours[i];
    }
  }
  const average = total / exerciseHours.length;
  const rating = average > targetHours ? 3 : targetHours - average <= 1 ? 2 : 1;
  return {
    periodLength: exerciseHours.length,
    trainingDays,
    success: average > targetHours,
    target: targetHours,
    average,
    rating,
    ratingDescription:
      rating === 3
        ? 'Good job'
        : rating === 2
        ? 'Not too bad'
        : 'You can do better',
  };
}
try {
  const { exerciseHours, targetHours } = parseArgumentsForExercise(
    process.argv
  );
  console.log(calculateExercises(exerciseHours, targetHours));
} catch (error: unknown) {
  let errorMessage = 'An error occured.';
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }
  console.log(errorMessage);
}
