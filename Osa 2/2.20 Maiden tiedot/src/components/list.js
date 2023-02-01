import { useState } from 'react'
import Weather from "./weather.js"
const List = (props) => {

    const [show, setShow] = useState([])
    
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
                        {languages.map(language => <li key={language}>{language}</li>)}
                    </ul>
                </div>
                <Weather data={country} />
                <div>
                    <img src={country.flags.png} alt="flag"/>
                </div>
            </div>
        )
        

    } else {

        const handleClick = (event, country) => {
            event.preventDefault()
            if(!show.includes(country.name.common)){
                setShow(show.concat(country.name.common))
            } else {
                setShow(show.filter(s => s !== country.name.common))
            }
        }

        const Button = (props) => {
            return (
            <button onClick={props.handleClick}>
                {props.text}
            </button>
            )
        }

        const Result = (props) => {
            let res = []
            props.countries.forEach(country => {
                if(show.includes(country.name.common)){
                    let languages = Object.values(country.languages)
                    res.push(<div>
                        <h1>{country.name.common} <Button handleClick={(event) => handleClick(event, country)} text="hide"/></h1>
                        <div>Capital: {country.capital}</div>
                        <div>Area: {country.area}</div>
                        <h2>Languages</h2>
                        <div>
                            <ul>
                                {languages.map(language => <li key={language}>{language}</li>)}
                            </ul>
                        </div>
                        <Weather data={country} />
                        <div>
                            <img src={country.flags.png} alt="flag"/>
                        </div>
                    </div>)
                } else {
                    res.push(<div>{country.name.common} <Button handleClick={(event) => handleClick(event, country)} text="show"/></div>)
                }
            })
            return res
        }

        return ( 
            <div>
                <Result countries={props.countries} />
            </div>
        )
    }
}

export default List