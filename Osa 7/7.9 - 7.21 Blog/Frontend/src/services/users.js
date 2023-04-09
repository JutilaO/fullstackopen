import axios from 'axios'
const baseUrl = '/api/users'

const get = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const getById = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}

export default {get, getById}
