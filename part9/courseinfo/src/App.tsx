interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
interface CoursePartBaseWithDescription extends CoursePartBase {
  description: string;
}
interface CourseNormalPart extends CoursePartBaseWithDescription {
  type: 'normal';
}
interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}
interface CourseSubmissionPart extends CoursePartBaseWithDescription {
  type: 'submission';
  exerciseSubmissionLink: string;
}
interface CourseSpecialPart extends CoursePartBaseWithDescription {
  type: 'special';
  requirements: string[];
}
type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
const Header = ({ courseName }: { courseName: string }) => {
  return <h1>{courseName}</h1>;
};
const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.type) {
    case 'normal':
      return (
        <p>
          <div>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
          </div>{' '}
          <div>
            <em>{coursePart.description}</em>
          </div>
        </p>
      );
    case 'groupProject':
      return (
        <p>
          <div>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
          </div>{' '}
          <div>project exercises {coursePart.groupProjectCount}</div>
        </p>
      );
    case 'submission':
      return (
        <p>
          <div>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
          </div>{' '}
          <div>
            <em>{coursePart.description}</em>
          </div>
          <div>submit to {coursePart.exerciseSubmissionLink}</div>
        </p>
      );
    case 'special':
      return (
        <p>
          <div>
            <strong>
              {coursePart.name} {coursePart.exerciseCount}
            </strong>
          </div>{' '}
          <div>
            <em>{coursePart.description}</em>
          </div>
          <div>
            required skills:{' '}
            {coursePart.requirements.reduce((prev, curr) => `${prev}, ${curr}`)}
          </div>
        </p>
      );
    default:
      return assertNever(coursePart);
  }
};
const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((coursePart) => (
        <Part key={coursePart.name} coursePart={coursePart} />
      ))}
    </>
  );
};
const Total = ({ total }: { total: number }) => {
  return <p>Number of exercises {total}</p>;
};
const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the leisured course part',
      type: 'normal',
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the harded course part',
      type: 'normal',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      type: 'special',
    },
  ];
  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total
        total={courseParts.reduce(
          (carry, part) => carry + part.exerciseCount,
          0
        )}
      />
    </div>
  );
};
export default App;
