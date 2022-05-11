import { Part } from '../components/Part';
export default function Content({ parts }) {
  return (
    <>
      {[...parts].map((part) => (
        <Part part={part} key={part.id} />
      ))}
    </>
  );
}
