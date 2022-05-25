/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const searchButton = document.getElementById('searchButton');\r\nconst tempButton = document.getElementById('tempButton');\r\nconst API = '569b16653b1e1b0bacaf824d6467a76c';\r\nasync function getGeoLocation(city) {\r\n  let request = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API}`, { mode: 'cors' });\r\n  let data = await request.json();\r\n  if (data.length == 0) {\r\n    throw new Error('Plesase enter city name');\r\n  } else {\r\n    let lat = data[0].lat;\r\n    let lon = data[0].lon;\r\n    return { lat, lon };\r\n  }\r\n}\r\nasync function getWeather(coords) {\r\n  let request = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API}`, { mode: 'cors' });\r\n  let data = await request.json();\r\n  return data;\r\n}\r\nfunction displayWeather(object) {\r\n  console.log(object);\r\n  let country = object.sys.country;\r\n  let name = object.name;\r\n}\r\nfunction kelvinToCelcius(temp) {\r\n  let temp2 = parseFloat(temp);\r\n  return temp2 - 273.15;\r\n}\r\nfunction kelvinToFahrenheit(temp) {\r\n  let temp2 = parseFloat(temp);\r\n  return (temp2 - 273.15) * 1.8 + 32;\r\n}\r\nfunction celciusToFahrenheit(temp) {\r\n  let temp2 = parseFloat(temp);\r\n  return temp2 * 1.8 + 32;\r\n}\r\nfunction fahrenheitToCelcius(temp) {\r\n  let temp2 = parseFloat(temp);\r\n  return (temp2 - 32) / 1.8;\r\n}\r\nsearchButton.addEventListener('click', () => {\r\n  let city = document.getElementById('search').value;\r\n  if (city === '') return;\r\n  getGeoLocation(city)\r\n    .then(coords => getWeather(coords))\r\n    .then(weather => displayWeather(weather))\r\n    .catch(err => console.log(err));\r\n});\r\ntempButton.addEventListener('click', e => {\r\n  console.log(e.target);\r\n});\r\n\n\n//# sourceURL=webpack://weather-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;