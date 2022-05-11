import { Header } from '../components/Header';
import Content from '../components/Content';
import { Total } from '../components/Total';
export default function Course({ course }) {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total
        total={[...course.parts].reduce(
          (prevValue, currValue) => prevValue + currValue.exercises,
          0
        )}
      />
    </div>
  );
}
