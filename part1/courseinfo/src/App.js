const Header = ({ name }) => <h1>{name}</h1>;
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);
const Content = ({ parts }) => (
  <>
    {[...parts].map((part) => (
      <Part part={part} />
    ))}
  </>
);

const Total = ({ parts }) => (
  <p>
    Number of exercises{' '}
    {[...parts].reduce(
      (currValue, nextPart) => currValue + nextPart.exercises,
      0
    )}
  </p>
);

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
export default App;
