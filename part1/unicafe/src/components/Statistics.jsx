import { Statistic } from '../components/Statistic';
export default function Statistics({ good, neutral, bad }) {
  let total = good + neutral + bad;
  let average = (good * 1 + bad * -1) / total;
  let positive = (good / total) * 100;
  return (
    <>
      <h1>statistics</h1>
      {total ? (
        <table>
          <tbody>
            <Statistic text='good' value={good} />
            <Statistic text='neutral' value={neutral} />
            <Statistic text='bad' value={bad} />
            <Statistic text='all' value={total} />
            <Statistic text='average' value={average.toFixed(1)} />
            <Statistic text='positive' value={`${positive.toFixed(1)} %`} />
          </tbody>
        </table>
      ) : (
        'No feedback given'
      )}
    </>
  );
}
