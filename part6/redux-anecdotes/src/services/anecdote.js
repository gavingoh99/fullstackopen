import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (content) => {
  const response = await axios.post(baseUrl, {
    content,
    id: getId(),
    votes: 0,
  });
  return response.data;
};

const update = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, {
    ...anecdote,
    votes: anecdote.votes + 1,
  });
  return response.data;
};

export default { getAll, create, update };
