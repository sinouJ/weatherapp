import React from 'react'
import './_findcity.scss'

const FindCity = ({cities, selectCity}) => {
    return(
        <ul toggle="false" className="findCity">
            {
                cities.map( (city, i) => { 
                    return (
                        <li 
                            key={i}
                            value={city.nom}
                            onClick={selectCity}
                        >
                            {city.nom}, {city.codesPostaux[0]}
                        </li> 
                    )
                })
            }
        </ul>
    )
}

export default FindCity