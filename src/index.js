import "./styles.css"

const weatherForm = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherDisplay = document.getElementById('weatherDisplay');
async function displayWeather(data, unit) {
  const unitSymbol = unit === 'F' ? '°F' : '°C';

  try {
    const iconResponse = await fetch(`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${data.icon}.png`);
    const iconBlob = await iconResponse.blob();
    const iconUrl = URL.createObjectURL(iconBlob);

    weatherDisplay.innerHTML = `
  <h2>Weather in ${data.address}</h2>
  <img src="${iconUrl}" alt="${data.condition}" width="100" height="100" />
  <p><strong>Description:</strong> ${data.desc}</p>
  <p><strong>Condition:</strong> ${data.condition}</p>
  <p><strong>Temperature:</strong> ${data.temp}${unitSymbol}</p>
  <p><strong>Feels Like:</strong> ${data.feels}${unitSymbol}</p>
  <p><strong>Humidity:</strong> ${data.humid}%</p>
  `;
  } catch {
    weatherDisplay.innerHTML = `<p>Failed to load weather icon.</p>`;
  }
}


async function getWeatherInfo(location) {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?key=C6FBP5Z6JJBC692EUYSKV6CFL`;
  const response = await fetch(url, { mode: 'cors' });
  return response.json();
}

function processWeatherData(weatherData, unit) {
  const curr = weatherData.currentConditions;

  let temp = curr.temp;
  let feels = curr.feelslike;

  if (unit === 'C') {
    temp = ((temp - 32) * 5 / 9).toFixed(1);
    feels = ((feels - 32) * 5 / 9).toFixed(1);
  } else {
    temp = temp.toFixed(1);
    feels = feels.toFixed(1);
  }

  return {
    address: weatherData.resolvedAddress,
    desc: weatherData.description,
    condition: curr.conditions,
    feels,
    humid: curr.humidity,
    icon: curr.icon,
    temp
  };
}
