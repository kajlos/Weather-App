const searchButton = document.getElementById('searchButton');
const tempButton = document.getElementById('tempButton');
const API = '569b16653b1e1b0bacaf824d6467a76c';
let tempUnit = 'celcius';
async function getGeoLocation(city) {
  let request = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API}`, { mode: 'cors' });
  let data = await request.json();
  if (data.length == 0) {
    throw new Error('Plesase enter city name');
  } else {
    let lat = data[0].lat;
    let lon = data[0].lon;
    return { lat, lon };
  }
}
//
//https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${API}
async function getWeather(coords) {
  let request = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API}`, { mode: 'cors' });
  let data = await request.json();
  return data;
}
function displayWeather(object) {
  console.log(object);
  const left = document.querySelector('.left');
  const right = document.querySelector('.right');
  let country = object.sys.country;
  let name = object.name;
  let h3 = document.createElement('h3');
  let h2 = document.createElement('h2');
  let mainTemp;
  let weather = object.weather[0].main;
  let p = document.createElement('p');
  let div = document.createElement('div');
  let highTemp;
  let minTemp;

  p.append(weather);

  h3.append(name + ', ', country);

  let sunriseDiv = document.createElement('div');
  let sunriseTitle = document.createElement('p');
  sunriseTitle.classList.add('title');
  let sunriseContent = document.createElement('p');
  sunriseContent.classList.add('content');
  sunriseTitle.append('Sunrise');
  sunriseContent.append(convertUnixTime(object.sys.sunrise));
  sunriseDiv.append(sunriseTitle, sunriseContent);
  let sunsetDiv = document.createElement('div');
  let sunsetTitle = document.createElement('p');
  sunsetTitle.classList.add('title');
  let sunsetContent = document.createElement('p');
  sunsetContent.classList.add('content');
  sunsetTitle.append('Sunset');
  sunsetContent.append(convertUnixTime(object.sys.sunset));
  sunsetDiv.append(sunsetTitle, sunsetContent);
  let humidityDiv = document.createElement('div');
  let humidityTitle = document.createElement('p');
  humidityTitle.append('Humidity');
  humidityTitle.classList.add('title');
  let humidityContent = document.createElement('p');
  humidityContent.classList.add('content');
  humidityContent.append(object.main.humidity + '%');
  humidityDiv.append(humidityTitle, humidityContent);
  let windDiv = document.createElement('div');
  let windTitle = document.createElement('p');
  windTitle.append('Wind');
  windTitle.classList.add('title');
  let windContent = document.createElement('p');
  windContent.classList.add('content');
  windContent.append(object.wind.speed + 'km/h');
  windDiv.append(windTitle, windContent);
  let feelsDiv = document.createElement('div');
  let feelsTitle = document.createElement('p');
  feelsTitle.append('Feels like');
  feelsTitle.classList.add('title');
  let feelsContent = document.createElement('p');
  feelsContent.classList.add('content');
  feelsContent.dataset.temp = '';
  feelsDiv.append(feelsTitle, feelsContent);
  let pressureDiv = document.createElement('div');
  let pressureTitle = document.createElement('p');
  pressureTitle.append('Pressure');
  pressureTitle.classList.add('title');
  let pressureContent = document.createElement('p');
  pressureContent.classList.add('content');
  pressureContent.append(object.main.pressure + ' hPa');
  pressureDiv.append(pressureTitle, pressureContent);
  let visibilityDiv = document.createElement('div');
  let visibilityTitle = document.createElement('p');
  visibilityTitle.append('visibility');
  visibilityTitle.classList.add('title');
  let visibilityContent = document.createElement('p');
  visibilityContent.classList.add('content');
  visibilityContent.append(object.visibility / 1000 + 'km');
  visibilityDiv.append(visibilityTitle, visibilityContent);

  if (tempUnit === 'celcius') {
    mainTemp = kelvinToCelcius(object.main.temp) + '\u{B0}';
    highTemp = kelvinToCelcius(object.main.temp_max) + '\u{B0}';
    minTemp = kelvinToCelcius(object.main.temp_min) + '\u{B0}';
    feelsContent.append(kelvinToCelcius(object.main.feels_like) + '\u{B0}');
  } else {
    mainTemp = kelvinToFahrenheit(object.main.temp) + '\u{B0}';
    highTemp = kelvinToFahrenheit(object.main.temp_max) + '\u{B0}';
    minTemp = kelvinToFahrenheit(object.main.temp_min) + '\u{B0}';
    feelsContent.append(kelvinToFahrenheit(object.main.feels_like) + '\u{B0}');
  }
  let highTempSpan = document.createElement('span');
  let minTempSpan = document.createElement('span');
  highTempSpan.append('H: ' + highTemp);
  minTempSpan.append(' L:' + minTemp);
  h2.dataset.temp = '';
  highTempSpan.dataset.temp = '';
  minTempSpan.dataset.temp = '';
  h2.append(mainTemp);
  div.append(highTempSpan, minTempSpan);
  left.append(h3, p, h2, div);

  right.append(sunriseDiv, sunsetDiv, humidityDiv, windDiv, feelsDiv, pressureDiv, visibilityDiv);
}
function convertUnixTime(time) {
  let time2 = parseFloat(time);
  let date = new Date(time2 * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let formattedTime = hours + ':' + minutes;
  return formattedTime;
}
function kelvinToCelcius(temp) {
  let temp2 = parseFloat(temp);
  return Math.round(temp2 - 273.15);
}
function kelvinToFahrenheit(temp) {
  let temp2 = parseFloat(temp);
  return Math.round((temp2 - 273.15) * 1.8 + 32);
}
function celciusToFahrenheit(temp) {
  let temp2 = parseFloat(temp);
  return Math.round(temp2 * 1.8 + 32);
}
function fahrenheitToCelcius(temp) {
  let temp2 = parseFloat(temp);
  return Math.round((temp2 - 32) / 1.8);
}
searchButton.addEventListener('click', () => {
  let left = document.querySelector('.left');
  let right = document.querySelector('.right');
  left.textContent = '';
  right.textContent = '';
  let city = document.getElementById('search').value;
  if (city === '') return;
  getGeoLocation(city)
    .then(coords => getWeather(coords))
    .then(weather => displayWeather(weather))
    .catch(err => console.log(err));
});

tempButton.addEventListener('click', e => {
  let temps = [...document.querySelectorAll('[data-temp]')];

  if (tempUnit === 'celcius') {
    tempUnit = 'fahrenheit';
    let button = e.target.closest('button');
    button.children[0].classList.remove('active');
    button.children[1].classList.add('active');
    temps.forEach(element => {
      let cleanTemp = element.textContent.replace(/[^0-9.]/g, '');
      let newTemp = celciusToFahrenheit(cleanTemp);
      element.textContent = newTemp + '\u{B0}';
    });
  } else {
    tempUnit = 'celcius';
    let button = e.target.closest('button');
    button.children[0].classList.add('active');
    button.children[1].classList.remove('active');
    temps.forEach(element => {
      let cleanTemp = element.textContent.replace(/[^0-9.]/g, '');
      let newTemp = fahrenheitToCelcius(cleanTemp);
      element.textContent = newTemp + '\u{B0}';
    });
  }
});
