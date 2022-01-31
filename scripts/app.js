const hero = document.querySelector('.hero');
const searchForm = document.querySelector('form.search');
const main = document.querySelector('main');

// Helper Function generate random number from 0 to maxNum
const genRandomNum = maxNum => Math.floor((Math.random() * maxNum) + 1);

// Hero Background Image Randomizer
hero.style.backgroundImage = `url(img/${genRandomNum(5)}.jpg)`;

// Get all Needed Weather Information
const getWeatherInfo = async (city) => {
    const cityInfo = await getCity(city);
    const currentCondition = await getCurrentCondition(cityInfo.Key);
    const forecast = await getForecast(cityInfo.Key);
    return {cityInfo, currentCondition, forecast};
}

// Search Form Submit Event Listener 
searchForm.addEventListener('submit', e => {
    e.preventDefault();

    // Get city search term
    const city = searchForm.city.value.trim();

    getWeatherInfo(city)
        .then(data => console.log(data))
        .catch(err => console.log(err));

    if (hero.classList.contains('start')){
        hero.classList.remove('start');
        document.querySelector('main.hide').classList.remove('hide');
        document.querySelector('footer.hide').classList.remove('hide');
    }
})