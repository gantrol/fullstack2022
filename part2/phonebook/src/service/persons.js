import axios from 'axios'

const url = 'http://localhost:3001/api/persons';

const getAll = () => {
  return axios.get(url)
}

const create = (personObject) => {
  return axios.post(url, personObject)
}

const del = (id) => {
  return axios.delete(`${url}/${id}`)
}

const put = (person) => {
  return axios.put(`${url}/${person.id}`, person)
}

// https://stackoverflow.com/questions/65738988/assign-object-to-a-variable-before-exporting-as-module-default-warning
const exportedObject = {
  getAll,
  create,
  del,
  put
};

export default exportedObject;