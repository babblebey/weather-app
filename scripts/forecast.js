const key = "MaGnemTLNsbIMmya9RRUuZyUAnzCbAd9";

// Get the City Information
const getCity = async (city) => {
    const baseURI = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;
    const response = await fetch(baseURI + query);
    const data = await response.json();
    return data[0];
}

// Get the City's Current Weather Condition
const getCurrentWeather = async (cityID) => {
    const baseURI = 'https://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${cityID}?apikey=${key}&details=true`;
    const response = await fetch(baseURI + query);
    const data = await response.json();
    return data[0];
}

// Get the City's Daily Weather Forecast
const getForecast = async (cityID) => {
    const baseURI = 'https://dataservice.accuweather.com/forecasts/v1/daily/5day/';
    const query = `${cityID}?apikey=${key}&metric=true`;
    const response = await fetch(baseURI + query);
    const data = await response.json();
    return data.DailyForecasts;
}

// getCity('lagos').then(data => console.log(data));