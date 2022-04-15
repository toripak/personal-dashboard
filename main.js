// ---- Global variables ----
const body = document.body;
body.style.backgroundImage = `url(https://source.unsplash.com/random/?ocean,nature)`;
const weather = document.querySelector('.weather');
const city = document.querySelector('.weather--city');
const date = document.querySelector('.greeting--date');
const time = document.querySelector('.greeting--time');
const quoteEl = document.querySelector('.quote');
const authorEl = document.querySelector('.quote--author');
const weatherIcon = document.querySelector('.weather--icon');
const weatherError = document.getElementById('weather--error');

//------- Twitter timeline widget -------
const twitterEl = document.querySelector('.twitter-timeline');
twitterEl.href = 'https://twitter.com/tor1_pak/lists/1514681290578092041?ref_src=twsrc%5Etfw';

//--- Get content (weather, quote) functions ---
const getWeatherData = () => {
  navigator.geolocation.getCurrentPosition(async position => {
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=139fd68b2e5cfae5f582200699c19e3f`);
      if (!res.ok || !res) {
        throw Error('Please try again later.')
      }
      const jsonRes = await res.json();
      weather.textContent = `${Math.round(jsonRes.main.temp)}º`;
      city.textContent = jsonRes.name;

      // setting weather icon
      console.log(iconUrl)
      const iconUrl = `http://openweathermap.org/img/wn/${jsonRes.weather[0].icon}@2x.png`;
      weatherIcon.src = iconUrl;
    }
    catch (error) {
      console.log(error.message);
      weatherError.textContent = `${error.message}`;
    }
  }, (navigatorError) => {
    console.log(navigatorError.message);
    weatherError.textContent = 'Location data N/A. Please allow access to your location to show the weather data.';
  })
}

const setDateAndTime = () => {
  const currentDate = new Date().toLocaleDateString('en-uk', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  date.textContent = currentDate;
  time.textContent = new Date().toLocaleTimeString('en-uk', { timeStyle: 'short' });
};

const getQuote = async () => {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Host': 'inspiring-quotes.p.rapidapi.com',
      'X-RapidAPI-Key': 'aece22882fmshb51006438db1b85p16bc85jsnef0510dc71f5'
    }
  };
  try {
    const res = await fetch('https://inspiring-quotes.p.rapidapi.com/random?', options);
    const { author, quote } = await res.json();
    quoteEl.textContent = quote;
    authorEl.textContent = author;
  }
  catch (error) {
    console.log(error);
  }
}

setInterval(setDateAndTime, 1000);
getQuote();
getWeatherData();


