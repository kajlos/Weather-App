const searchButton = document.getElementById('searchButton');
const tempButton = document.getElementById('tempButton');
const API = '569b16653b1e1b0bacaf824d6467a76c';
async function getGeoLocation(city) {
  let request = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API}`, { mode: 'cors' });
  let data = await request.json();
  if (data.length == 0) {
    throw new Error('Plesase enter city name');
  } else {
    let lat = data[0].lat;
    let lon = data[0].lon;
    return { lat, lon };
  }
}
async function getWeather(coords) {
  let request = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API}`, { mode: 'cors' });
  let data = await request.json();
  return data;
}
function displayWeather(object) {
  console.log(object);
  let country = object.sys.country;
  let name = object.name;
}
function kelvinToCelcius(temp) {
  let temp2 = parseFloat(temp);
  return temp2 - 273.15;
}
function kelvinToFahrenheit(temp) {
  let temp2 = parseFloat(temp);
  return (temp2 - 273.15) * 1.8 + 32;
}
function celciusToFahrenheit(temp) {
  let temp2 = parseFloat(temp);
  return temp2 * 1.8 + 32;
}
function fahrenheitToCelcius(temp) {
  let temp2 = parseFloat(temp);
  return (temp2 - 32) / 1.8;
}
searchButton.addEventListener('click', () => {
  let city = document.getElementById('search').value;
  if (city === '') return;
  getGeoLocation(city)
    .then(coords => getWeather(coords))
    .then(weather => displayWeather(weather))
    .catch(err => console.log(err));
});
tempButton.addEventListener('click', e => {
  console.log(e.target);
});
