import axios from "axios"
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(baseUrl)
}

const createNew = (newPerson) => {
    return axios.post(baseUrl, newPerson)
}

export default {
    getAll,
    createNew
}