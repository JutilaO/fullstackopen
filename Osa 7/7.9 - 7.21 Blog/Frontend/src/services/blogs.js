import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (NewObject) => {
  const config = {
    headers: {Authorization: token},
  }
  const response = await axios.post(baseUrl, NewObject, config)
  return response.data
}

const update = (id, object) => {
  const request = axios.put(`${baseUrl}/${id}`, object)
  return request.then((response) => response.data)
}

const remove = (id) => {
  const config = {
    headers: {Authorization: token},
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  return request.then((response) => response.data)
}

export default {getAll, create, setToken, update, remove}
