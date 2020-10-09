import React from 'react'

const FindCity = ({cities}) => {
    return(
        <ul className="findCity">
            {
                cities.map( (city, i) => { return <li key={i}>{city.nom}, {city.codesPostaux[0]}</li> })
            }
        </ul>
    )
}

export default FindCity