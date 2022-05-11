import { Button } from '../components/Button';
export default function Header({ handleClick }) {
  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handleClick} type='good' />
      <Button handleClick={handleClick} type='neutral' />
      <Button handleClick={handleClick} type='bad' />
    </>
  );
}
