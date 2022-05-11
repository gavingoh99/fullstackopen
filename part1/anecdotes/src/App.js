import { useEffect, useState } from 'react';
import { Button } from './components/Button';
import Anecdote from './components/Anecdote';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
  ];
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  let vote = (event) => {
    let votesCopy = [...votes];
    votesCopy[selected]++;
    setVotes(votesCopy);
  };
  let nextAnecdote = (event) =>
    setSelected(Math.floor(Math.random() * anecdotes.length));
  // if restricted to only using useState
  // let findHighestVotes = () => {
  //   let highestVotes = votes[0];
  //   let index = 0;
  //   for (let i = 1; i < votes.length; i++) {
  //     if (votes[i] > highestVotes) {
  //       highestVotes = votes[i];
  //       index = i;
  //     }
  //   }
  //   return index;
  // };
  // let highestVotesIndex = findHighestVotes();

  // if allowed to use useEffect
  const [highestVotesIndex, setHighestVotesIndex] = useState(0);
  useEffect(() => {
    let index = 0;
    let highestVotes = votes[0];
    for (let i = 1; i < votes.length; i++) {
      if (votes[i] > highestVotes) {
        highestVotes = votes[i];
        index = i;
      }
    }
    setHighestVotesIndex(index);
  }, [votes]);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} numVotes={votes[selected]} />
      <Button handleClick={vote} text='vote' />
      <Button handleClick={nextAnecdote} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <Anecdote
        anecdote={anecdotes[highestVotesIndex]}
        numVotes={votes[highestVotesIndex]}
      />
    </div>
  );
};
export default App;
