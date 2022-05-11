import { useState } from 'react';
import Header from './components/Header';
import Statistics from './components/Statistics';
const App = () => {
  let [good, setGood] = useState(0);
  let [neutral, setNeutral] = useState(0);
  let [bad, setBad] = useState(0);
  let handleClick = (event) => {
    let type = event.target.textContent;
    if (type === 'good') {
      setGood(good + 1);
    } else if (type === 'neutral') {
      setNeutral(neutral + 1);
    } else {
      setBad(bad + 1);
    }
  };
  return (
    <>
      <Header handleClick={handleClick} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};
export default App;
