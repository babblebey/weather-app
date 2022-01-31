const hero = document.querySelector('.hero');
const searchForm = document.querySelector('form.search');
const main = document.querySelector('main');
const currentSearch = document.querySelector('.current-search');
const currentCondition = document.querySelector('.current-condition');
const weatherForecast = document.querySelector('.forecast');

// Helper Function generate random number from 0 to maxNum
const genRandomNum = maxNum => Math.floor((Math.random() * maxNum) + 1);

// Hero Background Image Randomizer
hero.style.backgroundImage = `url(img/${genRandomNum(5)}.jpg)`;

// FETCHING ALL NEEDED WEATHER INFORMATION
const getWeatherInfo = async (city) => {
    const cityInfo = await getCity(city);
    const currentWeather = await getCurrentWeather(cityInfo.Key);
    const forecast = await getForecast(cityInfo.Key);
    return {cityInfo, currentWeather, forecast};
}

// POPULATE THE USER INTERFACE WITH WEATHER INFORMATION
const updateUI = data => {
    // DESTRUCTURING RECEIVED DATA
    const {cityInfo, currentWeather, forecast} = data;

    // UPDATE CURRENT SEARCH CITY
    currentSearch.innerHTML = `
        <div class="location">
            <span class="city">${cityInfo.EnglishName}</span>, <span class="country">${cityInfo.Country.EnglishName}</span>
            <span class="flag"><img src="https://flagpedia.net/data/flags/h80/${cityInfo.Country.ID.toLowerCase()}.png"></span>
        </div>
        <div class="time">
            <span>${moment(currentWeather.LocalObservationDateTime).format('dddd Do MMMM  • LT')}</span>
        </div>
    `;

    // UPDATING HERO BACKGROUND WITH DAY/NIGHT BACKGROUND
    hero.style.backgroundImage = currentWeather.IsDayTime ? `url(img/day-${genRandomNum(3)}.jpg)` : `url(img/night-${genRandomNum(3)}.jpg)`;


    // UPDATE THE CURRENT WEATHER SECTION
    const ptCode = {'R':'🡩', 'S':'🡘', 'F':'🡫'}; // Assigning Arrow Direction Pressure Tendency Code 
    currentCondition.innerHTML = `
        <div class="_big card">
            <div class="icon">
                <img src="img/icons/${currentWeather.WeatherIcon}.svg">
            </div>
            <div class="temperature">
                <h2>${currentWeather.Temperature.Metric.Value}<span>&deg;C</span></h2>
                <span>${currentWeather.WeatherText}</span>
            </div>
            <div class="details">
                <div><span class="label">Wind</span><span class="value">${currentWeather.Wind.Speed.Metric.Value} km/h</span></div>
                <div><span class="label">Wind Gust</span><span class="value">${currentWeather.WindGust.Speed.Metric.Value} km/h</span></div>
                <div><span class="label">Pressure</span><span class="value">${ptCode[currentWeather.PressureTendency.Code]} ${currentWeather.Pressure.Metric.Value} mb</span></div>
                <div><span class="label">Humidity</span><span class="value">${currentWeather.RelativeHumidity}%</span></div>
                <div><span class="label">Cloud Cover</span><span class="value">${currentWeather.CloudCover}%</span></div>
                <div><span class="label">Dew Point</span><span class="value">${currentWeather.DewPoint.Metric.Value}&deg;C</span></div>
            </div>
        </div>
    `;

    // UPDATE THE WEATHER FORECAST SECTION
    // --- Clear weather forecast InnerHTML for New Content to avoid Appending fo thesame search parameter
    weatherForecast.innerHTML = null; 
    // --- Creating a Small Card for each forecast array item
    forecast.forEach(forecast => {
        weatherForecast.innerHTML += `
            <div class="_small card">
                <h5>${moment(forecast.Date).format('dddd')}</h5>
                <div class="icon">
                    <img src="img/icons/${forecast.Day.Icon}.svg">
                </div>
                <div class="temperature">
                    <h2>${forecast.Temperature.Maximum.Value}&deg;<span class="min"> / ${forecast.Temperature.Minimum.Value}&deg;C</span></h2>
                </div>
            </div>
        `;
    })
}

// SEARCH FORM SUBMIT EVENT LISTENER
searchForm.addEventListener('submit', e => {
    e.preventDefault();

    // GET CITY SEARCH TERM
    const city = searchForm.city.value.trim();

    // GET WEATHER INFORMATION, THEN UPDATE UI
    if (city.length) {
        getWeatherInfo(city)
            .then(data => setTimeout(updateUI(data), 10))
            .catch(err => console.log(err));
    }
    searchForm.reset();
    
    // UNHIDING WEATHER INFORMATION ELEMENTS
    if (hero.classList.contains('start')){
        hero.classList.remove('start');
        document.querySelector('main.hide').classList.remove('hide');
        document.querySelector('footer.hide').classList.remove('hide');
    }
})