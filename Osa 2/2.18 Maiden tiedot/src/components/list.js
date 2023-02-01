const List = (props) => {

    if(!props.countries) return
    if(props.countries.length > 10) return (<div>Too many matches, specify another filter</div>)


    if(props.countries.length === 1){
        let country = props.countries[0]
        let languages = Object.values(country.languages)
        return (
            <div>
                <h1>{country.name.common}</h1>
                <div>Capital: {country.capital}</div>
                <div>Area: {country.area}</div>
                <h2>Languages</h2>
                <div>
                    <ul>
                        {languages.map(language => <li>{language}</li>)}
                    </ul>
                </div>
                <div>
                    <img src={country.flags.png}/>
                </div>
            </div>
        )
    } else
        return ( 
            <div>
                {props.countries.map(c => <div>{c.name.common}</div>)}
            </div>
        )
}

export default List