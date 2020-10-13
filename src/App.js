import React, { Component } from 'react';
import Weather from './components/Weather/Weather'
import Searchbar from './components/Searchbar/Searchbar';
import './_app.scss';
import key from './config/api_key'
import FindCity from './components/FindCity/FindCity';

class App extends Component {
  
  state = {
    searchBarValue: '',
    cityName: '',
    weathers: false,
    forecasts: false
  }

  handleSearch = async (e) => {
    await this.setState({searchBarValue: e.target.value})
    await this.findCity()
    await this.toggleDropdown(true)
  }

  toggleDropdown = (forceTrueToggle) => {
    const dropdown = document.querySelector('.findCity')
    forceTrueToggle ? dropdown.setAttribute('toggle', true) : dropdown.setAttribute('toggle', !dropdown.getAttribute('toggle'))
  }

  findCity = async () => {
    const {searchBarValue} = this.state

    const req = await fetch(`https://geo.api.gouv.fr/communes?nom=${searchBarValue}&fields=codesPostaux&boost=population&limit=5`)
    const res = await req.json()

    await this.setState({cityName: res})
  }

  displayWeather = async () => {

    const {searchBarValue} = this.state

    const req = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchBarValue}&appid=${key}&lang=fr&units=metric`)
    const weathers = await req.json()

    this.setState({weathers})
  }

  selectCity = async (e) => {
    let searchValue = document.querySelector('.searchbar input')
    const menuValue = e.target.getAttribute('value')
    
    searchValue.value = menuValue
    await this.setState({searchBarValue: menuValue})
    await this.displayWeather()
    await this.toggleDropdown()
  }
  
  render() {
    const {searchBarValue, weathers, cityName} = this.state

    return(
      <div>
        <Searchbar
          handleSearch={this.handleSearch}
          cityName={searchBarValue}
          displayWeather={this.displayWeather}
        />
        {
          cityName === '' ? '' :
          <FindCity
            cities={cityName}
            selectCity={this.selectCity}
          />
        }
        {
          weathers === false ? '' : 
          <Weather 
            city={weathers.name} 
            country={weathers.sys.country}
            temp={weathers.main.temp}
            description={weathers.weather[0].description}
            wind={weathers.wind.speed}
            humidity={weathers.main.humidity}
          />
        }
      </div>
    )
  }
}

export default App;
