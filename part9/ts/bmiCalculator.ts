interface BMIValues {
  height: number;
  weight: number;
}
const parseArguments = (args: string[]): BMIValues => {
  if (args.length > 4) throw new Error('Too many arguments');
  if (args.length < 4) throw new Error('Too few arguments');
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers');
  }
};
export default function calculateBmi(height: number, weight: number): string {
  let bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25.0) {
    return 'Normal';
  } else {
    return 'Obese';
  }
}
try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'An error occured.';
  if (error instanceof Error) {
    errorMessage += ` Error: ${error.message}`;
  }
  console.log(errorMessage);
}
