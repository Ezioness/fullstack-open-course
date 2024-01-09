import CountryDetails from './CountryDetail.jsx'

const Country = ({name, handleClick}) => {
    return (
        <div>{name} <button onClick={handleClick}>show</button></div>
    )
}

const Countries = ({countries, handleClick}) => {
    if(countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else {
        if(countries.length === 1) {
            const country = countries[0]
            
            return (
                <CountryDetails
                    name={country.name.common}
                    capital={country.capital}
                    area={country.area}
                    languages={Object.values(country.languages)}
                    flag={country.flags.png}
                />
            )            
        } else {
            return (
                <div>
                    {                        
                        countries.map(country => 
                            <Country
                                key={country.name.common}
                                name={country.name.common}
                                handleClick={() => handleClick([country])}
                            />)
                    }
                </div>
            )
        }
    }    
}

export default Countries