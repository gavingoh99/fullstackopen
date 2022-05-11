import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const create = (newPerson) =>
  axios.post(baseUrl, newPerson).then((response) => response.data);

const update = (id, updatedObject) =>
  axios
    .put(`${baseUrl}/${id}`, updatedObject)
    .then((response) => response.data);

const del = (id) => axios.delete(`${baseUrl}/${id}`);

let personService = { getAll, create, update, del };
export default personService;
