const hero = document.querySelector('.hero');
const searchForm = document.querySelector('form.search');
const main = document.querySelector('main');

// Helper Function too= generate
const genRandomNum = maxNum => Math.floor((Math.random() * maxNum) + 1);

hero.style.backgroundImage = `url(img/${genRandomNum(5)}.jpg)`;

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    
    // Get city search term
    const city = searchForm.city.value.trim();

    console.log(city);

    if (hero.classList.contains('start')){
        hero.classList.remove('start');
        document.querySelector('main.hide').classList.remove('hide');
        document.querySelector('footer.hide').classList.remove('hide');
    }
})