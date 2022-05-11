export default function Anecdote({ anecdote, numVotes }) {
  return (
    <>
      <div>{anecdote}</div>
      <div>{`has ${numVotes} votes`}</div>
    </>
  );
}
