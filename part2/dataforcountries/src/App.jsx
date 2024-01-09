import { useEffect, useState } from "react"

import Countries from "./components/Countries.jsx"

import countryServices from './services/countries.js'

const App = () => {
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])

  const [countrySearch, setCountrySearch] = useState('')

  useEffect(() => {
    countryServices
      .getAll()
      .then(initialCountries => {
        setAllCountries(initialCountries)
      })
  }, [])    

  const  handleCountrySearch = (event) => {
    setCountrySearch(event.target.value)

    const countriesToSearch = event.target.value
    setCountries(
      countriesToSearch === ''
      ? []
      : allCountries.filter(c => c.name.common.toLowerCase().includes(countriesToSearch.toLowerCase()))
    )
  }

  return (
    <div>
      <div>
        find countries <input value={countrySearch} onChange={handleCountrySearch} />
      </div>
      <Countries countries={countries} handleClick={setCountries}/>
    </div>
  )
}

export default App