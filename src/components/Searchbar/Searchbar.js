import React from 'react'
import './_searchbar.scss'

const Searchbar = ({handleSearch, cityName, displayWeather}) => {
    return(
        <div className="searchbar">
            <input 
                onChange={handleSearch}
                value={cityName}
                placeholder="Type city here..."
            />
            <button onClick={displayWeather}>Go</button>
        </div>
    )
}

export default Searchbar