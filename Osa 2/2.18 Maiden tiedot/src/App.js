import { useState, useEffect } from 'react'
import countryDB from "./services/countries.js"
import Form from "./components/form.js"
import List from "./components/list.js"

const App = () => {
  const [searchWord, setSearchWord] = useState()
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const handleSearchChange = (event) => {
    setSearchWord(event.target.value)
  }

  useEffect(() => {
      countryDB
        .getAll()
        .then(response => {
          setCountries(response.data)
        })
  }, [])

  useEffect(() => {
    if(searchWord)
      var array = []
      setFilteredCountries([])
      countries.forEach(country => {
        if(country.name.common.toLowerCase().includes(searchWord.toLowerCase())){
          array.push(country)
        }
      })
    setFilteredCountries(array)
  }, [searchWord])
  
  return (
    <div>
      <Form onChange={handleSearchChange}/>
      <List countries={filteredCountries}/>
    </div>
  )

}

export default App